import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const getRecipesToSelect = async (setRecipes) => {
    const data = await getDocs(collection(db, "Recipes"));
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


export default getRecipesToSelect;