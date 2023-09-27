import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const PasswordReminder = () => {

    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
			await sendPasswordResetEmail(auth, e.target.email.value).then(() => {
				toast.success('Wysłano e-mail z linkiem do resetu hasła', {
					duration: 1000,
				});
				new Promise((r) => setTimeout(r, 1500)).then(() => navigate('/login'));
			});
		} catch (error) {
			console.log(error.message);
		}
	};

  return (
    <>
    Przypomnij hasło
    <form onSubmit={handlePasswordReset}>
    <p>Podaj adres email, na który wyślemy link do zresetowania hasła</p>
        <label htmlFor="email">Email</label>
        
        <input type="email" name="email" id="email" required />
        <button>Wyślij link</button>
        </form>
       
    </>
  )
}
