import { Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Content, Nav, Wrapper } from "./styled";

const AppLayout = () => (
  <Wrapper>
    <Nav />
    <Content>
      <Outlet />
    </Content>
  </Wrapper>
);

export default AppLayout;
