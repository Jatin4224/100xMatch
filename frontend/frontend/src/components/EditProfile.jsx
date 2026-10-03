import { useState } from "react";
import { useDispatch } from "react-redux";
import api, { getErrorMessage } from "../utils/api";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    age: user.age ?? "",
    gender: user.gender || "",
    about: user.about || "",
    skills: (user.skills || []).join(", "),
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const skills = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        photoUrl: form.photoUrl,
        about: form.about,
        skills,
      };
      // optional fields are only sent once filled in
      if (form.age !== "") payload.age = Number(form.age);
      if (form.gender) payload.gender = form.gender;

      const res = await api.patch("/profile/edit", payload);
      dispatch(addUser(res.data.data));
      setSaved(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="title-bubble text-5xl md:text-6xl">Your profile</h1>
        <p className="scribble mt-1 text-3xl -rotate-1">
          make it cute, make it you
        </p>
      </div>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
        <form
          onSubmit={handleSave}
          className="card-pop flex w-full max-w-md flex-col gap-4 p-7"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name">
              <input
                name="firstName"
                className="input-pop"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </Field>
            <Field label="Last name">
              <input
                name="lastName"
                className="input-pop"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </Field>
          </div>
          <Field label="Photo URL">
            <input
              name="photoUrl"
              type="url"
              className="input-pop"
              placeholder="https://..."
              value={form.photoUrl}
              onChange={handleChange}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Age">
              <input
                name="age"
                type="number"
                min="18"
                max="120"
                className="input-pop"
                placeholder="18+"
                value={form.age}
                onChange={handleChange}
              />
            </Field>
            <Field label="Gender">
              <select
                name="gender"
                className="input-pop"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pick one
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </div>
          <Field label="Skills (comma separated)">
            <input
              name="skills"
              className="input-pop"
              placeholder="react, rust, bad puns"
              value={form.skills}
              onChange={handleChange}
            />
          </Field>
          <Field label="About you">
            <textarea
              name="about"
              className="input-pop resize-none"
              placeholder="tabs or spaces? tell us everything"
              maxLength={500}
              rows={4}
              value={form.about}
              onChange={handleChange}
            />
          </Field>

          {error && (
            <p className="rounded-xl border-2 border-line bg-rose/40 px-3 py-2 text-sm font-semibold">
              {error}
            </p>
          )}
          {saved && (
            <p className="rounded-xl border-2 border-line bg-baby px-3 py-2 text-sm font-semibold text-ink">
              Profile saved! Looking good ✨
            </p>
          )}
          <button type="submit" className="btn-hot mt-1" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="flex w-full max-w-sm flex-col items-center">
          <p className="scribble mb-3 text-3xl rotate-2">
            how others see you ↓
          </p>
          <UserCard
            user={{
              ...form,
              age: form.age === "" ? undefined : form.age,
              skills,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1 text-sm font-semibold">
    {label}
    {children}
  </label>
);

export default EditProfile;
