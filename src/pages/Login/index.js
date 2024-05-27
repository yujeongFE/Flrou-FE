import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Logo } from "../Splash/style";
import { KakaoLoginButton, FlrouLogin } from "./style";
import FLROU from "../../assets/flrou_logo.png";
import KaKaoLogo from "../../assets/kakao_logo.png";
import useKakaoLogin from "../../api/Login/KakaoLogin";
import { ModalOverlay, ModalContent, ModalTitle, ModalInput, ModalButton, ModalText } from "../../components/Modal/Modal";

import { LoginRequest } from "../../components/api/Login/LoginRequest";
import { SignUpRequest } from "../../components/api/Login/SignUpRequest";

const Index = () => {
  const { getKakaoCode, userEmail, userId, userkName } = useKakaoLogin();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 모달 표시를 위한 상태
  const [nickName, setNickName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupAlert, setSignupAlert] = useState("");

  useEffect(() => {
    // accessToken과 유저 정보가 존재할 때만 채팅 페이지로 이동
    if (accessToken && userEmail && userId) {
      navigate("/chatting");
    }
  }, [accessToken, userEmail, userId, navigate]);

  const resetState = () => {
    setNickName("");
    setEmail("");
    setConfirmPassword("");
    setPassword("");
  };

  const handleKaKaoLoginClick = async () => {
    try {
      await getKakaoCode();
      setNickName(userkName);
      setEmail(userEmail);
      setPassword("1234"); // 고정적인 패스워드 지정
      SignUpRequest(nickName, email, password);
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    }
  };

  const handleFlrouLoginClick = () => {
    // 모달 새로 열릴 때마다 입력값 초기화
    resetState();
    setShowLoginModal(true); // 자체 로그인 모달 표시
  };

  const handleFlrouSignupClick = () => {
    resetState();
    setShowSignupModal(true);
  };

  const handleLogin = async () => {
    try {
      const response = await LoginRequest(email, password);
      setShowLoginModal(false);
      // 로그인 성공 시 응답에서 받은 사용자 아이디를 localStorage에 저장
      localStorage.setItem("user_id", response.data.user_id);
      navigate("/chatting");
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    }
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        // 비밀번호와 비밀번호 확인이 다를 경우
        setSignupAlert("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        const response = await SignUpRequest(nickName, email, password);
        if (response.data === "duplicated user_id") {
          // 아이디 중복일 경우
          setSignupAlert("이미 사용 중인 아이디입니다.");
        } else if (response.data === "success") {
          // 회원가입 성공일 경우
          setShowSignupModal(false);
        } else if (response.data === "failed") {
          // 회원가입 실패일 경우
          setSignupAlert("회원가입에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
    }
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
            <ModalText onClick={handleFlrouSignupClick}>회원가입</ModalText>
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
            <ModalInput type="nickname" value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder="닉네임" />
            <ModalInput type="id" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디" />
            <ModalInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ModalInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
            />
            <span style={{ color: "red" }}>{signupAlert}</span>
            <ModalButton onClick={handleSignup}>회원가입</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Index;
