import useAuth from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import webIcon from "../../assets/icon-web-food.svg";
import styles from "./HomePage.module.css";
import recipeIcon from "../../assets/carp-fish-japan-svgrepo-com.svg";
import addRecipeIcon from "../../assets/cat-culture-happy-svgrepo-com.svg";
import createPlanIcon from "../../assets/fish-food-meal-svgrepo-com.svg";
import displayPlanIcon from "../../assets/drink-fresh-green-svgrepo-com.svg";

export const HomePage = () => {
  const { logout } = useAuth();

  const { currentUser } = useAuth();

  const [user, setUser] = useState([]);

  const getUser = async () => {
    const docRef = doc(db, "Users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      toast.error("Błąd bazy danych");
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid, setUser);
    }
  }, [currentUser]);

  return (
    <>
      {user ? (
        <>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Link to="/home">
                <img src={webIcon} />
              </Link>
            </div>
            <div className={styles.nav_bar}>
              <span>Witaj {user.login}</span>
              <button type="button" className={styles.button_logout} onClick={logout}>Wyloguj</button>
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.menu_container}>

              <Link to="/display" className={styles.menu_title}>
                <div className={styles.menu_tile}>
                  <img src={recipeIcon} />
                  <span>Przepisy</span>
                </div>
              </Link>

              <Link to="/add" className={styles.menu_title}>
                <div className={styles.menu_tile}>
                  <img src={addRecipeIcon} />
                  <span>Dodaj przepis</span>
                </div>
              </Link>

              <Link to="/createplan" className={styles.menu_title}>
                <div className={styles.menu_tile}>
                  <img src={createPlanIcon} />
                  <span>Stwórz plan</span>
                </div>
              </Link>

              <Link to="/displayplan" className={styles.menu_title}>
                <div className={styles.menu_tile}>
                  <img src={displayPlanIcon} />
                  <span>Plany</span>
                </div>
              </Link>

            </div>
          </div>

          <Outlet />
        </>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
};
