import { Checkbox as BaseCheckbox } from "@ariakit/react";
import styled from "styled-components";

export const Paragraph = styled.p`
  margin: 16px 0 0;
`;

export const Agreement = styled.label`
  display: flex;
  margin-top: 48px;
`;

export const Checkbox = styled(BaseCheckbox)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
