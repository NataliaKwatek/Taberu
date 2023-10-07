import useAuth from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export const HomePage = () => {

const { logout } = useAuth();
const { currentUser } = useAuth();

  return (
    <>
    <Toaster />
      <h2>Witaj na stronie Taberu</h2>
      <h3>Zalogowany jako: {currentUser.email}</h3>
      <Link to="/display"><button>Wyświetl przepisy</button></Link>
      <Link to="/add"><button>Dodaj przepis</button></Link>
      <Link to='/createplan'><button>Stwórz plan posiłków</button></Link>
      <Link to='/displayplan'><button>Wyświetl plan posiłków</button></Link>
      <div>Jesteś zalogowany</div>
      <button onClick={logout}>Wyloguj</button>
    </>
  );
};
