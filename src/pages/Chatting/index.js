import React, { useState } from "react";
import Header from "../../layout/Header";
import PrimaryButton from "../../components/Button/PrimaryButton";
import ChatInput from "../../components/Chat/ChatSection";
import { Container, ChatScreen, ButtonContainer } from "./style";

const Index = () => {
  const [isCalender, setIsCalender] = useState(false);
  const [isTodo, setIsTodo] = useState(false);

  const handleCalender = () => {
    {
      !isTodo && setIsCalender((prevIsActive) => !prevIsActive);
    }
  };
  const handleToDo = () => {
    {
      !isCalender && setIsTodo((prevIsActive) => !prevIsActive);
    }
  };

  return (
    <Container>
      <Header />
      <ChatScreen />
      <ButtonContainer>
        <PrimaryButton onClick={handleCalender} isActive={isCalender}>
          캘린더 입력
        </PrimaryButton>
        <PrimaryButton onClick={handleToDo} isActive={isTodo}>
          TODO 입력
        </PrimaryButton>
      </ButtonContainer>
      <ChatInput />
    </Container>
  );
};

export default Index;
