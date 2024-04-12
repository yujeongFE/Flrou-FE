import React from "react";
import styled from "styled-components";

import Button from "../assets/sidebar_button.png";
import Bell from "../assets/bell.svg";

const HeaderContainer = styled.header`
  width: 100%;
  height: 10.6vh;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Header = () => {
  return (
    <HeaderContainer>
      <SideBarButton src={Button} alt={"sidebar button"} />
      <FlexContainer>
        <LogoText>FLROU</LogoText>
      </FlexContainer>
      <BellButton src={Bell} alt={"bell button"} />
    </HeaderContainer>
  );
};

export default Header;
