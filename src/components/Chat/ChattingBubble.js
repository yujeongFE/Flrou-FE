import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import Character from "../../assets/flrou_character.png";

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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyMessageBubble = styled.div`
  width: ${(props) => `${props.textLength * 20}px`};
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
`;

const OpponentMessageContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  flex-direction: row;
`;

const OpponentMessageBubble = styled(MyMessageBubble)`
  max-width: 70%;
  display: flex;
  align-items: center;
  margin-top: 2.7vh;
`;

const CharacterImage = styled.img`
  width: 6vw;
  height: 10vh;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChattingBubble = ({ messages, scheduleMessage, todoMessage, isCalender, isTodo }) => {
  return (
    <MessageContainer>
      {/* 일정 메시지 */}
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
              <OpponentMessageContainer key={index}>
                <CharacterImage src={Character} alt="character" />
                <OpponentMessageBubble isMine={false}>{message.text}</OpponentMessageBubble>
              </OpponentMessageContainer>
            ),
          )}
          {/* 일정 등록이 완료된 경우 
          <OpponentMessageContainer key={index}>
            <CharacterImage src={Character} alt="character" />
            <OpponentMessageBubble isMine={false}>{"일정 등록이 완료되었어요~ 캘린더에서 확인해보세요!"}</OpponentMessageBubble>
          </OpponentMessageContainer>
            */}
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
                <OpponentMessageBubble isMine={false}>{message.text}</OpponentMessageBubble>
              </OpponentMessageContainer>
            ),
          )}
          {/* 일정 등록이 완료된 경우 
          <OpponentMessageContainer key={index}>
            <CharacterImage src={Character} alt="character" />
            <OpponentMessageBubble isMine={false}>{"일정 등록이 완료되었어요~ todo에서 확인해보세요!"}</OpponentMessageBubble>
          </OpponentMessageContainer>
            */}
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
            <OpponentMessageContainer key={index}>
              <CharacterImage src={Character} alt="character" />
              <OpponentMessageBubble isMine={false}>{message.text}</OpponentMessageBubble>
            </OpponentMessageContainer>
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
