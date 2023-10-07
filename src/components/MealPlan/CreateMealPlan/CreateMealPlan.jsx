

export const CreateMealPlan = () => {

  return (
    <>
    <div>Tutaj stworzysz swój plan posiłków</div>
    
    <label htmlFor="date">Wybierz datę</label>
    <input type="date" id="date" name="date" />


    <label htmlFor="breakfast">Śniadanie</label>
    <select name="breakfast" id="breakfast"> </select>
  
    <label htmlFor="secondBreakfast">Drugie śniadanie</label>
    <select name="secondBreakfast" id="secondBreakfast"> </select>
  
    <label htmlFor="dinner">Obiad</label>
    <select name="dinner" id="dinner"> </select>
   
    <label htmlFor="tea">Podwieczorek</label>
    <select name="tea" id="tea"> </select>
  
    <label htmlFor="supper">Kolacja</label>
    <select name="supper" id="supper"> </select>

    <label htmlFor="snack">Przekąska</label>
    <select name="snack" id="snack"> </select>


    <p>Podsumowanie wartości odżywczych</p>
    <p>Kalorie: </p>
    <p>Węglowodany: </p>
    <p>Tłuszcze: </p>
    <p>Białko: </p>


    <button type="button">Dodaj następny dzień</button>
    
    <button type="submit">Zapisz plan</button>


    </>
  )
}
