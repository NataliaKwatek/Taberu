import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { HomePage } from "./components/HomePage/HomePage";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { PasswordReminder } from "./components/User/PasswordReminder/PasswordReminder";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordreminder" element={<PasswordReminder />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
