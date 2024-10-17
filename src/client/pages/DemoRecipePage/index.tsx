import { useEffect, useRef, useState } from "react";
import { useAnalytics } from "use-analytics";
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
