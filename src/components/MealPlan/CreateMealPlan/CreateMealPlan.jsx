import { db } from "../../../config/firebase";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const CreateMealPlan = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipesToSelect = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipesToSelect();
  }, []);

  const [mealPlan, setMealPlan] = useState({
    date: "",
    breakfast: "",
    secondBreakfast: "",
    dinner: "",
    tea: "",
    supper: "",
    snack: "",
  });

  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  const handleSelect = (e) => {
    const newMealPlan = { ...mealPlan, [e.target.name]: e.target.value };
    setMealPlan(newMealPlan);
  };

  useEffect(() => {
    const newNutritionSummary = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    };

    if (mealPlan.breakfast) {
      const breakfast = recipes.find(
        (recipe) => recipe.id === mealPlan.breakfast
      );

      if (breakfast) {
        newNutritionSummary.calories += Number(breakfast.calories);
        newNutritionSummary.protein += Number(breakfast.protein);
        newNutritionSummary.fat += Number(breakfast.fat);
        newNutritionSummary.carbohydrates += Number(breakfast.carbohydrates);
      }
    }

    if (mealPlan.secondBreakfast) {
      const secondBreakfast = recipes.find(
        (recipe) => recipe.id === mealPlan.secondBreakfast
      );
      if (secondBreakfast) {
        newNutritionSummary.calories += Number(secondBreakfast.calories);
        newNutritionSummary.protein += Number(secondBreakfast.protein);
        newNutritionSummary.fat += Number(secondBreakfast.fat);
        newNutritionSummary.carbohydrates += Number(
          secondBreakfast.carbohydrates
        );
      }
    }

    if (mealPlan.dinner) {
      const dinner = recipes.find((recipe) => recipe.id === mealPlan.dinner);
      if (dinner) {
        newNutritionSummary.calories += Number(dinner.calories);
        newNutritionSummary.protein += Number(dinner.protein);
        newNutritionSummary.fat += Number(dinner.fat);
        newNutritionSummary.carbohydrates += Number(dinner.carbohydrates);
      }
    }

    if (mealPlan.tea) {
      const tea = recipes.find((recipe) => recipe.id === mealPlan.tea);
      if (tea) {
        newNutritionSummary.calories += Number(tea.calories);
        newNutritionSummary.protein += Number(tea.protein);
        newNutritionSummary.fat += Number(tea.fat);
        newNutritionSummary.carbohydrates += Number(tea.carbohydrates);
      }
    }

    if (mealPlan.supper) {
      const supper = recipes.find((recipe) => recipe.id === mealPlan.supper);
      if (supper) {
        newNutritionSummary.calories += Number(supper.calories);
        newNutritionSummary.protein += Number(supper.protein);
        newNutritionSummary.fat += Number(supper.fat);
        newNutritionSummary.carbohydrates += Number(supper.carbohydrates);
      }
    }

    if (mealPlan.snack) {
      const snack = recipes.find((recipe) => recipe.id === mealPlan.snack);
      if (snack) {
        newNutritionSummary.calories += Number(snack.calories);
        newNutritionSummary.protein += Number(snack.protein);
        newNutritionSummary.fat += Number(snack.fat);
        newNutritionSummary.carbohydrates += Number(snack.carbohydrates);
      }
    }

    setNutritionSummary(newNutritionSummary);
  }, [mealPlan]);

  const mealPlanID = uuidv4();

  const addMealPlanToDataBase = async (e) => {
    e.preventDefault();

    try {
      const date = e.target.date.value;
      const breakfast = e.target.breakfast.value;
      const secondBreakfast = e.target.secondBreakfast.value;
      const dinner = e.target.dinner.value;
      const tea = e.target.tea.value;
      const supper = e.target.supper.value;
      const snack = e.target.snack.value;

      const newMealPlan = doc(db, "MealPlans", mealPlanID);

      await setDoc(newMealPlan, {
        date: date,
        breakfast: breakfast,
        secondBreakfast: secondBreakfast,
        dinner: dinner,
        tea: tea,
        supper: supper,
        snack: snack,
      });

      console.log("Zapisano plan w bazie danych");
      e.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>Tutaj stworzysz swój plan posiłków</div>
      <form onSubmit={addMealPlanToDataBase}>
        <label htmlFor="date">Wybierz datę</label>
        <input type="date" id="date" name="date" />

        <label htmlFor="breakfast">Śniadanie</label>
        <select name="breakfast" id="breakfast" onChange={handleSelect}>
          <option value="">Wybierz przepis</option>

          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
        </select>

        <label htmlFor="secondBreakfast">Drugie śniadanie</label>
        <select
          name="secondBreakfast"
          id="secondBreakfast"
          onChange={handleSelect}
        >
          <option value="">Wybierz przepis</option>

          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
        </select>

        <label htmlFor="dinner">Obiad</label>
        <select name="dinner" id="dinner" onChange={handleSelect}>
          <option value="">Wybierz przepis</option>{" "}
          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
        </select>

        <label htmlFor="tea">Podwieczorek</label>
        <select name="tea" id="tea" onChange={handleSelect}>
          {" "}
          <option value="">Wybierz przepis</option>{" "}
          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
        </select>

        <label htmlFor="supper">Kolacja</label>
        <select name="supper" id="supper" onChange={handleSelect}>
          {" "}
          <option value="">Wybierz przepis</option>{" "}
          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}
        </select>

        <label htmlFor="snack">Przekąska</label>
        <select name="snack" id="snack" onChange={handleSelect}>
          <option value="">Wybierz przepis</option>{" "}
          {recipes.map((recipe, i) => (
            <option key={i} value={recipe.id}>
              {`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}
            </option>
          ))}{" "}
        </select>

        <div>Podsumowanie wartości odżywczych stworzonego planu</div>
        <div>Suma kalorii: {nutritionSummary.calories} </div>
        <div>Białko: {nutritionSummary.protein}</div>
        <div>Tłuszcze: {nutritionSummary.fat}</div>
        <div>Węglowodany: {nutritionSummary.carbohydrates} </div>

        <button type="submit">Zapisz plan</button>
      </form>

      <button type="button">Dodaj następny dzień</button>
    </>
  );
};
