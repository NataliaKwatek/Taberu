import useAuth from "../../context/AuthContext";

export const HomePage = () => {

const { logout } = useAuth();

  return (
    <>
      <div>Jesteś zalogowany</div>
      <button onClick={logout}>Wyloguj</button>
    </>
  );
};
