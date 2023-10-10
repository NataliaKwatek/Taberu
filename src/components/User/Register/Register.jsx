import styles from "./Register.module.css";
import useAuth from "../../../context/AuthContext";
import { auth, db } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  showPassword,
  showPasswordConfirm,
} from "../../../utils/ShowPasswords";
import { toast } from "react-hot-toast";


export const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const addUserToDatabase = async (newUser) => {
    try {
      if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        await setDoc(docRef, newUser);
        toast("Rejestracja przebiegła pomyślnie");
        navigate("/home");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Użytkownik już istnieje");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const login = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const password_confirm = e.target.password_confirm.value;

      if (password !== password_confirm) {
        throw new Error("Hasła nie są takie same");
      }

      await register(email, password);

      const newUser = {
        login,
        email,
      };

      addUserToDatabase(newUser);
      e.target.reset();
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
    
      <h2>Zarejestruj się </h2>

      <form onSubmit={handleRegister}>
        <label htmlFor="name">Login</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[&%$]).{8,}$"
          title="Twoje hasło musi zawierać 8 znaków, co najmniej 1 cyfrę, 1 znak specjalny i 1 dużą literę"
        />
        <input
          type="checkbox"
          id="show_password"
          name="show_password"
          onClick={showPassword}
        />
        Pokaż hasło
        <label htmlFor="password_confirm">Potwierdź hasło</label>
        <input type="password" id="password_confirm" name="password_confirm" />
        <input
          type="checkbox"
          id="show_password_conf"
          name="show_password_conf"
          onClick={showPasswordConfirm}
        />
        Pokaż hasło
        <button>Zarejestruj się</button>
      </form>
     
    </>
  );
};
