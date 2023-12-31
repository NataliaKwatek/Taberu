import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import calculateNutritionSummary from "../../../utils/calculateNutritionSummary";
import findRecipeNameById from "../../../utils/findRecipeNameById";
import getRecipesToSelect from "../../../utils/getRecipesToSelect";
import getMealPlan from "./getMealPlan";
import { toast } from "react-hot-toast";

export const EditMealPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  useEffect(() => {
    calculateNutritionSummary(mealPlan, recipes, setNutritionSummary);
  }, [mealPlan]);

  const handleUpdatedMealPlan = async (e) => {
    e.preventDefault();

    try {
      const date = e.target.date.value;
      const breakfast = e.target.breakfast.value;
      const secondBreakfast = e.target.secondBreakfast.value;
      const dinner = e.target.dinner.value;
      const tea = e.target.tea.value;
      const supper = e.target.supper.value;
      const snack = e.target.snack.value;
      const nutritionSummaryUpdated = {
        calories: nutritionSummary.calories,
        protein: nutritionSummary.protein,
        fat: nutritionSummary.fat,
        carbohydrates: nutritionSummary.carbohydrates,
      };
      const mealPlanRef = doc(db, "MealPlans", id);

      await updateDoc(mealPlanRef, {
        date: date,
        breakfast: breakfast,
        secondBreakfast: secondBreakfast,
        dinner: dinner,
        tea: tea,
        supper: supper,
        snack: snack,
        nutritionSummary: nutritionSummaryUpdated,
      });

      toast.success("Zaktualizowano plan w bazie danych");
      navigate("/displayplan");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getRecipesToSelect(setRecipes);
    getMealPlan(setMealPlan, id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div>Edytuj plan: </div>

      <form onSubmit={handleUpdatedMealPlan}>
        <label htmlFor="date">Data: </label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={mealPlan.date}
          required
        />

        <label htmlFor="breakfast">Śniadanie: </label>
        <select
          name="breakfast"
          id="breakfast"
          value={mealPlan.breakfast}
          onChange={(e) => handleChange(e)}
        >
          <option
            defaultValue={findRecipeNameById(mealPlan.breakfast, recipes)}
          >
            {findRecipeNameById(mealPlan.breakfast, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))} <option>Brak</option>
        </select>

        <label htmlFor="secondBreakfast">II Śniadanie: </label>
        <select
          name="secondBreakfast"
          id="secondBreakfast"
          value={mealPlan.secondBreakfast}
          onChange={(e) => handleChange(e)}
        >
          <option
            defaultValue={findRecipeNameById(mealPlan.secondBreakfast, recipes)}
          >
            {findRecipeNameById(mealPlan.secondBreakfast, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
          <option>Brak</option>
        </select>

        <label htmlFor="dinner">Obiad: </label>
        <select
          name="dinner"
          id="dinner"
          value={mealPlan.dinner}
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={findRecipeNameById(mealPlan.dinner, recipes)}>
            {findRecipeNameById(mealPlan.dinner, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
          <option>Brak</option>
        </select>

        <label htmlFor="tea">Podwieczorek: </label>
        <select
          name="tea"
          id="tea"
          value={mealPlan.tea}
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={findRecipeNameById(mealPlan.tea, recipes)}>
            {findRecipeNameById(mealPlan.tea, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
          <option>Brak</option>
        </select>

        <label htmlFor="supper">Kolacja: </label>
        <select
          name="supper"
          id="supper"
          value={mealPlan.supper}
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={findRecipeNameById(mealPlan.supper, recipes)}>
            {findRecipeNameById(mealPlan.supper, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
          <option>Brak</option>
        </select>

        <label htmlFor="snack">Przekąska: </label>
        <select
          name="snack"
          id="snack"
          value={mealPlan.snack}
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={findRecipeNameById(mealPlan.snack, recipes)}>
            {findRecipeNameById(mealPlan.snack, recipes)}
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
          <option>Brak</option>
        </select>

        <div>Kalorie: {nutritionSummary.calories}</div>
        <div>Białko: {nutritionSummary.protein}</div>
        <div>Tłuszcze: {nutritionSummary.fat}</div>
        <div>Węglowodany: {nutritionSummary.carbohydrates}</div>

        <button type="submit">Zapisz zmiany</button>
      </form>
    </>
  );
};
