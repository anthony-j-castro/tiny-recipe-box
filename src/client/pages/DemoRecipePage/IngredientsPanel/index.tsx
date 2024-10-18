import SectionHeading from "~/client/pages/DemoRecipePage/SectionHeading";
import { Ingredient, IngredientsList } from "./styled";

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
      <SectionHeading>Ingredients</SectionHeading>
      <IngredientsList>
        {ingredients.map((ingredient, i) => (
          <Ingredient
            $isActive={ids.includes(ingredient.id)}
            key={i}
          >
            {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
          </Ingredient>
        ))}
      </IngredientsList>
    </div>
  );
};

export default IngredientsPanel;
