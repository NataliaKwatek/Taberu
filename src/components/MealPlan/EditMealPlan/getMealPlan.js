import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const getMealPlan = async (setMealPlan, id) => {
    const docRef = doc(db, "MealPlans", id);
    const docSnap = await getDoc(docRef);
    setMealPlan(docSnap.data());
  };

  export default getMealPlan;