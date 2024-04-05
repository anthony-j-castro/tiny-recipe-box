import { Separator } from "@ariakit/react";
import styled, { css } from "styled-components";

export const StyledSeparator = styled(Separator)(
  ({ theme }) => css`
    height: 0px;
    width: 100%;
    border: 0;
    border-style: solid;
    border-top-width: 1px;
    border-color: ${theme.colors.gray};
    margin: 0;
  `,
);
