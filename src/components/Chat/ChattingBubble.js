import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import UpdateModal from "../Modal/UpdateModal";
import Character from "../../assets/flrou_character.png";
import { CreatePlanRequest } from "../api/Plan/CreatePlanRequest";

// fadeIn 애니메이션 효과
const fadeIn = keyframes`
  from {
    opacity: 0.1;
    transform: translateY(1.3vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 채팅 메시지 컨테이너 스타일
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 내 말풍선 스타일
const MyMessageBubble = styled.div`
  width: 60%;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isMine ? "rgba(112, 143, 254, 0.48)" : "#ffffff")};
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 2.7vh;
  text-align: center;
  color: #2c2c2c;
  font-family: "Pretendard";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5
  letter-spacing: 0.22px;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

// 상대방 말풍선 컨테이너 스타일
const OpponentMessageContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  flex-direction: row;
`;

// 상대방 말풍선 스타일
const OpponentMessageBubble = styled(MyMessageBubble)`
  max-width: 70%;
  display: flex;
  align-items: center;
  margin-top: 2.7vh;
`;

// 캐릭터 이미지 스타일
const CharacterImage = styled.img`
  width: 6vw;
  height: 10vh;
  border-radius: 50%;
  margin-right: 10px;

  @media screen and (max-width: 768px) {
    width: 60px;
  }
`;

const UpdateModalContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const ChattingBubble = ({ messages, scheduleMessage, todoMessage, isCalender, isTodo, plan, isUpdateChatting, setIsUpdateChatting }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [success, setSuccess] = useState(false);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    if (Object.keys(plan).length !== 0) {
      console.log(plan);
      const startDate = new Date(plan.s_year, plan.s_month - 1, plan.s_day, plan.s_hour, plan.s_minute);
      const endDate = new Date(plan.f_year, plan.f_month - 1, plan.f_day, plan.f_hour, plan.f_minute);

      const updatedPlan = {
        title: plan?.plan,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        color: plan?.color || null,
      };

      setSelectedSchedule(updatedPlan);
      setIsUpdateChatting(true);
    }
  }, [plan]);

  const handleSave = async (selectedColor, title) => {
    const colors = [
      "#ff4d6d",
      "#ffb563",
      "#ffe66d",
      "#9ef01a",
      "#72efdd",
      "#4cc9f0",
      "#48bfe3",
      "#3a86ff",
      "#c77dff",
      "#ffc6ff",
      "#ffcfd2",
      "#fde4cf",
      "#fbf8cc",
      "#b9fbc0",
      "#98f5e1",
      "#8eecf5",
      "#90dbf4",
      "#a3c4f3",
      "#cfbaf0",
      "#f1c0e8",
    ];

    const getColorIndexByHashCode = (hashCode, colors) => {
      // 해시코드가 배열에 포함되어 있는지 확인
      const index = colors.indexOf(hashCode);

      // 포함되어 있다면 인덱스 반환, 아니면 -1 반환
      return index !== -1 ? index : -1;
    };

    const s_color = getColorIndexByHashCode(selectedColor, colors);
    try {
      const response = await CreatePlanRequest(
        id,
        title,
        plan.s_year,
        plan.s_month,
        plan.s_day,
        plan.s_hour,
        plan.s_minute,
        plan.f_year,
        plan.f_month,
        plan.f_day,
        plan.f_hour,
        plan.f_minute,
        plan.alarm,
        s_color,
      );

      if (response.data === "success") {
        console.log("성공");
        alert("일정이 등록되었습니다!");
        // 등록 완료 메시지 추가
        setSuccess(true);
        const replyMessage = {
          text: "캘린더에 일정 등록이 완료되었습니다!",
          isMine: false,
        };
        // setScheduleMessage((prevScheduleMessages) => [...prevScheduleMessages, replyMessage]);
      }
    } catch (error) {
      console.error("일정 등록 실패:", error);
    }
  };

  const toggleUpdateModal = () => {
    setIsUpdateChatting(!isUpdateChatting); // 상태 업데이트
  };

  console.log(selectedSchedule);
  return (
    <MessageContainer>
      {isCalender && (
        <>
          <OpponentMessageContainer>
            <CharacterImage src={Character} alt="character" />
            <OpponentMessageBubble isMine={false}>{"일정을 말씀해주세요~!"}</OpponentMessageBubble>
          </OpponentMessageContainer>
          {scheduleMessage.map((message, index) =>
            message.isMine ? (
              <MyMessageBubble key={index} isMine={true} textLength={message.text.length}>
                {message.text}
              </MyMessageBubble>
            ) : (
              <>
                <OpponentMessageContainer style={{ display: "flex", alignItems: "flex-start" }}>
                  <CharacterImage src={Character} alt="character" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <OpponentMessageBubble isMine={false}>{message.text}</OpponentMessageBubble>
                    <UpdateModalContainer key={index}>
                      <UpdateModal schedule={selectedSchedule} onClose={toggleUpdateModal} onSave={handleSave} isPopup={false} />
                    </UpdateModalContainer>
                    {success && (
                      <OpponentMessageContainer>
                        <CharacterImage src={Character} alt="character" />
                        <OpponentMessageBubble style={{ marginTop: "500px", left: "-70px" }} isMine={false}>
                          {"일정 등록이 완료되었습니다"}
                        </OpponentMessageBubble>
                      </OpponentMessageContainer>
                    )}
                  </div>
                </OpponentMessageContainer>
              </>
            ),
          )}
        </>
      )}
      {/* 할 일 메시지 */}
      {isTodo && (
        <>
          <OpponentMessageContainer>
            <CharacterImage src={Character} alt="character" />
            <OpponentMessageBubble isMine={false}>{"오늘의 할일을 말씀해주세요~!"}</OpponentMessageBubble>
          </OpponentMessageContainer>
          {todoMessage.map((message, index) =>
            message.isMine ? (
              <MyMessageBubble key={index} isMine={true} textLength={message.text.length}>
                {message.text}
              </MyMessageBubble>
            ) : (
              <OpponentMessageContainer key={index}>
                <CharacterImage src={Character} alt="character" />
                <OpponentMessageBubble isMine={false}>{`Todo 작성이 완료되었습니다~`}</OpponentMessageBubble>
              </OpponentMessageContainer>
            ),
          )}
        </>
      )}

      {/* 일반 대화 메시지 */}
      {!isCalender &&
        !isTodo &&
        messages.map((message, index) =>
          message.isMine ? (
            <MyMessageBubble key={index} isMine={true} textLength={message.text.length}>
              {message.text}
            </MyMessageBubble>
          ) : (
            <>
              <OpponentMessageContainer key={index}>
                <CharacterImage src={Character} alt="character" />
                <OpponentMessageBubble isMine={false}>{message.text}</OpponentMessageBubble>
              </OpponentMessageContainer>
              {isUpdateChatting && (
                <OpponentMessageContainer key={index}>
                  <CharacterImage src={Character} alt="character" />
                  <OpponentMessageBubble>
                    <UpdateModal
                      style={{ width: "200px", height: "200px" }}
                      key={`modal-${index}`}
                      schedule={plan}
                      onSave={handleSave}
                      onClose={toggleUpdateModal}
                      isPopup={false}
                    />
                  </OpponentMessageBubble>
                </OpponentMessageContainer>
              )}
            </>
          ),
        )}
    </MessageContainer>
  );
};

ChattingBubble.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  isCalender: PropTypes.bool.isRequired,
  scheduleMessage: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  todoMessage: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  isTodo: PropTypes.bool.isRequired,
};

export default ChattingBubble;
