import React from "react";
import { Container, Logo, WelcomeButton } from "./style";
import FLROU from "../../assets/flrou_logo.png";

const Index = () => {
  const handleButtonClick = () => {
    // 로그인 페이지 구현 시 라우팅 작업 예정
  };

  return (
    <Container>
      <Logo src={FLROU} />
      <WelcomeButton onClick={handleButtonClick}>나만의 일정 비서 FLROU 시작하기 {" >"} </WelcomeButton>
    </Container>
  );
};

export default Index;
