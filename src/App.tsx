import { Route, Routes } from "react-router-dom";

import { AddTip } from "./pages/tip/AddTip";
import AuthRoute from "./components/AuthRoute";
import { CreateGroup } from "./pages/group/CreateGroup";
import Home from "./pages/home/Home";
import { InviteMember } from "./pages/group/InviteMember";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<AuthRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-tip" element={<AddTip />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/invite-member" element={<InviteMember />} />
      </Route>
    </Routes>
  );
};

export { App };
