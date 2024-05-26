import React, { useState } from "react";
import styled from "styled-components";

import Button from "../assets/sidebar_button.png";
import Bell from "../assets/bell.svg";

import HeaderMenu from "../components/Link/HeadMenu";

const HeaderContainer = styled.header`
  width: 100%;
  height: 10.6vh;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SideBarButton = styled.img`
  width: 2.3vw;
  height: 3.2vh;
  min-width: 30px;
  min-height: 21px;
  cursor: pointer;
`;

const LogoText = styled.span`
  text-shadow:
    0 0 3px #329cfe,
    0 0 3px #329cfe,
    0 0 3px #329cfe;
  color: #fff;
  font-family: Coiny;
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.28px;
`;

const BellButton = styled.img`
  width: 2vw;
  height: 4vh;
  min-width: 26px;
  min-height: 24px;
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "-50px" : "-250px")};
  height: 100vh;
  width: 0px;
  background-color: #fefdfd;
  z-index: 999;
  transition: transform 0.5s;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
`;

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <HeaderContainer>
      <SidebarContainer isOpen={isSidebarOpen}>
        <HeaderMenu isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      </SidebarContainer>
      <SideBarButton src={Button} alt={"sidebar button"} onClick={toggleSidebar} />
      <FlexContainer>
        <LogoText>FLROU</LogoText>
      </FlexContainer>
      <BellButton src={Bell} alt={"bell button"} />
    </HeaderContainer>
  );
};

export default Header;
