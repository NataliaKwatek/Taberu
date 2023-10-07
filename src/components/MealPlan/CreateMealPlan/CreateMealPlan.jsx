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

  const [mealPlan, setMealPlan] = useState([]);

  const handleSelect = (e) => {
    setMealPlan(e.target.value);
  };

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
  }


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
          <option key={i} value={recipe.name}>
            {recipe.name}
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
          <option key={i} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>

      <label htmlFor="dinner">Obiad</label>
      <select name="dinner" id="dinner" onChange={handleSelect}>
        <option value="">Wybierz przepis</option>{" "}
        {recipes.map((recipe, i) => (
          <option key={i} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>

      <label htmlFor="tea">Podwieczorek</label>
      <select name="tea" id="tea" onChange={handleSelect}>
        {" "}
        <option value="">Wybierz przepis</option>{" "}
        {recipes.map((recipe, i) => (
          <option key={i} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>

      <label htmlFor="supper">Kolacja</label>
      <select name="supper" id="supper" onChange={handleSelect}>
        {" "}
        <option value="">Wybierz przepis</option>{" "}
        {recipes.map((recipe, i) => (
          <option key={i} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>

      <label htmlFor="snack">Przekąska</label>
      <select name="snack" id="snack" onChange={handleSelect}>
        <option value="">Wybierz przepis</option>{" "}
        {recipes.map((recipe, i) => (
          <option key={i} value={recipe.name}>
            {recipe.name}
          </option>
        ))}{" "}
      </select>

      <div>Podsumowanie wartości odżywczych stworzonego planu</div>
    
  

      <button type="submit">Zapisz plan</button>
      </form>

      <button type="button">Dodaj następny dzień</button>
    </>
  );
};
