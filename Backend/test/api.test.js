// API tests. Mongoose model calls are stubbed so no database is needed.
process.env.JWT_SECRET = "test-secret";

const { test, beforeEach, afterEach, mock } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../src/app");
const User = require("../src/models/user");
const Request = require("../src/models/request");

// chainable stand-in for a mongoose query (find().select().skip()...)
const query = (result) => {
  const q = {
    populate: () => q,
    select: () => q,
    skip: () => q,
    limit: () => q,
    then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
  };
  return q;
};

const makeUser = (overrides = {}) =>
  new User({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    password: "hash",
    ...overrides,
  });

const authCookie = (user) =>
  `token=${jwt.sign({ _id: user._id }, process.env.JWT_SECRET)}`;

let me;
beforeEach(() => {
  me = makeUser();
  mock.method(User, "findById", (id) =>
    query(String(id) === String(me._id) ? me : null)
  );
});
afterEach(() => mock.restoreAll());

test("protected routes return 401 without a cookie", async () => {
  const res = await request(app).get("/api/v1/profile/view");
  assert.equal(res.status, 401);
});

test("protected routes return 401 with a bad token", async () => {
  const res = await request(app)
    .get("/api/v1/profile/view")
    .set("Cookie", "token=garbage");
  assert.equal(res.status, 401);
});

test("profile/view returns the user without the password hash", async () => {
  const res = await request(app)
    .get("/api/v1/profile/view")
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 200);
  assert.equal(res.body.data.firstName, "Ada");
  assert.equal(res.body.data.password, undefined);
});

test("profile/edit rejects fields outside the allowlist", async () => {
  const save = mock.method(me, "save", async () => me);
  for (const body of [{ email: "x@y.com" }, { password: "Hacked123!" }]) {
    const res = await request(app)
      .patch("/api/v1/profile/edit")
      .set("Cookie", authCookie(me))
      .send(body);
    assert.equal(res.status, 400);
  }
  assert.equal(save.mock.callCount(), 0);
  assert.equal(me.email, "ada@example.com");
});

test("profile/edit updates allowed fields", async () => {
  mock.method(me, "save", async () => me);
  const res = await request(app)
    .patch("/api/v1/profile/edit")
    .set("Cookie", authCookie(me))
    .send({ about: "first programmer", age: "36", skills: ["math"] });
  assert.equal(res.status, 200);
  assert.equal(res.body.data.about, "first programmer");
  assert.equal(res.body.data.age, 36);
  assert.deepEqual(res.body.data.skills, ["math"]);
});

test("signup validates input", async () => {
  const res = await request(app)
    .post("/api/v1/signup")
    .send({ firstName: "A", lastName: "B", email: "bad", password: "weak" });
  assert.equal(res.status, 400);
});

test("signup reports duplicate email as 409", async () => {
  mock.method(User.prototype, "save", async () => {
    throw Object.assign(new Error("dup"), { code: 11000 });
  });
  const res = await request(app).post("/api/v1/signup").send({
    firstName: "A",
    lastName: "B",
    email: "a@b.com",
    password: "Strong123!",
  });
  assert.equal(res.status, 409);
});

