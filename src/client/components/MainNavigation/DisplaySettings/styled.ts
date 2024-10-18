import styled, { css } from "styled-components";

export const Container = styled.div``;

export const SwitchWrapper = styled.div<{ $isPrimary?: boolean }>(
  ({ $isPrimary }) => css`
    font-weight: 500;
    padding: 8px 8px 8px 16px;
    ${$isPrimary &&
    css`
      margin-bottom: 16px;
    `}
  `,
);
