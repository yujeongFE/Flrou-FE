import React, { useState } from "react";
import Header from "../../layout/Header";
import PrimaryButton from "../../components/Button/PrimaryButton";
import ChatInput from "../../components/Chat/ChatSection";
import { Container, ChatScreen, ButtonContainer } from "./style";

const Index = () => {
  const [isCalender, setIsCalender] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
  const [messages, setMessages] = useState([]);

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

  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true };
    setMessages([...messages, newMessage]);
  };

  return (
    <Container>
      <Header />
      <ChatScreen>
      </ChatScreen>
      <ButtonContainer>
        <PrimaryButton onClick={handleCalender} isActive={isCalender}>
          캘린더 입력
        </PrimaryButton>
        <PrimaryButton onClick={handleToDo} isActive={isTodo}>
          TODO 입력
        </PrimaryButton>
      </ButtonContainer>
      <ChatInput onSendMessage={handleSendMessage} />
    </Container>
  );
};

export default Index;
