import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../utils/api";
import { addUser } from "../utils/userSlice";
import AuthCard from "./AuthCard";

const FIELDS = [
  { name: "firstName", type: "text", label: "First name", placeholder: "Ada", autoComplete: "given-name" },
  { name: "lastName", type: "text", label: "Last name", placeholder: "Lovelace", autoComplete: "family-name" },
  { name: "email", type: "email", label: "Email", placeholder: "you@devmail.com", autoComplete: "email" },
  { name: "password", type: "password", label: "Password", placeholder: "••••••••", autoComplete: "new-password" },
];

const Signup = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/signup", form);
      // GuestRoute redirects to /profile once the user is set
      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Join the fun"
      note="your dev crush is waiting"
      onSubmit={handleSignup}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ label, ...field }) => (
          <label
            key={field.name}
            className={`flex flex-col gap-1 font-semibold ${
              field.name === "email" || field.name === "password"
                ? "sm:col-span-2"
                : ""
            }`}
          >
            {label}
            <input
              {...field}
              className="input-pop"
              required
              value={form[field.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </div>
      <p className="text-xs text-white/70">
        Password: 8+ characters with an uppercase letter, a lowercase letter, a
        number and a symbol.
      </p>
      {error && (
        <p className="rounded-xl border-2 border-line bg-rose/40 px-3 py-2 text-sm font-semibold">
          {error}
        </p>
      )}
      <button type="submit" className="btn-hot mt-2" disabled={loading}>
        {loading ? "Creating..." : "Start matching 💘"}
      </button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-hot underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
};

export default Signup;
