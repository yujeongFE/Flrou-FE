import React, { useState, useEffect } from "react";
import Background from "../../layout/Background";
import Header from "../../layout/Header";
import PrimaryButton from "../../components/Button/PrimaryButton";
import ChatInput from "../../components/Chat/ChatSection";
import ChattingBubble from "../../components/Chat/ChattingBubble";
import { Container, ChatScreen, ButtonContainer } from "./style";
import BottomBar from "../../components/Link/BottomMenu";

import { PreviousChatting } from "../../components/api/Message/PreviousChatting";
import { ChatRequest } from "../../components/api/Message/ChatRequest";
import useIsMobile from "../../hooks/useIsMobile";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const id = localStorage.getItem("user_id");
  const isMobile = useIsMobile();

  const fetchPreviousChatting = async () => {
    try {
      const data = await PreviousChatting(id);
      const formattedMessages = data.map((chat) => {
        let text = chat.content;
        // 본인 대화가 아닌 경우
        if (chat.isUser == 1) {
          try {
            const parsedContent = JSON.parse(chat.content);
            text = parsedContent.response || chat.content;
          } catch (e) {
            console.error("JSON 파싱 실패:", e);
          }
        }
        return {
          text: text,
          isMine: chat.isUser !== 1,
        };
      });
      setMessages(formattedMessages);
    } catch (error) {
      console.error("이전 채팅 로드 실패:", error);
    }
  };

  useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      console.log("Service Worker ready with scope:", registration.scope);
    });
  }, []);

  useEffect(() => {
    fetchPreviousChatting();
  }, [id]);

  const handleCalender = async () => {
    if (!isTodo) {
      setIsCalender((prevIsActive) => !prevIsActive);
      setChatType(1);
      setIsButtonDisabled(true); // 캘린더 버튼 클릭시 todo 버튼 동시에 눌리는 동작 방지
      setScheduleMessage([]); // 캘린더 대화 초기화
      setIsUpdateChatting(false); // 채팅 입력 금지 해제
      await fetchPreviousChatting();
    }
  };

  const handleToDo = () => {
    if (!isCalender) {
      setIsTodo((prevIsActive) => !prevIsActive);
      setChatType(1);
      setTodoMessage([]); // todo 대화 초기화
      setIsUpdateChatting(false); // 채팅 입력 금지 해제
      setIsButtonDisabled(true);
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

        const plan = {
          user_id: id,
          plan: reply.plan,
          s_year: reply.s_year,
          s_month: reply.s_month,
          s_day: reply.s_day,
          s_hour: reply.s_hour,
          s_minute: reply.s_minute,
          f_year: reply.f_year,
          f_month: reply.f_month,
          f_day: reply.f_day,
          f_hour: reply.f_hour,
          f_minute: reply.f_minute,
          alarm: reply.alarm,
          color: reply.color,
        };
        setPlan(plan);
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

      let replyText = reply.response || reply.message; // response, message 응답 렌더링
      const replyMessage = { text: replyText, isMine: false };

      if (isCalender) {
        setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, replyMessage]);
      } else if (isTodo) {
        setTodoMessage((prevTodoMessage) => [...prevTodoMessage, replyMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }

      // 일정 등록 완료 시 대화 내역 초기화
      if (replyText.includes("일정 등록이 완료되었습니다")) {
        setIsCalender(false);
        setIsButtonDisabled(false);
        fetchPreviousChatting();
      }
      // todo 등록 완료 시 대화 내역 초기화
      if (replyText.includes("할일 등록이 완료되었습니다")) {
        setIsTodo(false);
        setIsButtonDisabled(false);
        fetchPreviousChatting();
      }
    } catch (error) {
      console.error("채팅 요청 실패:", error);
    }
  };

  return (
    <Container>
      <Header />
      {!isMobile && <Background />}
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
          setMessages={setMessages}
          setScheduleMessage={setScheduleMessage}
          setTodoMessage={setTodoMessage}
          setIsCalender={setIsCalender}
          setIsTodo={setIsTodo}
          setIsButtonDisabled={setIsButtonDisabled}
        />
      </ChatScreen>
      <ButtonContainer>
        <PrimaryButton onClick={handleCalender} isActive={isCalender} disabled={isButtonDisabled}>
          캘린더 입력
        </PrimaryButton>
        <PrimaryButton onClick={handleToDo} isActive={isTodo} disabled={isButtonDisabled}>
          TODO 입력
        </PrimaryButton>
      </ButtonContainer>
      <ChatInput onSendMessage={handleSendMessage} isAccess={isUpdateChatting} />
      {isMobile && <BottomBar />}
    </Container>
  );
};

export default Index;
