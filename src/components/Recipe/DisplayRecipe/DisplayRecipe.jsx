import useAuth from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";
import removeRecipe from "./removeRecipe";

export const DisplayRecipe = () => {
  const { currentUser } = useAuth();

  const userID = currentUser.uid;

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async (userID) => {
    const q = query(collection(db, "Recipes"), where("userID", "==", userID));
    const data = await getDocs(q);
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes(userID);
  }, [recipes]);

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
            <button
              type="button"
              onClick={() => removeRecipe(recipe.id, getRecipes, userID)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
