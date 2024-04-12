import React, { useState } from "react";
import styled from "styled-components";
import SendButton from "../../assets/send_button.svg";
import ActiveSideButton from "../../assets/active_send_button.png";
const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: calc(100% - 60px);
  height: 6vh;
  border-radius: 15px;
  border: 4px solid #83b5ff;
  background: #fff;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.15);
  padding-right: 30px;
  padding-left: 30px;
  color: #4e4d4d;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
`;

const SendIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 2vw;
  height: 5vh;
  cursor: pointer;

  &:hover {
    content: url(${ActiveSideButton});
  }
`;

const ChatInput = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <InputContainer>
      <StyledInput type="text" placeholder="메시지를 입력하세요..." />
      <SendIcon
        src={isHovered ? ActiveSideButton : SendButton}
        alt="send button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </InputContainer>
  );
};

export default ChatInput;
