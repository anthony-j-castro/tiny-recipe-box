import styled from "styled-components";
import { StyledLink } from "~/client/components/MainNavigation/NavLink/styled";

export const Dot = styled.span<{ $status: boolean | null }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background: ${(props) =>
    props.$status === null
      ? "transparent"
      : props.$status
        ? "#ccff00"
        : "#ff3131"};
  border: 1px solid #818188;
  border-radius: 50%;
  margin-left: 8px;

  ${StyledLink}[data-status="active"] > & {
    border: 1px solid #ffffff;
  }
`;
