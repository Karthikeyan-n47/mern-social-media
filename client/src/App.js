// import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { Route, Routes, Navigate } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { useSelector } from "react-redux";

function App() {
  // const { user } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Home /> : <Navigate replace to={"/login"} />}
      />
      <Route
        path="/login"
        element={user ? <Navigate replace to={"/"} /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate replace to={"/"} /> : <Register />}
      />
      <Route
        path="/messenger"
        element={!user ? <Navigate replace to={"/login"} /> : <Messenger />}
      />
      <Route
        path="/profile/:username"
        element={user ? <Profile /> : <Navigate replace to={"/login"} />}
      />
      <Route
        path="/forgot-password"
        element={user ? <Navigate replace to={"/"} /> : <ForgotPassword />}
      />
      <Route
        path="/reset-password/:id/:token"
        element={user ? <Navigate replace to={"/"} /> : <ResetPassword />}
      />
    </Routes>
  );
}

export default App;
