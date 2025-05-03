import type { ComponentProps } from "react";
import { Checkbox as BaseCheckbox } from "./styled";

const AgreementRequired = (props: ComponentProps<typeof BaseCheckbox>) => (
  <BaseCheckbox {...props}>
    {({ isSelected }) => (
      <div className="checkbox">
        <svg
          aria-hidden="true"
          viewBox="0 0 18 18"
        >
          {isSelected ? <polyline points="1 9 7 14 15 4" /> : null}
        </svg>
      </div>
    )}
  </BaseCheckbox>
);

export default AgreementRequired;
