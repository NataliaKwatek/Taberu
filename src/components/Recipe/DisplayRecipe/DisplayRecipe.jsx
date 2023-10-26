import useAuth from "../../../context/AuthContext";
import styles from "./DisplayRecipe.module.css";
import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";
import removeRecipe from "./removeRecipe";
import webIcon from "../../../assets/icon-web-food.svg";

export const DisplayRecipe = () => {
  const { currentUser } = useAuth();

  const { logout } = useAuth();

  const userID = currentUser.uid;

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async (userID) => {
    const q = query(collection(db, "Recipes"), where("userID", "==", userID));
    const data = await getDocs(q);
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes(userID);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/home">
              <img src={webIcon} />
            </Link>
          </div>
          <div className={styles.nav_bar}>
            <button
              type="button"
              className={styles.button_logout}
              onClick={logout}
            >
              Wyloguj
            </button>
          </div>
        </div>

        <div className={styles.title}>
          Tutaj możesz zobaczyć swoje przepisy{" "}
        </div>

        <div className={styles.recipe_wrapper}>
          <div className={styles.recipe_tile}>
            <ul className={styles.recipe_content}>
              <span>
                {" "}
                {recipes.length === 0 && (
                  <p>Nie masz jeszcze żadnych przepisów</p>
                )}{" "}
              </span>

              {recipes.map((recipe, i) => (
                <li key={i} className={styles.recipe}>
                  <div key={recipe.id}>
                    <div>{recipe.name}</div>

                    <div>
                      {recipe.types?.map((type, i) => (
                        <div key={i}>{type}</div>
                      ))}
                    </div>

                    {/* <div>{recipe.description}</div> */}
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
                  <div className={styles.buttons_container}>
                    <Link to={`/edit/${recipe.id}`}>Edytuj</Link>
                    <button
                      type="button"
                      onClick={() =>
                        removeRecipe(recipe.id, getRecipes, userID)
                      }
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
