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
          <span
            key={stepIngredient.id}
            style={{ background: "purple" }}
          >
            {step.substring(stepIngredient.start, stepIngredient.end)}
          </span>,
        );

        if (
          i === stepIngredients.length - 1 &&
          stepIngredient.end < step.length - 1
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
      {parsedSteps.map((step, i) => (
        <div
          key={i}
          onClick={() => {
            onActiveStepChange(i);
          }}
          style={{ background: activeStep === i ? "pink" : "transparent" }}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepsPanel;
