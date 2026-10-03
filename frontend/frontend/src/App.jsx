import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import NotFound from "./components/NotFound";
import { GuestRoute, ProtectedRoute } from "./components/RouteGuards";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route element={<GuestRoute />}>
              <Route path="login" element={<Login />} />
            </Route>
            {/* new users fill in their profile first */}
            <Route element={<GuestRoute redirectTo="/profile" />}>
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
