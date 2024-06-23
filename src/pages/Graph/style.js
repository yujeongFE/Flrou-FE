import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 4vw;
  box-sizing: border-box;
`;

export const PeriodText = styled.div`
  color: #63a1fd;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.36px;
  @media screen and (max-width: 768px) {
    width: 100px;
    color: #000;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
  }
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
  color: #63a1fd;
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
  color: #63a1fd;
  @media screen and (max-width: 768px) {
    width: 100px;
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
  }
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    justify-content: flex-start; /* 그래프를 왼쪽으로 붙이기 위해 수정 */
    gap: 60px; /* 모바일 버전에서만 사이 간격 조절 */
  }
`;
