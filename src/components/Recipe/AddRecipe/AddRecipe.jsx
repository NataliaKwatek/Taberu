import useAuth from "../../../context/AuthContext";
import { auth, db } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddRecipe = () => {

    const navigate = useNavigate();

  const [ingredient, setIngredient] = useState([
    { intName: "", intWeight: "" },
  ]);

  const handleClick = () => {
    setIngredient([...ingredient, { intName: "", intWeight: "" }]);
  };
  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    const onchangeVal = [...ingredient];
    onchangeVal[i][name] = value;
    setIngredient(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...ingredient];
    deleteVal.splice(i, 1);
    setIngredient(deleteVal);
  };


  return (
    <>
      <div>Tutaj możesz dodać swój przepis</div>
      <form>
        <label htmlFor="name">Nazwa przepisu</label>
        <input type="text" id="name" />

        <label htmlFor="description">Opis przepisu</label>
        <input type="text" id="description" />

        <label htmlFor="ingredients">Składniki</label>
        <button type="button" onClick={handleClick}>
          Dodaj składnik
        </button>
        {ingredient.map((val, i) => (
          <div key={i}>
            <input
              name="intName"
              value={val.intName}
              onChange={(e) => handleChange(e, i)}
            />
            <input
              name="intWeight"
              value={val.intWeight}
              onChange={(e) => handleChange(e, i)}
            />
            <button type="button" onClick={() => handleDelete(i)}>Usuń składnik</button>
          </div>
        ))}

        <label htmlFor="preparation">Przygotowanie</label>
        <input type="text" id="preparation" />
        <br />
        <br />
        <button>Zapisz przepis</button>
      </form>
    </>
  );
};
