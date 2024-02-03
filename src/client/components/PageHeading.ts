import styled from "styled-components";

const PageHeading = styled.h1`
  position: relative;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 32px 0;

  &::before {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 8px;
    background: #ccff00;
    z-index: -1;
    transition: all 100ms ease-out;
  }

  &:hover::before {
    height: 12px;
    transform: translateY(8px);
  }
`;

export default PageHeading;
