import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("parth@example.com");
  const [password, setPassword] = useState("Parth4224@@");
  const [buttonMessage, setButtonMessage] = useState("Login");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data === "user is not found") {
        console.error("Error:", res.data);

        alert("Login failed: User is not found");
        return;
      }

      console.log("Login successful:", res.data);
      dispatch(addUser(res.data));

      setButtonMessage("You’re home, 100x Dev. Let’s innovate together!😉");
      return navigate("/feed");
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
        console.error("Status Code:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error Message:", err.message);
      }
      setButtonMessage("Failed!🥺🥺");
    }
  };

  return (
    <div className="flex justify-center pt-40 relative">
      <div className="absolute top-10 left-0 right-0 h-1/2 flex justify-center ">
        <img
          src="https://media.tenor.com/nP7Hl7wEZOcAAAAi/hacker-meme-hacker.gif"
          alt="Hacker Meme"
          className="w-25 h-25 object-cover shadow-lg"
        />
      </div>
      <div className="card bg-base-400 w-96 shadow-lg bg-base-200  top-20 hover:shadow-[0px_4px_30px_0px_rgba(255,255,255,0.3)]">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-outline btn-error" onClick={handleLogin}>
            {buttonMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
