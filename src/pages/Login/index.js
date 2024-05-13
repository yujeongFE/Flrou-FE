import React from "react";
// style
import { Container, Logo } from "../Splash/style";
import { KakaoLoginButton, FlrouLogin } from "./style";

// img
import FLROU from "../../assets/flrou_logo.png";
import KaKaoLogo from "../../assets/kakao_logo.png";

const Index = () => {
  const handleKaKaoLoginClick = () => {
   // 카카오 api 호출
  };
  const handleFlrouLoginClick = () => {
    // 자체 로그인 api 호출
  };

  return (
    <Container>
      <Logo src={FLROU} />
      <KakaoLoginButton onClick={handleKaKaoLoginClick}>
        <img src={KaKaoLogo} alt="카카오 로고" />
        카카오로 로그인/회원가입{" "}
      </KakaoLoginButton>
      <FlrouLogin onClick={handleFlrouLoginClick}> Flrou 자체 로그인/ 회원가입 </FlrouLogin>
    </Container>
  );
};

export default Index;
