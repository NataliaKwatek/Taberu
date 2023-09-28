import useAuth from "../../../context/AuthContext";
import { db } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const AddRecipe = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const recipeID = uuidv4();

  const [ingredient, setIngredient] = useState([
    { intName: "", intWeight: "" },
  ]);

  const addRecipeToDatabase = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const description = e.target.description.value;
      const ingredients = ingredient;
      const preparation = e.target.preparation.value;
      const newRecipe = doc(db, "Recipes", recipeID);

      await setDoc(newRecipe, {
        name: name,
        description: description,
        ingredients: ingredients,
        preparation: preparation,
        userID: currentUser.uid,
      });

      toast("Zapisano przepis w bazie danych");
      navigate("/display");
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleClick = () => {
    setIngredient([...ingredient, { intName: "", intWeight: "" }]);
  };
  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    const onchangeVal = [...ingredient];
    onchangeVal[i][name] = value;
    setIngredient(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...ingredient];
    deleteVal.splice(i, 1);
    setIngredient(deleteVal);
  };

  return (
    <>
      <div>Tutaj możesz dodać swój przepis</div>
      <form onSubmit={addRecipeToDatabase}>
        <label htmlFor="name">Nazwa przepisu</label>
        <input type="text" id="name" required />

        <label htmlFor="description">Opis przepisu</label>
        <input type="text" id="description" required />

        <label htmlFor="ingredients">Składniki</label>
        <button type="button" onClick={handleClick}>
          Dodaj składnik
        </button>
        {ingredient.map((val, i) => (
          <div key={i}>
            <input
              name="intName"
              value={val.intName}
              onChange={(e) => handleChange(e, i)}
              required
            />
            <input
              name="intWeight"
              value={val.intWeight}
              onChange={(e) => handleChange(e, i)}
              required
            />
            <button type="button" onClick={() => handleDelete(i)}>
              Usuń składnik
            </button>
          </div>
        ))}

        <label htmlFor="preparation">Przygotowanie</label>
        <input type="text" id="preparation" />
        <br />
        <br />
        <button>Zapisz przepis</button>
      </form>
    </>
  );
};
