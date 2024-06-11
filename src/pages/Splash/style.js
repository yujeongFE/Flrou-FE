import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;

export const fadeInButton = keyframes`
  from {
    opacity: 0.1;
    transform: translateY(1.3vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceButton = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(199, 241, 242, 0.8) 23.5%, rgba(183, 215, 252, 0.8) 100%);
`;

export const Logo = styled.img`
  width: 30vw;
  height: 50vh;
  animation: ${fadeIn} 1.5s ease-in-out;
  width: 199px;
  height: 209px;
  flex-shrink: 0;
`;

export const WelcomeButton = styled.div`
  display: flex;
  width: 46vw;
  height: 5.8vh;
  padding: 6px 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 9vh;
  border-radius: 40px;
  background: #3d67ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  animation: ${fadeInButton} 1.5s ease-in-out forwards;

  cursor: pointer;
  &:hover {
    background: #7392ff;
    animation: ${bounceButton} 1.5s ease-in-out forwards;
  }

  @media screen and (max-width: 768px) {
    width: 60vw;
    color: #fff;
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 30vh;
  }
`;
