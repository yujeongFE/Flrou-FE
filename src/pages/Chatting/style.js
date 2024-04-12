import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 4vw;
  box-sizing: border-box;
`;

export const ChatScreen = styled.div`
  width: calc(100% - 3.6vh);
  height: 53vh;
  background: #e9f2ff;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  padding: 5.5vh 1.8vw;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  gap: 8vw;
`;
