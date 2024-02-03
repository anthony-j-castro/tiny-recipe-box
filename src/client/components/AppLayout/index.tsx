import { Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Content, Nav, SandboxedNav, Wrapper } from "./styled";

interface Props {
  children?: React.ReactNode;
  isSandboxedNav?: boolean;
}

const AppLayout = ({ children, isSandboxedNav }: Props) => (
  <Wrapper>
    {isSandboxedNav ? <SandboxedNav /> : <Nav />}
    <Content>{children ?? <Outlet />}</Content>
  </Wrapper>
);

export default AppLayout;
