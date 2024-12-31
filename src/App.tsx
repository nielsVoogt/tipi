import { Route, Routes } from "react-router-dom";

import { Register } from "./pages/auth/Register";

const App = () => {
  return (
    <Routes>
      {/* <Route element={<AuthRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route> */}
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export { App };
