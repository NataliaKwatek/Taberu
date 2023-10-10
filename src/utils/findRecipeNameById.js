


function findRecipeNameById (id, recipes) {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (recipe) {
      return recipe.name;
    } else {
      return "Posiłek nie został wybrany";
    }
  }

export default findRecipeNameById;