import styled from "styled-components";
import { WelcomeButton } from "../Splash/style";

export const KakaoLoginButton = styled(WelcomeButton)`
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  background: #fee500;
  animation: none;

  color: #2a2a2a;
  text-align: center;
  font-family: Roboto;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.6px;

  &:hover {
    background: #f8f1ae;
    animation: none;
  }

  img {
    margin-right: 30px;
    width: 24px;
    height: 24px;
  }
`;

export const FlrouLogin = styled(WelcomeButton)`
  margin-top: 30px;
  border-radius: 12px;
  background: #7392ff;
  animation: none;

  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:hover {
    background: #9dbafe;
    animation: none;
  }
`;
