import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import todo from "../../assets/todo.png";
import graph from "../../assets/graph.png";
import setting from "../../assets/setting.png";
import calendar from "../../assets/calendar.png";
import chatting from "../../assets/chatting.png";

const BottomBarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, #b7e3e3 0%, #c3ddfa 100%);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* 화면의 아래쪽에 고정 */
  bottom: 0;
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 999;
`;

const Button = styled(Link)`
  background-color: transparent;
  border: none;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  text-decoration: none;
  width: 60px;
  height: 50px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
`;

const ChattingButton = styled(Button)`
  height: 50px;
  background: var(--white, #fff);
  border: 1px solid #01bdf5;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.2));
  border-radius: 100%;
  margin-top: -10px;
  color: #00bdf5;
  text-align: center;
  -webkit-text-stroke-width: 2;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <Button to="/todo">
        <Icon src={todo} />
        Todo
      </Button>
      <Button to="/calendar">
        <Icon src={calendar} />
        캘린더
      </Button>
      <ChattingButton to="/chatting">
        <Icon src={chatting} />
        채팅
      </ChattingButton>
      <Button to="/performanceChart">
        <Icon src={graph} />
        그래프
      </Button>
      <Button to="/settings">
        <Icon src={setting} />
        환경설정
      </Button>
    </BottomBarContainer>
  );
};

export default BottomBar;
