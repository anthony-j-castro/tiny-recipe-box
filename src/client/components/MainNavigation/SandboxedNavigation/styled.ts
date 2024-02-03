import styled from "styled-components";

export const NavLink = styled.a`
  display: block;
  color: #1d1d1f;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background-color: #dcdcde;
  }

  &[data-status="active"] {
    color: #ffffff;
    background-color: #4100b3;
  }
`;

export const VersionInfoLink = styled(NavLink)`
  color: #818188;
  font-size: 12px;
`;
