import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const LandingPage = () => {
  return (
    <>
    <Toaster />
      <div>
        Witaj na stronie Taberu
        <Link to="/login">
          <button>Zaloguj się</button>
        </Link>
        <Link to="/register">
          <button>Zarejestruj się</button>
        </Link>
      </div>
    </>
  );
};
