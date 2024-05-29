import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  background-color: #e3ecf1;
`;

const SidebarWrapper = styled.div`
  background-color: #fff;
  border-right: 1px solid #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${({ isOpen, width }) => (isOpen ? "0px" : `-${width}px`)};
  transition: right 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;
  width: ${({ width }) => `${width}px`};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const Button = styled.div`
  position: relative;
  left: 150px;
  width: 40px;
  height: 40px;
  z-index: 99;
  transition: 0.8s ease;
  overflow: hidden;
  color: #708ffe;
`;

const Content = styled.div`
  padding: 40px 40px 0 20px;
  position: relative;
  width: 100%;
`;

const NavLinkList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: #202020;
  padding: 10px 0;
  transition: color 0.3s;
  &:hover {
    color: #708ffe;
  }
`;

const Sidebar = ({ width = 200 }) => {
  const [isOpen, setOpen] = useState(false);
  const side = useRef();

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const handleClose = (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [isOpen]);

  return (
    <Container>
      <SidebarWrapper ref={side} isOpen={isOpen} width={width}>
        <Content>
          <Button onClick={toggleMenu}>{"X"}</Button>
          <NavLinkList>
            <CustomNavLink to="/chatting">채팅</CustomNavLink>
            <CustomNavLink to="/calendar">캘린더</CustomNavLink>
            <CustomNavLink to="/todo">투두리스트</CustomNavLink>
            <CustomNavLink to="/performanceChart">성공 그래프</CustomNavLink>
          </NavLinkList>
        </Content>
      </SidebarWrapper>
    </Container>
  );
};

export default Sidebar;
