import styled from "styled-components";
import MainNavigation from "~/client/components/MainNavigation";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "navigation content";
`;

export const Nav = styled(MainNavigation)`
  grid-area: navigation;
  overflow: auto;
`;

export const Content = styled.main`
  grid-area: content;
  padding: 36px 48px;
  overflow: auto;
`;
