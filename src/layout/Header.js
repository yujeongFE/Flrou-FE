import React, { useState } from "react";
import styled, { css } from "styled-components";

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
  justify-content: center; /* 텍스트를 가로 중앙 정렬 */
`;

const SideBarButton = styled.img`
  width: 2.3vw;
  height: 3.2vh;
  min-width: 30px;
  min-height: 21px;
  cursor: pointer;

  /* 모바일 화면에서 숨김 */
  @media screen and (max-width: 768px) {
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
  font-size: 48px; /* 모바일 버전에서 글꼴 크기 조절 */
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.28px;
  display: flex; /* 텍스트를 가로 중앙 정렬을 위한 display 속성 추가 */

  /* 화면 폭이 768px 미만인 경우 폰트 크기를 줄임 */
  ${({ theme }) =>
    theme.mobile &&
    css`
      font-size: 36px; /* 모바일 버전에서 더 작은 글꼴 크기 조절 */
    `}
`;

const BellButton = styled.img`
  width: 2vw;
  height: 4vh;
  min-width: 26px;
  min-height: 24px;
  visibility: hidden; /* 기본적으로 보이지 않음 */

  /* 모바일 화면에서는 보이지 않음 */
  @media screen and (max-width: 768px) {
    display: none;
  }
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
      <FlexContainer>
        <LogoText>FLROU</LogoText>
      </FlexContainer>
    </HeaderContainer>
  );
};

export default Header;
