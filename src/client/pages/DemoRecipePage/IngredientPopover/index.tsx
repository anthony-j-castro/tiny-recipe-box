import { OverlayArrow, type PopoverProps } from "react-aria-components";
import { StyledPopover } from "./styled";

interface Props extends Omit<PopoverProps, "children"> {
  children: React.ReactNode;
}

const IngredientPopover = ({ children, ...props }: Props) => (
  <StyledPopover {...props}>
    <OverlayArrow>
      <svg
        height={12}
        viewBox="0 0 12 12"
        width={12}
      >
        <path d="M0 0 L6 6 L12 0" />
      </svg>
    </OverlayArrow>
    {children}
  </StyledPopover>
);

export default IngredientPopover;
