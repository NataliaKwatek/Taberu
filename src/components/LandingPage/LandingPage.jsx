import { Link } from "react-router-dom";


export const LandingPage = () => {
  return (
    <>
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
