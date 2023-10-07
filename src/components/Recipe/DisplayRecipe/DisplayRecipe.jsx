import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const DisplayRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const removeRecipe = async (recipeID) => {
    try {
      const recipeRef = doc(db, "Recipes", recipeID);
      await deleteDoc(recipeRef);
      console.log("Document successfully deleted!");
        getRecipes()
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>Tutaj możesz zobaczyć swoje przepisy </div>

      <ul>
        {recipes.length === 0 && <p>Nie masz jeszcze żadnych przepisów</p>}
        {recipes.map((recipe, i) => (
          <li key={i}>
            <div key={recipe.id}>
              <div>{recipe.name}</div>
              <div>{recipe.description}</div>
              <div>
                {recipe.ingredients?.map((ingredient, i) => (
                  <div key={i}>
                    <div>{ingredient.intName}</div>
                    <div>{ingredient.intWeight}</div>
                  </div>
                ))}
              </div>
              <div>{recipe.preparation}</div>
                <div>{recipe.calories}</div>
                <div>{recipe.protein}</div>
                <div>{recipe.fat}</div>
                <div>{recipe.carbohydrates}</div>
            </div>
            <Link to={`/edit/${recipe.id}`}>Edytuj</Link>
            <button type="button" onClick={()=>removeRecipe(recipe.id)}>
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
