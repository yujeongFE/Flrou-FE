import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 4vw;
  box-sizing: border-box;
  display: flex; flex-direction: column;
  align-items: center;
`;

export const TodoSubject = styled.div`
  width: calc(100% - 3.6vh);
  height: 10vh;
  display: flex; align-items: center; justify-content: center;
  text-shadow: 0px 4px 4px gray;
  font-family: Coiny;
  font-size: 44px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.28px;
  color: #77ADFD;
  -webkit-text-stroke: 3px white;

  div {
    margin: 0 20px 0 20px;
  }
`
export const TodoArraow = styled.span`
  cursor: pointer;
  color: ${(col) => { return col.col; }};
  &:hover {
    transform: scale(107%);
  }
`

export const TodoContainer = styled.div`
  width: 80vh;
  height: calc(100% - 30vh);
  border-radius: 10px;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  overflow-y: auto;
  box-sizing: border-box;
`

export const TodoList = styled.div`
  width: 100%;
  /* height: 6vh; */
  background-color: white;
  /* border: 2px solid #77ADFD; */
  border: ${(col) => { return `2px solid ${col.col}`; }};
  border-radius: 12px;
  margin: 0 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex; justify-content: center; align-items: center;

  &:hover {
    box-shadow: 0 2px 8px ${(col) => { return col.col}};
    cursor: pointer;
  }
`

export const TodoContent = styled.div`
  width: calc(100% - 8vh);
  height: 100%;
  font-size: 20px;
  display: flex; align-items: center;
  padding: 0 20px 0 10px;
  overflow: hidden;

  input {
    width: 100%; height: 100%;
    margin: 0; padding: 0;
    border: none;
    outline: none;
    font-size: 20px;
  }
`

export const TodoButton = styled.div`
  width: 8vh;
  height: 100%;
  display: flex; justify-content: center; align-items: center;

  img {
   width: 40px;
   height: 40px; 

   &:hover {
    transform: scale(107%);
   }
  }
`
export const TodoButton2 = styled.div`
    width: 40px;
    height: 40px;
    display: flex; justify-content: center; align-items: center;
    text-shadow: 0px 4px 4px gray;
    font-size: 34px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    color: ${(col) => { return col.col}};
    -webkit-text-stroke: 2px white;
    font-family: Coiny;

    &:hover {
      transform: scale(107%);
    }
`

export const Line = styled.div`
  width: 100%; height: 5px;
  background-color: lightgray;
  margin: 0 0 20px 0;
  border-radius: 30px;
`