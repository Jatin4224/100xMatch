import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/login";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
