import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import styles from "./LandingPage.module.css";
import contentPhoto from "../../assets/asian-bowl-food-svgrepo-com.svg";
import menuIcon from "../../assets/menu-icon.svg";
import appIcon from "../../assets/icon-web-food.svg";
import LiIcon from "../../assets/linkedin-icon.svg";
import GhIcon from "../../assets/github-icon.svg";
// import { Footer } from "../Footer/Footer";
// import { Navigation } from "../Navigation/Navigation";

export const LandingPage = () => {
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      {!currentUser ? (
        <>
          <header>
            <Link to="/home" className={styles.logo}>
              <img src={appIcon} />
            </Link>

            <div className={styles.menuToggle} onClick={toggleMenu}>
              <img
                className={styles.menu_icon}
                src={menuIcon}
                alt="ikona menu"
              />
            </div>

            <ul className={isOpen ? styles.open : styles.navigation}>
              <li>
                <Link to="/login">Zaloguj się</Link>
              </li>
              <li>
                <a href="#">Kontakt</a>
              </li>
              <li>
                <a href="#">Credits</a>
              </li>
            </ul>
          </header>

          <section className={styles.hero}>
            <div className={styles.hero_text}>
              <h2>
                Witaj w aplikacji do zarządzania przepisami oraz planowania
                posiłków
              </h2>
              <h1>taberu</h1>
              <p>
                Taberu to japoński czasownik oznaczający &quot;jeść&quot; a
                aplikacja <i>taberu</i> ma na celu ułatwienie planowania
                posiłków. Dzięki naszej apce już nigdy nie będziesz mieć
                problemu z pytaniem &quot;co dzisiaj na obiad&quot; a zapisane
                rolki czy posty z inspiracjami wreszcie ujrzą światło dzienne
                i... Twój talerz.
              </p>

              <Link to="/register">
                <button className={styles.cta_button}>Chcę spróbować</button>{" "}
              </Link>
            </div>
            <div className={styles.hero_image}>
              <img src={contentPhoto} />
            </div>
          </section>

          <div className={styles.social_icons}>
            <a href="#">
              <img src={LiIcon} />
            </a>
            <a href="#">
              {" "}
              <img src={GhIcon} />
            </a>
          </div>
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};
