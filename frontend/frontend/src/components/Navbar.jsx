import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { removeUser } from "../utils/userSlice";
import Avatar from "./Avatar";
import { Bolt } from "./Doodles";

const NAV_LINKS = [
  { to: "/feed", label: "Feed", emoji: "💘" },
  { to: "/requests", label: "Requests", emoji: "💌" },
  { to: "/connections", label: "Matches", emoji: "🤝" },
  { to: "/profile", label: "Profile", emoji: "✨" },
];

const linkClass = ({ isActive }) =>
  `rounded-full border-2 px-4 py-1.5 font-semibold transition ${
    isActive
      ? "border-line bg-hot text-white shadow-pop-sm"
      : "border-transparent hover:border-line hover:bg-baby hover:text-ink"
  }`;

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

  return (
    <header className="sticky top-0 z-20 border-b-[3px] border-line bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to={user ? "/feed" : "/"}
          className="flex items-center gap-1 shrink-0"
          aria-label="100xMatch home"
        >
          <Bolt className="w-7 -rotate-12" />
          <span className="title-bubble text-3xl">
            100<span className="text-baby">x</span>Match
          </span>
        </Link>

        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.emoji} {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full border-[3px] border-line bg-baby text-ink py-1 pl-1 pr-3 shadow-pop-sm hover:shadow-pop transition"
              >
                <Avatar user={user} className="w-9" textClass="text-xs" />
                <span className="font-semibold hidden sm:inline">
                  hey {user.firstName}!
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-30 mt-3 w-52 rounded-2xl border-[3px] border-line bg-base-100 p-2 shadow-pop"
              >
                {NAV_LINKS.map((link) => (
                  <li key={link.to} className="md:hidden">
                    <Link to={link.to}>
                      {link.emoji} {link.label}
                    </Link>
                  </li>
                ))}
                <li className="hidden md:block">
                  <Link to="/profile">✨ Edit profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>👋 Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-plain !px-4 !py-1.5 text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn-hot !px-4 !py-1.5 text-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
