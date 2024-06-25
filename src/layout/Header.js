import React, { useState } from "react";
import styled from "styled-components";
import Button from "../assets/sidebar_button.png";
import HeaderMenu from "../components/Link/HeadMenu";
import useIsMobile from "../hooks/useIsMobile";

const HeaderContainer = styled.header`
  width: 100%;
  height: 10.6vh;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SideBarButton = styled.img`
  z-index: 1;
  width: 2.3vw;
  height: 3.2vh;
  min-width: 30px;
  min-height: 21px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
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

  @media (max-width: 768px) {
    font-size: 48px; /* 모바일 버전에서 로고 텍스트 크기 줄이기 */
  }
`;

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <HeaderContainer>
      {!isMobile && <SideBarButton src={Button} alt={"sidebar button"} onClick={toggleSidebar} />}
      <HeaderMenu isOpen={isSidebarOpen} toggleSidebar={setSidebarOpen} />
      <FlexContainer>
        <LogoText>FLROU</LogoText>
      </FlexContainer>
      <div style={{ width: "2vw", height: "4vh" }} />
    </HeaderContainer>
  );
};

export default Header;
