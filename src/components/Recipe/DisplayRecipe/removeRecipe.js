import { db } from "../../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const removeRecipe = async (recipeID, getRecipes) => {
    try {
      const recipeRef = doc(db, "Recipes", recipeID);
      await deleteDoc(recipeRef);
      console.log("Document successfully deleted!");
        getRecipes()
    } catch (error) {
      console.log(error.message);
    }
  };

  export default removeRecipe;