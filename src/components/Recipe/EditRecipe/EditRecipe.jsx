import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./EditRecipe.module.css";
import typesData from "../Types/types.json";
import Types from "../Types/Types";

export const EditRecipe = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const recipeRef = doc(db, "Recipes", id);

  const getRecipe = async () => {
    try {
      const recipeSnapshot = await getDoc(recipeRef);

      if (recipeSnapshot.exists()) {
        const recipeFilteredData = recipeSnapshot.data();
        setRecipe(recipeFilteredData);
        setSelectedTypes(recipeFilteredData.types);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("wypisuje błąd:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const types = selectedTypes;
      // const description = e.target.description.value;
      const ingredients = recipe.ingredients;
      const preparation = e.target.preparation.value;
      const calories = e.target.calories.value;
      const protein = e.target.protein.value;
      const fat = e.target.fat.value;
      const carbohydrates = e.target.carbohydrates.value;

      if (calories < 0 || protein < 0 || fat < 0 || carbohydrates < 0) {
        throw new Error("Wartości nie mogą być ujemne");
      }

      await updateDoc(recipeRef, {
        name: name,
        types: types,
        // description: description,
        ingredients: ingredients,
        preparation: preparation,
        calories: calories,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
      });

      toast.success("Zaktualizowano przepis w bazie danych");
      navigate("/display");
    } catch (error) {
      toast.error("błąd z handle update: " + error.message);
    }
  };

  const handleAddNewInt = (e) => {
    e.preventDefault();
    const updatedRecipe = { ...recipe };
    updatedRecipe.ingredients.push({ intName: "", intWeight: "" });
    setRecipe(updatedRecipe);
  };

  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    recipe.ingredients[i][name] = value;
    setRecipe(recipe);
  };

  const handleDelete = (i) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.ingredients.splice(i, 1);
    setRecipe(updatedRecipe);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <div>Tutaj możesz edytować przepisy</div>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Nazwa przepisu</label>
        <input type="text" name="name" id="name" defaultValue={recipe.name} />

        {/* <label htmlFor="description">Opis przepisu</label>
        <input
          type="text"
          name="description"
          id="description"
          defaultValue={recipe.description}
        /> */}

        <label htmlFor="types">Typy</label>
        <Types
          types={typesData}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />

        <label htmlFor="ingredients">Składniki</label>

        <button type="button" onClick={handleAddNewInt}>
          Dodaj składnik
        </button>

        {recipe.ingredients?.map((val, i) => (
          <div key={i}>
            <input
              name="intName"
              defaultValue={val.intName}
              onChange={(e) => handleChange(e, i)}
              required
            />
            <input
              name="intWeight"
              defaultValue={val.intWeight}
              onChange={(e) => handleChange(e, i)}
              required
            />
            <button type="button" onClick={() => handleDelete(i)}>
              Usuń składnik
            </button>
          </div>
        ))}

        <label htmlFor="preparation">Przygotowanie</label>
        <input
          type="text"
          name="preparation"
          id="preparation"
          defaultValue={recipe.preparation}
        />

        <label htmlFor="calories">Kalorie</label>
        <input
          type="number"
          name="calories"
          id="calories"
          defaultValue={recipe.calories}
        />
        <label htmlFor="protein">Białko</label>
        <input
          type="number"
          name="protein"
          id="protein"
          defaultValue={recipe.protein}
        />
        <label htmlFor="fat">Tłuszcz</label>
        <input type="number" name="fat" id="fat" defaultValue={recipe.fat} />
        <label htmlFor="carbohydrates">Węglowodany</label>
        <input
          type="number"
          name="carbohydrates"
          id="carbohydrates"
          defaultValue={recipe.carbohydrates}
        />
        <button type="submit">Zapisz zmiany</button>
      </form>
    </>
  );
};
