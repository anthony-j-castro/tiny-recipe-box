import styled, { css } from "styled-components";

export const Container = styled.div``;

export const SwitchWrapper = styled.div<{ $isPrimary?: boolean }>(
  ({ $isPrimary }) => css`
    margin-bottom: 4px;

    ${$isPrimary &&
    css`
      margin-bottom: 12px;
    `}
  `,
);