test("signup creates the user and sets a cookie", async () => {
  mock.method(User.prototype, "save", async function () {
    return this;
  });
  const res = await request(app).post("/api/v1/signup").send({
    firstName: "A",
    lastName: "B",
    email: "New@B.com",
    password: "Strong123!",
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.data.email, "new@b.com");
  assert.equal(res.body.data.password, undefined);
  assert.match(res.headers["set-cookie"][0], /^token=.+HttpOnly/);
});

test("signin rejects non-string email (no operator injection)", async () => {
  const findOne = mock.method(User, "findOne", () => query(me));
  const res = await request(app)
    .post("/api/v1/signin")
    .send({ email: { $ne: null }, password: "x" });
  assert.equal(res.status, 400);
  assert.equal(findOne.mock.callCount(), 0);
});

test("signin uses one message for unknown email and wrong password", async () => {
  me.password = await bcrypt.hash("Right123!", 4);
  mock.method(User, "findOne", ({ email }) =>
    query(email === me.email ? me : null)
  );
  const unknown = await request(app)
    .post("/api/v1/signin")
    .send({ email: "nobody@example.com", password: "Right123!" });
  const wrong = await request(app)
    .post("/api/v1/signin")
    .send({ email: me.email, password: "Wrong123!" });
  assert.equal(unknown.status, 401);
  assert.equal(wrong.status, 401);
  assert.equal(unknown.body.message, wrong.body.message);

  const ok = await request(app)
    .post("/api/v1/signin")
    .send({ email: me.email, password: "Right123!" });
  assert.equal(ok.status, 200);
  assert.equal(ok.body.data.password, undefined);
  assert.match(ok.headers["set-cookie"][0], /^token=/);
});

test("send request validates status and target", async () => {
  const cookie = authCookie(me);
  let res = await request(app)
    .post(`/api/v1/request/send/accepted/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", cookie);
  assert.equal(res.status, 400);

  res = await request(app)
    .post("/api/v1/request/send/interested/not-an-id")
    .set("Cookie", cookie);
  assert.equal(res.status, 400);

  res = await request(app)
    .post(`/api/v1/request/send/interested/${me._id}`)
    .set("Cookie", cookie);
  assert.equal(res.status, 400);

  res = await request(app)
    .post(`/api/v1/request/send/interested/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", cookie);
  assert.equal(res.status, 404);
});

test("send request creates an interested request", async () => {
  const other = makeUser({ firstName: "Alan", email: "alan@example.com" });
  mock.method(User, "findById", (id) =>
    query([me, other].find((u) => u._id.equals(id)) || null)
  );
  mock.method(Request, "findOne", () => query(null));
  mock.method(Request.prototype, "save", async function () {
    return this;
  });
  const res = await request(app)
    .post(`/api/v1/request/send/interested/${other._id}`)
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 201);
  assert.equal(res.body.data.status, "interested");
  assert.equal(res.body.data.toUserId, String(other._id));
});

test("review only accepts pending requests addressed to the user", async () => {
  const pending = new Request({
    fromUserId: new mongoose.Types.ObjectId(),
    toUserId: me._id,
    status: "interested",
  });
  const findOne = mock.method(Request, "findOne", (filter) =>
    query(
      String(filter._id) === String(pending._id) &&
        String(filter.toUserId) === String(me._id) &&
        filter.status === "interested"
        ? pending
        : null
    )
  );
  mock.method(pending, "save", async () => pending);

  let res = await request(app)
    .post(`/api/v1/request/review/accepted/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 404);

  res = await request(app)
    .post(`/api/v1/request/review/accepted/${pending._id}`)
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 200);
  assert.equal(res.body.data.status, "accepted");
  assert.equal(findOne.mock.callCount(), 2);
});

test("review requires login", async () => {
  const res = await request(app).post(
    `/api/v1/request/review/accepted/${new mongoose.Types.ObjectId()}`
  );
  assert.equal(res.status, 401);
});

test("requests/received returns every pending request", async () => {
  const rows = [1, 2].map(() => ({ fromUserId: { firstName: "x" } }));
  mock.method(Request, "find", () => query(rows));
  const res = await request(app)
    .get("/api/v1/user/requests/received")
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 200);
  assert.equal(res.body.data.length, 2);
});

test("connections returns the other user of each accepted request", async () => {
  const a = makeUser({ firstName: "Alan" });
  const b = makeUser({ firstName: "Grace" });
  mock.method(Request, "find", () =>
    query([
      { fromUserId: me, toUserId: a },
      { fromUserId: b, toUserId: me },
      { fromUserId: null, toUserId: me },
    ])
  );
  const res = await request(app)
    .get("/api/v1/user/connections")
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 200);
  assert.deepEqual(
    res.body.data.map((u) => u.firstName),
    ["Alan", "Grace"]
  );
});

test("feed hides self and users with existing requests, and paginates", async () => {
  const seen = new mongoose.Types.ObjectId();
  mock.method(Request, "find", () =>
    query([{ fromUserId: me._id, toUserId: seen }])
  );
  let usedFilter;
  let usedSkip;
  let usedLimit;
  mock.method(User, "find", (filter) => {
    usedFilter = filter;
    const q = query([]);
    q.skip = (n) => ((usedSkip = n), q);
    q.limit = (n) => ((usedLimit = n), q);
    return q;
  });
  const res = await request(app)
    .get("/api/v1/feed?page=3&limit=500")
    .set("Cookie", authCookie(me));
  assert.equal(res.status, 200);
  assert.deepEqual(res.body.data, []);
  assert.deepEqual(
    usedFilter._id.$nin.sort(),
    [String(me._id), String(seen)].sort()
  );
  assert.equal(usedLimit, 50);
  assert.equal(usedSkip, 100);
});

test("unknown routes return 404 and bad JSON returns 400", async () => {
  let res = await request(app).get("/api/v1/nope");
  assert.equal(res.status, 404);
  res = await request(app)
    .post("/api/v1/signin")
    .set("Content-Type", "application/json")
    .send("{bad");
  assert.equal(res.status, 400);
});

test("a user loaded without its password still validates on save", async () => {
  // users come from findById without the password (select: false)
  const loaded = User.hydrate(
    { _id: me._id, firstName: "Ada", lastName: "L", email: "ada@example.com" },
    { password: 0 }
  );
  loaded.about = "updated";
  await loaded.validate();
});
