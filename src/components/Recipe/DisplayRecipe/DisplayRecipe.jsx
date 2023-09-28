import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";

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
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
