import styled from "styled-components";
import { LoadingIndicator as BaseLoadingIndicator } from "~/client/components/LoadingIndicator";

export const Content = styled.div`
  margin: 16px 0 0;
  font-size: 24px;
`;

export const LoadingIndicator = styled(BaseLoadingIndicator)`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  vertical-align: bottom;
`;
