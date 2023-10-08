import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";

export const DisplayMealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  

  const getMealPlans = async () => {
    const data = await getDocs(collection(db, "MealPlans"));
    setMealPlans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getRecipes = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const removeMealPlan = async (mealPlanID) => {
    try {
      const mealPlanRef = doc(db, "MealPlans", mealPlanID);
      await deleteDoc(mealPlanRef);
      console.log("Document successfully deleted!");
      getMealPlans();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecipes();
    getMealPlans();
  }, []);


  const findRecipeNameById = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (recipe) {
      return recipe.name;
    } else {
      return "Posiłek nie został wybrany";
    }
  };


 
  return (
    <>
      <div>Sprawdź stworzone plany: </div>
      <ul>
        {mealPlans.length === 0 && <p>Nie masz jeszcze żadnych planów</p>}
        {mealPlans.map((mealPlan, i) => (
          <li key={i}>
            <div key={mealPlan.id}>
              <div>Data: {mealPlan.date}</div>
              <div>Śniadanie: {findRecipeNameById(mealPlan.breakfast)}</div>
              <div>II Śniadanie: {findRecipeNameById(mealPlan.secondBreakfast)}</div>
              <div>Obiad: {findRecipeNameById(mealPlan.dinner)}</div>
              <div>Podwieczorek: {findRecipeNameById(mealPlan.tea)}</div>
              <div>Kolacja: {findRecipeNameById(mealPlan.supper)}</div>
              <div>Przekąska: {findRecipeNameById(mealPlan.snack)}</div>
              <div>Kalorie: {mealPlan.nutritionSummary.calories}</div>
              <div>B: {mealPlan.nutritionSummary.protein}</div>
              <div>T: {mealPlan.nutritionSummary.fat}</div>
              <div>W: {mealPlan.nutritionSummary.carbohydrates}</div>

            </div>
            <button type="button">
              <Link to={`/editplan/${mealPlan.id}`}>Edytuj</Link>
            </button>
            <button type="button" onClick={() => removeMealPlan(mealPlan.id)}>
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
