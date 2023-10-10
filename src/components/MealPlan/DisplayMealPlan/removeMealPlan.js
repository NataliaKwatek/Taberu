import { db } from "../../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const removeMealPlan = async (mealPlanID, getMealPlans) => {
    try {
      const mealPlanRef = doc(db, "MealPlans", mealPlanID);
      await deleteDoc(mealPlanRef);
      toast("Document successfully deleted!");
      getMealPlans();
    } catch (error) {
      toast(error.message);
    }
  };

export default removeMealPlan;