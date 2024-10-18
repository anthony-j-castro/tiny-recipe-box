import type { SwitchProps } from "react-aria-components";
import { StyledSwitch } from "./styled";

interface Props extends Omit<SwitchProps, "children"> {
  children: React.ReactNode;
}

const NavigationSwitch = ({ children, ...props }: Props) => (
  <StyledSwitch {...props}>
    {children}
    <div className="indicator" />
  </StyledSwitch>
);

export default NavigationSwitch;
