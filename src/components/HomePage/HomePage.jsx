import useAuth from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

export const HomePage = () => {

const { logout } = useAuth();

const { currentUser } = useAuth();

const [user, setUser] = useState([]);

const getUser = async () => {
  const docRef = doc(db, "Users", currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setUser(docSnap.data());
  } else {
    toast.error("Błąd bazy danych");
  }
}

useEffect(() => {
  getUser();
} ,[])

  return (
    <>
   {user ? (
     <>
      <div>Witaj {user.login}</div>
      <button onClick={logout}>Wyloguj</button>
      <button><Link to="/display">Przepisy</Link></button>
      <button><Link to="/add">Dodaj przepis</Link></button>
      <button><Link to="/createplan">Stwórz plan</Link></button>
      <button><Link to="/displayplan">Pokaż plany</Link></button>
      <Outlet />
     </>
   ) : (
     <>
      <Navigate to="/login" />
     </>
   )

   }
    </>
  )
  
};
