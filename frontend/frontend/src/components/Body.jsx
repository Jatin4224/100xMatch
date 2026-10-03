import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { Spinner } from "./Doodles";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(Boolean(userData));

  useEffect(() => {
    if (userData) return;
    // restore the session from the cookie on page load
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile/view");
        dispatch(addUser(res.data.data));
      } catch (err) {
        if (err?.response?.status !== 401) console.error(err);
      } finally {
        setAuthChecked(true);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-10">
        {authChecked ? <Outlet /> : <Spinner />}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
