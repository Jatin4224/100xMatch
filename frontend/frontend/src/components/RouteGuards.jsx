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

// only for logged-out users (login/signup); others are sent to the feed
export const GuestRoute = () => {
  const user = useSelector((store) => store.user);
  if (user) {
    return <Navigate to="/feed" replace />;
  }
  return <Outlet />;
};
