import { db } from "../../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

  const removeRecipe = async (id, getRecipes, userID) => {
    try {
      const recipeRef = doc(db, "Recipes", id);
      await deleteDoc(recipeRef);
      toast("Document successfully deleted!");
      getRecipes(userID);
    } catch (error) {
      toast.error("Error removing document: ", error);
    }
  }

  export default removeRecipe;