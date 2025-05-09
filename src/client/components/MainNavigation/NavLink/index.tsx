import { StyledLink } from "./styled";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
}

const NavLink = ({ children, className, onClick, target, to }: Props) => (
  <StyledLink
    className={className}
    onClick={onClick}
    target={target}
    to={to}
  >
    {children}
  </StyledLink>
);

export default NavLink;
