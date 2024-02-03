import { Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Content, Nav, Wrapper } from "./styled";

interface Props {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: Props) => (
  <Wrapper>
    <Nav />
    <Content>{children ?? <Outlet />}</Content>
  </Wrapper>
);

export default AppLayout;
