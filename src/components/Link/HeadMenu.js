import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import todo from "../../assets/todo.png";
import graph from "../../assets/graph.png";
import setting from "../../assets/setting.png";
import calendar from "../../assets/calendar.png";
import chatting from "../../assets/chatting.png";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #fefefe;
  z-index: 999;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const SidebarContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 15px 20px;
  background: linear-gradient(135deg, #65c7f7, #cfdef3);
  margin: 10px 0;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #6190e8, #d0e0ff);
    background: linear-gradient(135deg, #65c7f7, #cfdef3);
    transform: translateY(-2px);
  }

  img {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #65c7f7;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #65c7f7;
    position: absolute;
    bottom: -10px;
    left: 0;
  }
`;

const HeaderMenu = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const user_id = localStorage.getItem("user_id");

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(false);
    }
  };

  const handleNavigation = (path) => {
    toggleSidebar(false);
    navigate(path);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
      <SidebarContent>
        <WelcomeMessage>{user_id}님 환영합니다.</WelcomeMessage>
        <MenuItem onClick={() => handleNavigation("/chatting")}>
          <img src={chatting} alt="채팅" />
          채팅
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/calendar")}>
          <img src={calendar} alt="캘린더" />
          캘린더
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/todo")}>
          <img src={todo} alt="Todo List" />
          Todo List
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/performanceChart")}>
          <img src={graph} alt="그래프" />
          그래프
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/settings")}>
          <img src={setting} alt="환경설정" />
          환경설정
        </MenuItem>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default HeaderMenu;
