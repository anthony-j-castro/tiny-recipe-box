import * as React from "react";
import { StyledSeparator } from "./styled";

interface Props {
  className?: string;
}

const Separator = ({ className }: Props) => (
  <StyledSeparator
    className={className}
    orientation="horizontal"
  />
);

export default Separator;
