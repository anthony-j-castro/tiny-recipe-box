import { DialogTrigger } from "react-aria-components";
import { useClickAnyWhere } from "usehooks-ts";
import IngredientPopover from "~/client/pages/DemoRecipePage/IngredientPopover";
import {
  HighlightedIngredient,
  Step,
  StepContent,
  StepNumber,
  StepsList,
} from "./styled";

type Ingredients = Record<
  string,
  {
    id: string;
    ingredient: string;
    quantity: number;
    unit: string | null;
  }
>;

interface Props {
  activeStep: number | null;
  ingredients: Ingredients;
  onActiveStepChange: (step: number | null) => void;
  steps: Array<{
    content: string;
    ingredientHighlights: Array<{
      end: number;
      id: string;
      start: number;
    }>;
  }>;
}

const StepsPanel = ({
  activeStep,
  onActiveStepChange,
  steps,
  ingredients,
}: Props) => {
  useClickAnyWhere(() => {
    onActiveStepChange(null);
  });

  const parsedSteps = steps.map(
    ({ content: step, ingredientHighlights: stepIngredients }) => {
      if (stepIngredients.length === 0) {
        return step;
      }

      const stepStrings: React.ReactNode[] = [];

      stepIngredients.forEach((stepIngredient, i) => {
        if (i === 0 && stepIngredient.start > 0) {
          stepStrings.push(step.substring(0, stepIngredient.start));
        } else if (i > 0 && stepIngredient.start > stepIngredients[i - 1].end) {
          stepStrings.push(
            step.substring(stepIngredients[i - 1].end, stepIngredient.start),
          );
        }

        const ing = ingredients[stepIngredient.id];

        stepStrings.push(
          <DialogTrigger key={stepIngredient.id}>
            <HighlightedIngredient>
              {step.substring(stepIngredient.start, stepIngredient.end)}
            </HighlightedIngredient>
            <IngredientPopover placement="top">
              <div>
                {ing.quantity} {ing.unit} {ing.ingredient}
              </div>
            </IngredientPopover>
          </DialogTrigger>,
        );

        if (
          i === stepIngredients.length - 1 &&
          stepIngredient.end < step.length
        ) {
          stepStrings.push(step.substring(stepIngredient.end));
        }
      });

      return stepStrings;
    },
  );

  return (
    <div>
      <div>Directions</div>
      <StepsList>
        {parsedSteps.map((step, i) => (
          <Step
            $isActive={activeStep === i}
            key={i}
            onClick={(event) => {
              event.stopPropagation();
              onActiveStepChange(i);
            }}
          >
            <StepNumber>{i + 1}</StepNumber>
            <StepContent>{step}</StepContent>
          </Step>
        ))}
      </StepsList>
    </div>
  );
};

export default StepsPanel;
