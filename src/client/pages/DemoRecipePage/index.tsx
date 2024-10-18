import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Key } from "ts-key-enum";
import { useAnalytics } from "use-analytics";
import clamp from "~/shared/utils/clamp";
import recipe from "./recipe.json";
import {
  Description,
  IngredientsPanel,
  LeftPanel,
  Notes,
  PageContent,
  PageContentInnerGrid,
  PageHeading,
  StepsPanel,
} from "./styled";

const DemoRecipePage = () => {
  const analytics = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    analytics.page({ title: "Demo Recipe" });
  }, [analytics]);

  const ingredients = recipe.ingredients.reduce(
    (a, v) => ({ ...a, [v.id]: v }),
    {},
  );

  const [activeStep, setActiveStep] = useState<number | null>(null);

  useHotkeys([Key.ArrowDown, Key.ArrowRight], (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeStep === null) {
      setActiveStep(0);

      return;
    }

    setActiveStep(clamp(activeStep + 1, 0, recipe.steps.length - 1));
  });

  useHotkeys([Key.ArrowUp, Key.ArrowLeft], (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeStep !== null) {
      setActiveStep(clamp(activeStep - 1, 0, recipe.steps.length - 1));
    }
  });

  useHotkeys(["x"], (event) => {
    event.preventDefault();
    event.stopPropagation();

    setActiveStep(null);
  });

  const stepIngredients =
    activeStep !== null ? recipe.steps[activeStep].ingredientHighlights : [];

  return (
    <PageContent ref={containerRef}>
      <PageContentInnerGrid>
        <PageHeading>{recipe.title}</PageHeading>
        <Description>Desc.</Description>
        <LeftPanel>
          <IngredientsPanel
            activeStep={activeStep}
            ingredients={recipe.ingredients}
            stepIngredients={stepIngredients}
          />
        </LeftPanel>
        <StepsPanel
          activeStep={activeStep}
          ingredients={ingredients}
          onActiveStepChange={setActiveStep}
          steps={recipe.steps}
        />
        <Notes>Hello</Notes>
      </PageContentInnerGrid>
    </PageContent>
  );
};

export default DemoRecipePage;
