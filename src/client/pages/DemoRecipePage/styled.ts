import styled from "styled-components";
import BasePageContent from "~/client/components/PageContent";
import BasePageHeading from "~/client/components/PageHeading";
import BaseIngredientsPanel from "./IngredientsPanel";
import BaseStepsPanel from "./StepsPanel";

export const PageContent = styled(BasePageContent)`
  &:fullscreen {
    display: flex;
    justify-content: center;
    background: white;
  }
`;

export const PageContentInnerGrid = styled.div<{ $isFullscreen?: boolean }>`
  display: grid;
  grid-template-columns: fit-content(256px) 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-column-gap: 48px;
  grid-row-gap: 0;
  grid-template-areas:
    "title title"
    "description description"
    "left-panel steps"
    "left-panel notes";
`;

export const PageHeading = styled(BasePageHeading)`
  grid-area: title;
`;

export const Description = styled.div`
  grid-area: description;
  margin-bottom: 32px;
`;

export const LeftPanel = styled.div`
  grid-area: left-panel;
  display: flex;
  flex-direction: column;
`;

export const IngredientsPanel = styled(BaseIngredientsPanel)``;

export const StepsPanel = styled(BaseStepsPanel)`
  grid-area: steps;
`;

export const Notes = styled.div`
  grid-area: notes;
`;
