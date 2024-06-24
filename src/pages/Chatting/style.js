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
  padding: 3vh 1.8vw;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바 감추기 */
  }

  -ms-overflow-style: none; /* 인터넷 익스플로러에서 스크롤바 감추기 */
  scrollbar-width: none; /* 파이어폭스에서 스크롤바 감추기 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  gap: 8vw;
`;
