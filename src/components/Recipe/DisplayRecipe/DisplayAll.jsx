import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs} from "firebase/firestore";


export const DisplayAll = () => {
  const [recipes, setRecipes] = useState([]);

  const getAllRecipes = async () => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <div>DisplayAll</div>
      <ul>
        {recipes.map((recipe, i) => (
          <li key={i}>
            <div key={recipe.id}>
              <div>{recipe.name}</div>

              <div>
                {recipe.types?.map((type, i) => (
                  <div key={i}>{type}</div>
                ))}
              </div>

              <div>
                {recipe.ingredients?.map((ingredient, i) => (
                  <div key={i}>
                    <div>
                      {ingredient.intName + " "}
                      {ingredient.intWeight}
                    </div>
                  </div>
                ))}
              </div>
              <div>{recipe.preparation}</div>
              <div>Kalorie: {recipe.calories}</div>
              <div>Białko: {recipe.protein}</div>
              <div>Tłuszcze: {recipe.fat}</div>
              <div>Węglowodany: {recipe.carbohydrates}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
