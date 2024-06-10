import React, { useState, useEffect } from "react";

import Header from "../../layout/Header";
import PrimaryButton from "../../components/Button/PrimaryButton";
import ChatInput from "../../components/Chat/ChatSection";
import ChattingBubble from "../../components/Chat/ChattingBubble";
import { Container, ChatScreen, ButtonContainer } from "./style";

// import { PreviousChatting } from "../../components/api/Message/PreviousChatting";
import { ChatRequest } from "../../components/api/Message/ChatRequest";

import { messaging, onMessage, onBackgroundMessage } from "../../core/notification/firebase.config.mjs";


const Index = () => {
  const [isCalender, setIsCalender] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
  const [chatType, setChatType] = useState(0);
  const [messages, setMessages] = useState([]);
  const [scheduleMessage, setScheduleMessage] = useState([]);
  const [todoMessage, setTodoMessage] = useState([]);
  const [plan, setPlan] = useState({});
  const [isUpdateChatting, setIsUpdateChatting] = useState(false);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      console.log('Service Worker ready with scope:', registration.scope);
    });
  }, [])

  // useEffect(() => {
  //   const data = PreviousChatting();
  //   console.log(data);
  // }, []);

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
      let reply = "";

      if (isCalender) {
        // 캘린더 일정 입력 대화인 경우
        setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, newMessage]);
        reply = await ChatRequest(id, message, 1, true);

        const convertTime = (ampm, hour) => {
          if (ampm === "오전") {
            return hour;
          } else if (ampm === "오후") {
            return hour + 12;
          }
        };

        const plan = {
          user_id: id,
          plan: reply.plan,
          s_year: reply.s_year,
          s_month: reply.s_month,
          s_day: reply.s_day,
          s_hour: convertTime(reply.s_ampm, reply.s_hour),
          s_minute: reply.s_minute,
          f_year: reply.f_year,
          f_month: reply.f_month,
          f_day: reply.f_day,
          f_hour: convertTime(reply.f_ampm, reply.f_hour),
          f_minute: reply.f_minute,
          alarm: 15,
          color: 1,
        };
        setPlan(plan);
        console.log(plan);
        reply.response = `일정이 다음과 같나요? 수정 후 완료 버튼을 눌러주세요~`;
      } else if (isTodo) {
        // Todo 일정 입력 대화인 경우
        setTodoMessage((prevTodoMessage) => [...prevTodoMessage, newMessage]);
        reply = await ChatRequest(id, message, 2, true);
      } else {
        // 일상 대화인 경우
        setChatType(0);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        reply = await ChatRequest(id, message, 0, false);
      }

      const replyMessage = { text: reply.response, isMine: false };
      const calendarTodoMessage = { text: reply, isMine: false };

      if (isCalender) {
        setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, calendarTodoMessage]);
      } else if (isTodo) {
        setTodoMessage((prevTodoMessage) => [...prevTodoMessage, calendarTodoMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
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
          plan={plan}
          isUpdateChatting={isUpdateChatting}
          setIsUpdateChatting={setIsUpdateChatting}
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
      <ChatInput onSendMessage={handleSendMessage} isAccess={isUpdateChatting} />
    </Container>
  );
};

export default Index;
