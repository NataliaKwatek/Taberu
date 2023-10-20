import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";
import findRecipeNameById from "../../../utils/findRecipeNameById";
import removeMealPlan from "./removeMealPlan";
import useAuth from "../../../context/AuthContext";

export const DisplayMealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const { currentUser } = useAuth();  
  const userID = currentUser.uid;

  const getMealPlans = async (userID) => {
    const q = query(collection(db, "MealPlans"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    setMealPlans(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getRecipes = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes();
    getMealPlans(userID);
  }, []);


  return (
    <>
      <div>Sprawdź stworzone plany: </div>
      <ul>
        {mealPlans.length === 0 && <p>Nie masz jeszcze żadnych planów</p>}
        {mealPlans.map((mealPlan, i) => (
          <li key={i}>
            <div key={mealPlan.id}>
              <div>Data: {mealPlan.date}</div>
              <div>Śniadanie: {findRecipeNameById(mealPlan.breakfast, recipes)}</div>
              <div>II Śniadanie: {findRecipeNameById(mealPlan.secondBreakfast, recipes)}</div>
              <div>Obiad: {findRecipeNameById(mealPlan.dinner, recipes)}</div>
              <div>Podwieczorek: {findRecipeNameById(mealPlan.tea, recipes)}</div>
              <div>Kolacja: {findRecipeNameById(mealPlan.supper, recipes)}</div>
              <div>Przekąska: {findRecipeNameById(mealPlan.snack, recipes)}</div>
              <div>Kalorie: {mealPlan.nutritionSummary.calories}</div>
              <div>B: {mealPlan.nutritionSummary.protein}</div>
              <div>T: {mealPlan.nutritionSummary.fat}</div>
              <div>W: {mealPlan.nutritionSummary.carbohydrates}</div>

            </div>
            <button type="button">
              <Link to={`/editplan/${mealPlan.id}`}>Edytuj</Link>
            </button>
            <button type="button" onClick={() => removeMealPlan(mealPlan.id, getMealPlans)}>
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
