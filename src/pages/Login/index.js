import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Logo } from "../Splash/style";
import { KakaoLoginButton, FlrouLogin } from "./style";
import FLROU from "../../assets/flrou_logo.png";
import KaKaoLogo from "../../assets/kakao_logo.png";
import useKakaoLogin from "../../api/Login/KakaoLogin";
import { ModalOverlay, ModalContent, ModalTitle, ModalInput, ModalButton, ModalText } from "../../components/Modal/Modal";

const Index = () => {
  const { getKakaoCode, userEmail, userId } = useKakaoLogin();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 모달 표시를 위한 상태
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // accessToken과 유저 정보가 존재할 때만 채팅 페이지로 이동
    if (accessToken && userEmail && userId) {
      navigate("/chatting");
    }
  }, [accessToken, userEmail, userId, navigate]);

  const handleKaKaoLoginClick = async () => {
    await getKakaoCode();
  };

  const handleFlrouLoginClick = () => {
    setShowLoginModal(true); // 자체 로그인 모달 표시
  };

  const handleLogin = () => {
    // 로그인 처리
    setShowLoginModal(false);
  };

  const handleSignup = () => {
    // 회원가입 처리
    setShowSignupModal(false);
  };

  return (
    <Container>
      <Logo src={FLROU} />
      <KakaoLoginButton onClick={handleKaKaoLoginClick}>
        <img src={KaKaoLogo} alt="카카오 로고" />
        카카오로 로그인/회원가입
      </KakaoLoginButton>
      <FlrouLogin onClick={handleFlrouLoginClick}>Flrou 자체 로그인/회원가입</FlrouLogin>

      {showLoginModal && (
        <ModalOverlay>
          <ModalContent>
            <span style={{ color: "#708FFE", cursor: "pointer", fontSize: "25px" }} onClick={() => setShowLoginModal(false)}>
              {"←"}
            </span>
            <ModalTitle>FLROU 로그인</ModalTitle>
            <ModalInput type="id" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
            <ModalInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ModalText onClick={() => setShowSignupModal(true)}>회원가입</ModalText>
            <ModalButton onClick={handleLogin}>로그인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {showSignupModal && (
        <ModalOverlay>
          <ModalContent>
            <span style={{ color: "#708FFE", cursor: "pointer", fontSize: "20px" }} onClick={() => setShowSignupModal(false)}>
              {"←"}
            </span>
            <ModalTitle>FLROU 회원가입</ModalTitle>
            <ModalInput type="nickname" placeholder="닉네임" />
            <ModalInput type="id" placeholder="아이디" />
            <ModalInput type="password" placeholder="비밀번호" />
            <ModalInput type="password" placeholder="비밀번호 확인" />
            <ModalButton onClick={handleSignup}>회원가입</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Index;
