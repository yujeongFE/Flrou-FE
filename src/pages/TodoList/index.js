import React from "react";
import axios from "axios";

import Header from "../../layout/Header";
import { Container, TodoButton, TodoContainer, TodoContent, TodoList, TodoSubject } from "./style";

import btn1 from "../../assets/todo_btn_1.png";
import btn2 from "../../assets/todo_btn_2.png";

const Index = () => {
  // 더미 데이터
  const dummy = [
    {
      id: 1,
      content: '졸리당jkasldfjk;lsadjfk;lsadjf;lkjasfd;klsjad;lfkjas;ldjfasfjasdkl;fjskldafj;asdj;fljas;dflkj;saldkfj;laksjf;lkadj;lfksk;ljsadfl;kjaskl;fj;kl',
      isDone: false
    },
    {
      id: 2,
      content: '방학주세요',
      isDone: true
    }
  ]

  // 버튼 클릭 시 (isDone true<->false)
  const handleTodoBtn = async (list) => {
    if(list.isDone) {
      // false로 변경
      try {
        const res = await axios.post("http://localhost:3000/todo/update")
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }else {
      // true로 변경
    }
  }

  // 리스트 클릭시 (수정/삭제 요청)
  const clickContent = async (list) => {
    // 팝업 띄우기?
    console.log(list.content);
  }

  return (
    <Container>
      <Header />
      <TodoSubject>
        Todo List
      </TodoSubject>
      <TodoContainer>
        {dummy.map((list) => {
          return (
          <TodoList key={list.id}>
            <TodoContent onClick={() => {clickContent(list)}}>
              {list.content}
            </TodoContent>
            {list.isDone ? (
              <TodoButton>
                <img src={btn1} onClick={() => {handleTodoBtn(list)}}></img>
              </TodoButton>
            ) : (
              <TodoButton>
                <img src={btn2} onClick={() => {handleTodoBtn(list)}}></img>
              </TodoButton>
            )}
          </TodoList>
          )
        })}
      </TodoContainer>
    </Container>
  );
};

export default Index;
