import "styled-components";
import type theme from "~/client/theme";

type CustomTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}
