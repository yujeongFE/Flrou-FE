import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Container = styled.div`
  width: 100vw;
  height: 80%;
  padding: 0 4vw;
  box-sizing: border-box;
`;

export const StyledCalendarWrapper = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin: 10px auto;
  overflow-y: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 10px 5%;
    background-color: white;

    @media (max-width: 768px) {
      padding: 0px 0%;
    }
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: #2c2c2c;
      font-family: "Noto Sans KR";
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }

  .react-calendar__month-view__days__day {
    flex: 0 0 calc(14.2857% - 4px); /* 한 줄에 7개의 날짜가 들어가도록 설정 */
    max-width: calc(14.2857% - 4px); /* 한 줄에 7개의 날짜가 들어가도록 설정 */
  }

  /* 요일 제목 텍스트 스타일 */
  .react-calendar__month-view__weekdays abbr {
    color: #2c2c2c;
    font-family: "Noto Sans KR";
    font-size: 25px;
    font-style: normal;
    font-weight: 200;
    line-height: 20px;
  }

  /* 날짜를 일렬로 정렬 */
  .react-calendar__month-view__days {
    display: grid; /* 그리드 레이아웃으로 변경 */
    grid-template-columns: repeat(7, 1fr); /* 7개의 열을 가지도록 설정 */
    gap: 2px; /* 각 셀 사이의 간격 설정 */
  }

  /* 토요일에만 파란색으로 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: blue;
  }
  /* 일요일에만 빨간색으로 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: red;
  }

  /* 네비게이션 오른쪽 정렬 */
  .react-calendar__navigation {
    justify-content: flex-end;
    position: relative;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    color: #2c2c2c;
    font-family: "Noto Sans KR";
    font-size: 25px;
    font-style: normal;
    font-weight: 100;
    line-height: 20px;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: #2c2c2c;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  .react-calendar__navigation::after {
    content: "";
    position: absolute;
    margin-top: 45px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e8e8e8;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 200;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    color: var(--Main-Font, #2c2c2c);
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    line-height: 20px;
    padding: 0;
  }
  .react-calendar__tile {
    text-align: flex-start;
    align-items: flex-start; /* 텍스트 위로 정렬 */
    min-height: 50px;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 10px 0px 5px;
    position: relative;
    height: 100px;
    font-align: center;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;

    color: var(--Main-Font, #2c2c2c);
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 20px; /* 111.111% */
    padding: 0;
  }

  /* 오늘 날짜 스타일 적용 */
  .react-calendar__tile--now {
    background-color: #fffbd2;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover {
    background-color: #c7f1f2;
  }
  ,
  .react-calendar__tile:enabled:focus,
  /* 활성화된 날짜 텍스트에 대한 스타일 */
  .react-calendar__tile--active abbr {
    color: #2ed4eb; /* 활성화된 날짜의 텍스트 색상 */
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile--active {
    position: relative; /* 상대 위치 지정 */
    border-radius: 4px; /* 모서리를 둥글게 만들기 */
    background-color: #c7f1f2 !important; /* 변경된 선택한 날짜 배경 */
    color: white;
    border: 3px solid #2ed4eb;
  }

  @media (max-width: 768px) {
    .react-calendar__tile {
      height: 90px; /* 날짜 버튼 상자의 높이를 더 크게 설정 */
      font-size: 16px; /* 날짜 폰트 크기를 키움 */
    }
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: #fff;
  font-weight: 600;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: ${(props) => props.theme.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledSchedule = styled.div`
  background-color: ${(props) => props.color};
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
  color: white;
  height: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  /* 일정 상자 내용에 대한 스타일 */
  font-size: 15px;
  text-overflow: ellipsis; /* 내용이 넘칠 경우 생략 부호(...)로 표시 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  margin-top: 2px;

  @media (max-width: 768px) {
    color: #2c2c2c;
    font-size: 11px;
    height: 13px;
  }
`;

export const DetailContainer = styled.div`
  width: 100%;
  background-color: #e9f2ff;
  display: flex;
  justify-content: space-between; /* 텍스트 일렬 정렬 및 일정한 간격 */
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 10px 0;
  }
`;

export const StyledScheduleContainer = styled.div`
  overflow-x: hidden;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  background-color: #e9f2ff;
  flex-direction: column;
  z-index: 1;
  width: 80%;
  justify-content: center;
  margin: auto;
  max-height: auto;
`;

export const StyledScheduleDetail = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 95%;
  height: auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  background-color: #fff;
  border: 1px solid #a391ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #2c2c2c;
  padding: 10px;

  img {
    width: 40px;
    height: auto;
    cursor: pointer;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    height: auto;
    padding: 8px;

    img {
      width: 30px;
    }
  }
`;
