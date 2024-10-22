import { useEffect, useRef } from "react";
import { DialogTrigger } from "react-aria-components";
import { useClickAnyWhere } from "usehooks-ts";
import IngredientPopover from "~/client/pages/DemoRecipePage/IngredientPopover";
import SectionHeading from "~/client/pages/DemoRecipePage/SectionHeading";
import {
  HighlightedIngredient,
  Step,
  StepContent,
  StepNotes,
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
    note?: string;
  }>;
}

const StepsPanel = ({
  activeStep,
  ingredients,
  onActiveStepChange,
  steps,
}: Props) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeStep]);

  useClickAnyWhere(() => {
    onActiveStepChange(null);
  });

  const parsedSteps = steps.map(
    ({ content: step, ingredientHighlights: stepIngredients }) => {
      if (stepIngredients.length === 0) {
        return step;
      }

      const stepStrings: React.ReactNode[] = [];

      for (const [i, stepIngredient] of stepIngredients.entries()) {
        if (i === 0 && stepIngredient.start > 0) {
          stepStrings.push(step.slice(0, Math.max(0, stepIngredient.start)));
        } else if (i > 0 && stepIngredient.start > stepIngredients[i - 1].end) {
          stepStrings.push(
            step.slice(stepIngredients[i - 1].end, stepIngredient.start),
          );
        }

        const ing = ingredients[stepIngredient.id];

        stepStrings.push(
          <DialogTrigger key={stepIngredient.id}>
            <HighlightedIngredient>
              {step.slice(stepIngredient.start, stepIngredient.end)}
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
          stepStrings.push(step.slice(Math.max(0, stepIngredient.end)));
        }
      }

      return stepStrings;
    },
  );

  return (
    <div>
      <SectionHeading>Directions</SectionHeading>
      <StepsList>
        {parsedSteps.map((step, i) => (
          <Step
            $isActive={activeStep === i}
            key={i}
            onClick={(event) => {
              event.stopPropagation();
              onActiveStepChange(i);
            }}
            ref={activeStep === i ? ref : null}
          >
            <StepNumber>{i + 1}</StepNumber>
            <StepContent>
              <div>{step}</div>
              {steps[i].note === undefined ? null : (
                <StepNotes>Notes: {steps[i].note}</StepNotes>
              )}
            </StepContent>
          </Step>
        ))}
      </StepsList>
    </div>
  );
};

export default StepsPanel;
