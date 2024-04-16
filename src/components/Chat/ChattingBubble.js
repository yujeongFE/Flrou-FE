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
  line-height: 17px;
  letter-spacing: 0.22px;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const OpponentMessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const OpponentMessageBubble = styled(MyMessageBubble)`
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

const ChattingBubble = ({ messages }) => {
  return (
    <MessageContainer>
      <OpponentMessageContainer>
        <CharacterImage src={Character} alt="character" />
        <OpponentMessageBubble isMine={false}>{"오늘 일정을 말씀해주세요~!"}</OpponentMessageBubble>
      </OpponentMessageContainer>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message.isMine ? (
            <MyMessageBubble isMine={message.isMine} textLength={message.text.length}>
              {message.text}
            </MyMessageBubble>
          ) : (
            <OpponentMessageBubble isMine={message.isMine}>
              <CharacterImage src={Character} alt="character" />
              {message.text}
            </OpponentMessageBubble>
          )}
        </React.Fragment>
      ))}
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
};

export default ChattingBubble;
