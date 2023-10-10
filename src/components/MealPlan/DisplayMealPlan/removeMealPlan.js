import { db } from "../../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const removeMealPlan = async (mealPlanID, getMealPlans) => {
    try {
      const mealPlanRef = doc(db, "MealPlans", mealPlanID);
      await deleteDoc(mealPlanRef);
      console.log("Document successfully deleted!");
      getMealPlans();
    } catch (error) {
      console.log(error.message);
    }
  };

export default removeMealPlan;