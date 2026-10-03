import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../utils/api";
import { addUser } from "../utils/userSlice";
import AuthCard from "./AuthCard";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/signin", { email, password });
      // GuestRoute redirects once the user is set
      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Hey again!"
      note="your matches missed you"
      onSubmit={handleLogin}
    >
      <label className="flex flex-col gap-1 font-semibold">
        Email
        <input
          type="email"
          className="input-pop"
          placeholder="you@devmail.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        Password
        <input
          type="password"
          className="input-pop"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && (
        <p className="rounded-xl border-2 border-line bg-rose/40 px-3 py-2 text-sm font-semibold">
          {error}
        </p>
      )}
      <button type="submit" className="btn-hot mt-2" disabled={loading}>
        {loading ? "Logging in..." : "Let me in ⚡"}
      </button>
      <p className="text-center text-sm">
        New here?{" "}
        <Link to="/signup" className="font-bold text-hot underline">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
};

export default Login;
