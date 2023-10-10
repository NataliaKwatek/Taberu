import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";
import removeRecipe from "./removeRecipe";

export const DisplayRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes();
  }, []);


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
                <div>Kalorie: {recipe.calories}</div>
                <div>Białko: {recipe.protein}</div>
                <div>Tłuszcze: {recipe.fat}</div>
                <div>Węglowodany: {recipe.carbohydrates}</div>
            </div>
            <Link to={`/edit/${recipe.id}`}>Edytuj</Link>
            <button type="button" onClick={()=>removeRecipe(recipe.id, getRecipes)}>
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
