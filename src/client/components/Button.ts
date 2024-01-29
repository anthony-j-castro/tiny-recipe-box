import { Button as BaseButton } from "@ariakit/react";
import styled from "styled-components";

const Button = styled(BaseButton)`
  color: #ffffff;
  font-weight: 500;
  background: #4100b3;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: #33008c;
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
  }
`;

export default Button;
