import React from "react";
import styled from "styled-components";
import ChattingBubble from "../../components/Chat/ChattingBubble";
import useIsMobile from "../../api/Login/hooks/useIsMobile";

const Container = styled.div`
  width: calc(100% - 3.6vh);
  height: 53vh;
  background: #e9f2ff;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  padding: 5.5vh 1.8vw;
  overflow-y: auto;
`;

const ChatScreen = ({ messages, scheduleMessage, todoMessage, isCalender, isTodo }) => {
  return (
    <Container>
      <ChattingBubble
        messages={messages}
        scheduleMessage={scheduleMessage}
        todoMessage={todoMessage}
        isCalender={isCalender}
        isTodo={isTodo}
      />
    </Container>
  );
};

export default ChatScreen;
