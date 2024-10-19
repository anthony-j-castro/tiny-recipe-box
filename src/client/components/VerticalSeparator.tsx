import { useSeparator } from "react-aria";
import styled, { css } from "styled-components";

const Separator = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.gray};
    width: 2px;
    height: 100%;
  `,
);

interface Props {
  className?: string;
}

const VerticalSeparator = (props: Props) => {
  const { separatorProps } = useSeparator({
    ...props,
    orientation: "vertical",
  });

  return (
    <Separator
      {...props}
      {...separatorProps}
    />
  );
};

export default VerticalSeparator;
