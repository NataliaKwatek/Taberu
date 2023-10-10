import { Navigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../../../context/AuthContext";
import { showPassword } from "../../../utils/ShowPasswords";

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
        <h2>Zaloguj się</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Hasło</label>
          <input type="password" name="password" id="password" required />
          <input type="checkbox" onClick={showPassword} />
          Pokaż hasło
          <button>Zaloguj się</button>
        </form>
        Nie pamiętasz hasła? 
        <Link to="/passwordreminder"><button>Zresetuj hasło</button></Link>
        </>
      ) : (
        <Navigate to='/home' />
      )}
    </>
  );
};
