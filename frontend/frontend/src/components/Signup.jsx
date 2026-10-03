import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../utils/api";
import { addUser } from "../utils/userSlice";

const FIELDS = [
  { name: "firstName", type: "text", placeholder: "First Name", autoComplete: "given-name" },
  { name: "lastName", type: "text", placeholder: "Last Name", autoComplete: "family-name" },
  { name: "email", type: "email", placeholder: "Email", autoComplete: "email" },
  { name: "password", type: "password", placeholder: "Password", autoComplete: "new-password" },
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
    <div className="flex justify-center">
      <form
        onSubmit={handleSignup}
        className="card w-full max-w-sm shadow-lg bg-base-200 hover:shadow-[0px_4px_30px_0px_rgba(255,255,255,0.3)]"
      >
        <div className="card-body gap-4">
          <h2 className="card-title justify-center">Create your account</h2>
          {FIELDS.map((field) => (
            <input
              key={field.name}
              {...field}
              className="input input-bordered"
              required
              value={form[field.name]}
              onChange={handleChange}
            />
          ))}
          <p className="text-xs opacity-70">
            Password: 8+ characters with an uppercase letter, a lowercase
            letter, a number and a symbol.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn btn-outline btn-error"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign up"
            )}
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-error">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
