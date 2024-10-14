type Ingredient = {
  id: string;
  ingredient: string;
  quantity: number;
  unit: string | null;
};

interface Props {
  activeStep: number | null;
  ingredients: Ingredient[];
  stepIngredients: Array<{
    end: number;
    id: string;
    start: number;
  }>;
}

const IngredientsPanel = ({ ingredients, stepIngredients }: Props) => {
  const ids = stepIngredients.map((value) => value.id);

  return (
    <div>
      <div>Ingredients</div>
      {ingredients.map((ingredient, i) => (
        <div
          key={i}
          style={{
            background: ids.includes(ingredient.id) ? "blue" : "transparent",
          }}
        >
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
        </div>
      ))}
    </div>
  );
};

export default IngredientsPanel;
