import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { HomePage } from "./components/HomePage/HomePage";
import { Login } from "./components/User/Login/Login";
import { Register } from "./components/User/Register/Register";
import { PasswordReminder } from "./components/User/PasswordReminder/PasswordReminder";
import { AddRecipe } from "./components/Recipe/AddRecipe/AddRecipe";
import { DisplayRecipe } from "./components/Recipe/DisplayRecipe/DisplayRecipe";
import { EditRecipe } from "./components/Recipe/EditRecipe/EditRecipe"; 
import { CreateMealPlan } from "./components/MealPlan/CreateMealPlan/CreateMealPlan";
import { DisplayMealPlan } from "./components/MealPlan/DisplayMealPlan/DisplayMealPlan";
import { EditMealPlan } from "./components/MealPlan/EditMealPlan/EditMealPlan";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordreminder" element={<PasswordReminder />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/display" element={<DisplayRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/createplan" element={<CreateMealPlan />} />
        <Route path="/displayplan" element={<DisplayMealPlan />} />
        <Route path="/editplan/:id" element={<EditMealPlan />} />

        <Route path="*" element={<HomePage />} />

      </Route>
    </Routes>
  );
}

export default App;
