import useAuth from "../../../context/AuthContext";
import { db } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddRecipe.module.css";
import typesData from "../Types/types.json";
import Types from "../Types/Types";

export const AddRecipe = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const recipeID = uuidv4();

  const [ingredient, setIngredient] = useState([
    { intName: "", intWeight: "" },
  ]);

  const [selectedTypes, setSelectedTypes] = useState([]);

  const addRecipeToDatabase = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      // const description = e.target.description.value;
      const types = selectedTypes;
      const ingredients = ingredient;
      const preparation = e.target.preparation.value;
      const calories = e.target.calories.value;
      const protein = e.target.protein.value;
      const fat = e.target.fat.value;
      const carbohydrates = e.target.carbohydrates.value;
      // const newRecipe = doc(db, "Recipes", recipeID);

      if (calories < 0 || protein < 0 || fat < 0 || carbohydrates < 0) {
        throw new Error("Wartości nie mogą być ujemne");
      }

      const newRecipeRef = doc(db, "Recipes", recipeID);

      await setDoc(newRecipeRef, {
        name: name,
        // description: description,
        types: types,
        ingredients: ingredients,
        preparation: preparation,
        calories: calories,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
        userID: currentUser.uid,
      });


      toast.success("Zapisano przepis w bazie danych");
      navigate("/display");
    } catch (error) {
      toast.error(error.message);
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

        {/* <label htmlFor="description">Opis przepisu</label>
        <input type="text" id="description" required /> */}



     <div className={styles.types_container}>
							<legend>Kategoria</legend>
							<label htmlFor='types'>
								Wybierz typ posiłku
                <br />
                Możesz wybrać kilka opcji
							</label>
							<Types
								types={typesData}
								selectedTypes={selectedTypes}
								setSelectedTypes={setSelectedTypes}
							/>
						</div>



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
        <label htmlFor="makro">Makroskładniki</label>
        <br />
        <label htmlFor="calories">Kalorie</label>
        <input type="number" id="calories" required/>
        <label htmlFor="protein">Białko</label>
        <input type="number" id="protein" required />
        <label htmlFor="fat">Tłuszcze</label>
        <input type="number" id="fat" required />
        <label htmlFor="carbohydrates">Węglowodany</label>
        <input type="number" id="carbohydrates" required />
        <br />
        <button>Zapisz przepis</button>
      </form>
    </>
  );
};
