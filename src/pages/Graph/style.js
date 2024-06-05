import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 80%;
  padding: 0 4vw;
  box-sizing: border-box;
`;

export const PeriodText = styled.div`
  color: #2c2c2c;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.36px;
`;

export const PriodChangeButton = styled.button`
  width: 30px;
  height: 10px;
  flex-shrink: 0;
  color: #b7b7b7;
  font-weight: 800;
  background: none;
  border: none;
  cursor: pointer;
`;

export const DateTimeButton = styled.div`
  width: auto;
  padding: 0 1vw;
  display: flex;
  justify-content: flex-end;
`;

export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: 100%;

  color: #2c2c2c;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.36px;
`;
