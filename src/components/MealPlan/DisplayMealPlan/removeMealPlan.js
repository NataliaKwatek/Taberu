import { db } from "../../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const removeMealPlan = async (mealPlanID, getMealPlans, userID) => {
    try {
      const mealPlanRef = doc(db, "MealPlans", mealPlanID);
      await deleteDoc(mealPlanRef);
      toast("Document successfully deleted!");
      getMealPlans(userID);
    } catch (error) {
      toast(error.message);
    }
  };

export default removeMealPlan;