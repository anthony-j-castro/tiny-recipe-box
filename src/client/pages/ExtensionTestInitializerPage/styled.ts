import styled, { css } from "styled-components";
import { LoadingIndicator as BaseLoadingIndicator } from "~/client/components/LoadingIndicator";

export const Paragraph = styled.p`
  margin: 16px 0 0;
`;

export const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 4px solid ${theme.colors.purple};
    border-radius: 4px;
  `,
);

export const LoadingIndicator = styled(BaseLoadingIndicator)`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  vertical-align: bottom;
`;

export const Message = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin: 24px;
`;
