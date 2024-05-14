import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Logo } from "../Splash/style";
import { KakaoLoginButton, FlrouLogin } from "./style";
import FLROU from "../../assets/flrou_logo.png";
import KaKaoLogo from "../../assets/kakao_logo.png";
import useKakaoLogin from "../../api/Login/KakaoLogin";

const Index = () => {
  const { getKakaoCode, userEmail, userId } = useKakaoLogin();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    // accessToken과 유저 정보가 존재할 때만 채팅 페이지 접근 
    if (accessToken && userEmail && userId) {
      navigate("/chatting");
    }
  }, [accessToken, navigate]);

  const handleKaKaoLoginClick = async () => {
    await getKakaoCode();
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
