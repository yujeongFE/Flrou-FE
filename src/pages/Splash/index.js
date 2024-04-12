import React from "react";
import { Container, Logo, WelcomeButton } from "./style";
import FLROU from "../../assets/flrou_logo.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // 로그인한 경우에만 조건부 라우팅 작업 예정
    navigate("/chatting");
  };

  return (
    <Container>
      <Logo src={FLROU} />
      <WelcomeButton onClick={handleButtonClick}>나만의 일정 비서 FLROU 시작하기 {" >"} </WelcomeButton>
    </Container>
  );
};

export default Index;
