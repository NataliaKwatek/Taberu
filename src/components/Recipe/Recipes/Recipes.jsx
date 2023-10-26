import { Link } from "react-router-dom";


export const Recipes = () => {
  return (
    <>
    <div>Strona główna do przepisów</div>

    <div>Kategorie</div>
    <div>Wszystkie przepisy
    <Link to ="/displayall">
      <button>Wyświetl Wszystkie przepisy</button>
      </Link>
    </div>
    <div>
      Moje przepisy
     <Link to ="/display">
      <button>Wyświetl moje przepisy</button>
      </Link>
    </div>
    <div>Wyszukaj</div>
</>
  )
}
