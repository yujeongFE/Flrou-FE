import React, { useEffect, useState } from "react";
import { Container, Logo, WelcomeButton } from "./style";
import FLROULogo from "../../assets/flrou_logo.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleButtonClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Logo src={FLROULogo} alt="FLROU 로고" />
      <WelcomeButton onClick={handleButtonClick}>
        {isMobile ? "나만의 일정 비서 시작하기 >" : "나만의 일정 비서 FLROU 시작하기 >"}
      </WelcomeButton>
    </Container>
  );
};

export default Index;
