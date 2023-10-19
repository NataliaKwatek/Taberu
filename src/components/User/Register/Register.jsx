import styles from "./Register.module.css";
import useAuth from "../../../context/AuthContext";
import { auth, db } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  showPassword,
  showPasswordConfirm,
} from "../../../utils/ShowPasswords";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import webIcon from "../../../assets/icon-web-food.svg";
import userIcon from "../../../assets/user.svg";
import mailIcon from "../../../assets/mail.svg";
import passwordIcon from "../../../assets/password.svg";
import openPasswordIcon from "../../../assets/open-password.svg";


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
      <div className={styles.header}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={webIcon} />
              </Link>
            </div>
          </div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
    
      <h1>Rejestracja</h1>

      <form onSubmit={handleRegister}>
      
      <div className={styles.input_box}>
        <label htmlFor="name"></label>
        <input type="text" id="name" name="name" placeholder="Login" required/>
        <img src={userIcon} alt="ikona użytkownika" />
        
      </div>

      <div className={styles.input_box}>
        <label htmlFor="email"></label>
        <input type="email" id="email" name="email" placeholder="Mail" required/>
        <img src={mailIcon} alt="ikona maila" />
</div>

<div className={styles.input_box}>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[&%$]).{8,}$"
          title="Twoje hasło musi zawierać 8 znaków, co najmniej 1 cyfrę, 1 znak specjalny i 1 dużą literę"
          placeholder="Hasło"
          required
        />
        <div onClick={showPassword} className={styles.pass_icons}>
        <img src={passwordIcon} alt="ikona hasła" id="closed" className={styles.closed}/>
        <img src={openPasswordIcon} alt="ikona pokazanego hasła" id="open_pass" className={styles.open_password_icon} />
        </div>
 
        </div>
        <div className={styles.input_box}>
        <label htmlFor="password_confirm"></label>
        <input type="password" id="password_confirm" name="password_confirm" placeholder="Powtórz hasło" required />
       
        <div onClick={showPasswordConfirm} className={styles.pass_icons}>
        <img src={passwordIcon} alt="ikona hasła" id="closed_conf" className={styles.closed}/>
        <img src={openPasswordIcon} id="open_pass_conf" alt="ikona pokazanego hasła" className={styles.open_password_icon} />
        </div>
  
        </div>
        <button type="submit" className={styles.register_button}>Zarejestruj się</button>

        <div className={styles.login_link}>
                  <p>
                    Masz już konto? <Link to="/login">Zaloguj się</Link>
                  </p>
                </div>

      </form>
     </div>
      </div>
    </>
  );
};
