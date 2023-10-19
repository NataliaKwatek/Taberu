import { Navigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../../../context/AuthContext";
import { showPassword } from "../../../utils/ShowPasswords";
import passwordIcon from "../../../assets/password.svg";
import mailIcon from "../../../assets/mail.svg";
import webIcon from "../../../assets/icon-web-food.svg";

export const Login = () => {
  const { currentUser, login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target?.email.value;
    const password = e.target?.password.value;

    try {
      await login(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!currentUser ? (
        <>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={webIcon} />
              </Link>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <h1>Logowanie</h1>
              <form onSubmit={handleLogin}>
                <div className={styles.input_box}>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Mail"
                    required
                  />
                  <img src={mailIcon} alt="ikona maila" />
                </div>

                <div className={styles.input_box}>
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Hasło"
                    required
                  />
                  <img src={passwordIcon} alt="ikona hasła" />
                </div>

                <div className={styles.show_forgot}>
                  <label>
                    <input type="checkbox" onClick={showPassword} />
                    Pokaż hasło
                  </label>
                  <Link to="/passwordreminder">Przypomnij hasło</Link>
                </div>

                <button type="submit" className={styles.login_button}>
                  Zaloguj się
                </button>
                
                <div className={styles.register_link}>
                  <p>
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};
