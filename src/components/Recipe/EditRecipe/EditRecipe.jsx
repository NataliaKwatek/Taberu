import { useParams } from "react-router-dom";
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
import { ref } from "@firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const EditRecipe = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [recipe, setRecipe] = useState([]);

 

  const getRecipe = async () => {
    const docRef = doc(db, "Recipes", id);
    const docSnap = await getDoc(docRef);
    setRecipe(docSnap.data());
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const description = e.target.description.value;
      const ingredients = recipe.ingredients;
      const preparation = e.target.preparation.value;
      const recipeRef = doc(db, "Recipes", id);

      await updateDoc(recipeRef, {
        name: name,
        description: description,
        ingredients: ingredients,
        preparation: preparation,
      });

      console.log("Zaktualizowano przepis w bazie danych");
      navigate("/display");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddNewInt = (e) => {
    e.preventDefault();
    const updatedRecipe = {...recipe};
    updatedRecipe.ingredients.push({intName: "", intWeight: ""});
    setRecipe(updatedRecipe);
  };


  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    recipe.ingredients[i][name] = value;
    setRecipe(recipe);
  };

  const handleDelete = (i) => {
    const updatedRecipe = {...recipe};
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
        <label htmlFor="description">Opis przepisu</label>
        <input
          type="text"
          name="description"
          id="description"
          defaultValue={recipe.description}
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
        <button type="submit">Zapisz zmiany</button>
      </form>
    </>
  );
};
