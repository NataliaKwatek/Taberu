import useAuth from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const HomePage = () => {

const { logout } = useAuth();
const { currentUser } = useAuth();

const user = currentUser;

  return (
    <>
   {user ? (
     <>
      <Toaster />
      <div>Witaj {user.email}</div>
      <button onClick={logout}>Wyloguj</button>
      <button><Link to="/display">Przepisy</Link></button>
      <button><Link to="/add">Dodaj przepis</Link></button>
      <button><Link to="/createplan">Stwórz plan</Link></button>
      <button><Link to="/displayplan">Pokaż plany</Link></button>
      <Outlet />
     </>
   ) : (
     <>
      <Toaster />
      <Navigate to="/login" />
     </>
   )

   }
    </>
  )
  
};
