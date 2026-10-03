import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { removeUser } from "../utils/userSlice";
import Avatar from "./Avatar";

const NAV_LINKS = [
  { to: "/feed", label: "Feed" },
  { to: "/connections", label: "Connections" },
  { to: "/requests", label: "Requests" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await api.post("/signout");
    } catch (err) {
      console.error(err);
    } finally {
      // clear local state even if the request failed
      dispatch(removeUser());
      navigate("/login");
    }
  };

  const links = NAV_LINKS.map((link) => (
    <li key={link.to}>
      <NavLink to={link.to}>{link.label}</NavLink>
    </li>
  ));

  return (
    <div className="navbar bg-base-200 shadow-lg px-4">
      <div className="navbar-start">
        {user && (
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        )}
        <Link to={user ? "/feed" : "/"} className="btn btn-ghost text-xl">
          100
          <span className="text-red-500 font-bold">x</span>
          Match
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        {user && <ul className="menu menu-horizontal px-1">{links}</ul>}
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end flex items-center gap-4">
            <span className="hidden sm:inline">welcome {user.firstName}</span>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <Avatar user={user} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow top-full"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-error btn-sm">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
