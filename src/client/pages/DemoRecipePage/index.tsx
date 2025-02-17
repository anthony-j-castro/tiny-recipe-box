import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Key } from "ts-key-enum";
import { useAnalytics } from "use-analytics";
import clamp from "~/shared/utils/clamp";
import EquipmentPanel from "./EquipmentSection";
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

  const ingredients = Object.fromEntries(
    recipe.ingredients.map((v) => [v.id, v]),
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
    activeStep === null ? [] : recipe.steps[activeStep].ingredientHighlights;

  return (
    <PageContent ref={containerRef}>
      <PageContentInnerGrid>
        <PageHeading>{recipe.title}</PageHeading>
        <Description>{recipe.description}</Description>
        <LeftPanel>
          <div style={{ position: "sticky", top: 0 }}>
            <IngredientsPanel
              activeStep={activeStep}
              ingredients={recipe.ingredients}
              stepIngredients={stepIngredients}
            />
            <EquipmentPanel equipment={recipe.equipment} />
          </div>
        </LeftPanel>
        <StepsPanel
          activeStep={activeStep}
          ingredients={ingredients}
          onActiveStepChange={setActiveStep}
          steps={recipe.steps}
        />
        <Notes>Hello</Notes>
        <div>
          <button
            onClick={() => {
              throw new Error("uncaught test error");
            }}
          >
            Force Rollbar Error
          </button>
        </div>
      </PageContentInnerGrid>
    </PageContent>
  );
};

export default DemoRecipePage;
