import {
  HighlightedIngredient,
  Step,
  StepContent,
  StepNumber,
  StepsList,
} from "./styled";

interface Props {
  activeStep: number | null;
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

const StepsPanel = ({ activeStep, onActiveStepChange, steps }: Props) => {
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

        stepStrings.push(
          <HighlightedIngredient key={stepIngredient.id}>
            {step.substring(stepIngredient.start, stepIngredient.end)}
          </HighlightedIngredient>,
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
      <div>Steps</div>
      <StepsList>
        {parsedSteps.map((step, i) => (
          <Step
            $isActive={activeStep === i}
            key={i}
            onClick={() => {
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
