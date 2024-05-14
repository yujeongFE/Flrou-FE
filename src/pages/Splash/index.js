import React from "react";
import { Container, Logo, WelcomeButton } from "./style";
import FLROULogo from "../../assets/flrou_logo.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/login");
    } else {
      navigate("/chatting");
    }
  };

  return (
    <Container>
      <Logo src={FLROULogo} alt="FLROU 로고" />
      <WelcomeButton onClick={handleButtonClick}>나만의 일정 비서 FLROU 시작하기 {" >"}</WelcomeButton>
    </Container>
  );
};

export default Index;
