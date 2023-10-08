import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";


export const EditMealPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  const getMealPlan = async () => {
    const docRef = doc(db, "MealPlans", id);
    const docSnap = await getDoc(docRef);
    setMealPlan(docSnap.data());
  };

  const getRecipesToSelect = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

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
      const mealPlanRef = doc(db, "MealPlans", id);

        console.log(breakfast);

      await updateDoc(mealPlanRef, {
        date: date,
        breakfast: breakfast,
        secondBreakfast: secondBreakfast,
        dinner: dinner,
        tea: tea,
        supper: supper,
        snack: snack,
      });

      console.log("Zaktualizowano plan w bazie danych");
      navigate("/displayplan");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getRecipesToSelect();
    getMealPlan();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setMealPlan((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

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
      <div>Edytuj plan: </div>

      <form onSubmit={handleUpdatedMealPlan}>

        <label htmlFor="date">Data: </label>
        <input type="date" id="date" name="date" defaultValue={mealPlan.date} required />

        <label htmlFor="breakfast">Śniadanie: </label>
        <select name="breakfast" id="breakfast" value={mealPlan.breakfast} onChange={(e) => handleChange(e)}>
          {recipes.map((recipe) =>  (
            <option key={recipe.id} value={recipe.id} >{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}

        </select>

        <label htmlFor="secondBreakfast">II Śniadanie: </label>
        <select name="secondBreakfast" id="secondBreakfast" value={mealPlan.secondBreakfast} onChange={(e) => handleChange(e)}>
        <option defaultValue={findRecipeNameById(mealPlan.secondBreakfast)}>{findRecipeNameById(mealPlan.secondBreakfast)}</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}
        </select>

        <label htmlFor="dinner">Obiad: </label>
        <select name="dinner" id="dinner" value={mealPlan.dinner} onChange={(e) => handleChange(e)}>
        <option defaultValue={findRecipeNameById(mealPlan.dinner)}>{findRecipeNameById(mealPlan.dinner)}</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}
        </select>

        <label htmlFor="tea">Podwieczorek: </label>
        <select name="tea" id="tea" value={mealPlan.tea} onChange={(e) => handleChange(e)}>
        <option defaultValue={findRecipeNameById(mealPlan.tea)}>{findRecipeNameById(mealPlan.tea)}</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}
        </select>

        <label htmlFor="supper">Kolacja: </label>
        <select name="supper" id="supper" value={mealPlan.supper} onChange={(e) => handleChange(e)}>
        <option defaultValue={findRecipeNameById(mealPlan.supper)}>{findRecipeNameById(mealPlan.supper)}</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}
        </select>

        <label htmlFor="snack">Przekąska: </label>
        <select name="snack" id="snack" value={mealPlan.snack} onChange={(e) => handleChange(e)}>
        <option defaultValue={findRecipeNameById(mealPlan.snack)}>{findRecipeNameById(mealPlan.snack)}</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{`${recipe.name}` + ", " + `${recipe.calories}` + " kalorii"}</option>
          ))}
        </select>


     

     <button type="submit">Zapisz zmiany</button>
     </form>
    </>
  );
};
