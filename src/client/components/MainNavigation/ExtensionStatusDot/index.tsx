import { Dot } from "./styled";

interface Props {
  status: boolean | null;
}

const ExtensionStatusDot = ({ status }: Props) => <Dot $status={status} />;

export default ExtensionStatusDot;
