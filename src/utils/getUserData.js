import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";

export const getUserData = async (userId, setUser) => {
  const userRef = doc(db, "Users", userId);

  try {
    const userData = await getDoc(userRef);
    if (userData.exists()) {
      const userDataFiltered = userData.data();
      setUser(userDataFiltered);
    }
  } catch (error) {
    console.log(error);
    toast.error("Błąd serwera");
  }
};
