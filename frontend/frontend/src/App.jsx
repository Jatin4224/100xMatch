import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./body";
import Login from "./login";
import Feed from "./feed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="feed" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
