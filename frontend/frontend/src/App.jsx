import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
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
            <Route element={<ProtectedRoute />}>
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
