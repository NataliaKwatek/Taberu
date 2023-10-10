

function calculateNutritionSummary(mealPlan, recipes, setNutritionSummary) {
    const newNutritionSummary = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    };

    if (mealPlan.breakfast) {
      const breakfast = recipes.find(
        (recipe) => recipe.id === mealPlan.breakfast
      );

      if (breakfast) {
        newNutritionSummary.calories += Number(breakfast.calories);
        newNutritionSummary.protein += Number(breakfast.protein);
        newNutritionSummary.fat += Number(breakfast.fat);
        newNutritionSummary.carbohydrates += Number(breakfast.carbohydrates);
      }
    }

    if (mealPlan.secondBreakfast) {
      const secondBreakfast = recipes.find(
        (recipe) => recipe.id === mealPlan.secondBreakfast
      );
      if (secondBreakfast) {
        newNutritionSummary.calories += Number(secondBreakfast.calories);
        newNutritionSummary.protein += Number(secondBreakfast.protein);
        newNutritionSummary.fat += Number(secondBreakfast.fat);
        newNutritionSummary.carbohydrates += Number(
          secondBreakfast.carbohydrates
        );
      }
    }

    if (mealPlan.dinner) {
      const dinner = recipes.find((recipe) => recipe.id === mealPlan.dinner);
      if (dinner) {
        newNutritionSummary.calories += Number(dinner.calories);
        newNutritionSummary.protein += Number(dinner.protein);
        newNutritionSummary.fat += Number(dinner.fat);
        newNutritionSummary.carbohydrates += Number(dinner.carbohydrates);
      }
    }

    if (mealPlan.tea) {
      const tea = recipes.find((recipe) => recipe.id === mealPlan.tea);
      if (tea) {
        newNutritionSummary.calories += Number(tea.calories);
        newNutritionSummary.protein += Number(tea.protein);
        newNutritionSummary.fat += Number(tea.fat);
        newNutritionSummary.carbohydrates += Number(tea.carbohydrates);
      }
    }

    if (mealPlan.supper) {
      const supper = recipes.find((recipe) => recipe.id === mealPlan.supper);
      if (supper) {
        newNutritionSummary.calories += Number(supper.calories);
        newNutritionSummary.protein += Number(supper.protein);
        newNutritionSummary.fat += Number(supper.fat);
        newNutritionSummary.carbohydrates += Number(supper.carbohydrates);
      }
    }

    if (mealPlan.snack) {
      const snack = recipes.find((recipe) => recipe.id === mealPlan.snack);
      if (snack) {
        newNutritionSummary.calories += Number(snack.calories);
        newNutritionSummary.protein += Number(snack.protein);
        newNutritionSummary.fat += Number(snack.fat);
        newNutritionSummary.carbohydrates += Number(snack.carbohydrates);
      }
    }

    setNutritionSummary(newNutritionSummary);
}

export default calculateNutritionSummary;