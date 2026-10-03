import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// only for logged-in users; others are sent to /login
export const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

// only for logged-out users (login/signup). Once a user is set (already logged in,
// or just logged in on this page) they go back to where they came from, or redirectTo.
export const GuestRoute = ({ redirectTo = "/feed" }) => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  if (user) {
    return <Navigate to={location.state?.from || redirectTo} replace />;
  }
  return <Outlet />;
};
