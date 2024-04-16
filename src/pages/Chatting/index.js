import React, { useState } from "react";

import Header from "../../layout/Header";
import PrimaryButton from "../../components/Button/PrimaryButton";
import ChatInput from "../../components/Chat/ChatSection";
import ChattingBubble from "../../components/Chat/ChattingBubble";
import { Container, ChatScreen, ButtonContainer } from "./style";

import { ChatRequest } from "../../components/api/Message/ChatRequest";

const Index = () => {
  const [isCalender, setIsCalender] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
  const [chatType, setChatType] = useState(0);
  const [messages, setMessages] = useState([]);
  const [scheduleMessage, setScheduleMessage] = useState([]);
  const [todoMessage, setTodoMessage] = useState([]);

  const handleCalender = () => {
    {
      !isTodo && setIsCalender((prevIsActive) => !prevIsActive);
      setChatType(1);
    }
  };
  const handleToDo = () => {
    {
      !isCalender && setIsTodo((prevIsActive) => !prevIsActive);
      setChatType(1);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const newMessage = { text: message, isMine: true }; // 본인이 전송한 메세지

      if (isCalender) {
        // 캘린더 일정 입력 대화인 경우
        setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, newMessage]);
      } else if (isTodo) {
        // Todo 일정 입력 대화인 경우
        setTodoMessage((prevTodoMessage) => [...prevTodoMessage, newMessage]);
      } else {
        // 일상 대화인 경우
        setChatType(0);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      const reply = await ChatRequest(1, message, chatType, true); // 유저 이름, 여부는 로그인 구현 시 수정 예정

      const replyDailyMessage = { text: reply.response, isMine: false };
      // 일상 대화를 제외한 캘린더, todo의 응답값은 Api 수정 후 추가할 예정

      if (isCalender) {
        setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, replyDailyMessage]);
      } else if (isTodo) {
        setTodoMessage((prevTodoMessage) => [...prevTodoMessage, replyDailyMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, replyDailyMessage]);
      }
    } catch (error) {
      console.error("채팅 요청 실패:", error);
    }
  };

  return (
    <Container>
      <Header />
      <ChatScreen>
        <ChattingBubble
          messages={messages}
          scheduleMessage={scheduleMessage}
          todoMessage={todoMessage}
          isCalender={isCalender}
          isTodo={isTodo}
        />
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
