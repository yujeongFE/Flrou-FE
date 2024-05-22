import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "../../layout/Header";
import {
  Container,
  StyledCalendarWrapper,
  StyledCalendar,
  StyledScheduleContainer,
  StyledSchedule,
  StyledScheduleDetail,
  DetailContainer,
} from "./style";
import toggle_on from "../../assets/toggle_on.png";
import toggle_off from "../../assets/toggle_off.png";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  // 일정 예시
  useEffect(() => {
    const initialSchedules = [
      {
        startDate: "2024-05-22",
        startTime: "10:00",
        endTime: "15:00",
        endDate: "2024-05-29",
        title: "숙명여자대학교 체육대회",
        color: "#FC819E",
      },
      {
        startDate: "2024-05-19",
        startTime: "12:00",
        endTime: "13:00",
        endDate: "2024-05-19",
        title: "진영이랑 청계천",
        color: "#8DECB4",
      },
      {
        startDate: "2024-05-16",
        startTime: "09:00",
        endTime: "18:00",
        endDate: "2024-05-23",
        title: "고려대 축제",
        color: "#DCBFFF",
      },
      {
        startDate: "2024-05-17",
        startTime: "20:00",
        endTime: "22:00",
        endDate: "2024-05-17",
        title: "민영이랑 안양에서 번개",
        color: "#FFC6AC",
      },
    ];
    setSchedules(initialSchedules);
  }, [date]);

  useEffect(() => {
    if (filteredSchedules.length === 0) {
      handleDayClick(today); // 일정이 선택되지 않은 경우 오늘 날짜를 기준으로 필터링
    }
  }, [filteredSchedules, today]);

  const handleDayClick = (value) => {
    const filter_schedules = schedules.filter(
      (schedule) =>
        moment(value).isBetween(schedule.startDate, schedule.endDate, "day", "[]") ||
        moment(value).isSame(schedule.startDate, "day") ||
        moment(value).isSame(schedule.endDate, "day"),
    );
    setFilteredSchedules(filter_schedules);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Container>
        <Header />
        <StyledCalendarWrapper>
          <StyledCalendar
            value={date}
            onChange={handleDateChange}
            formatDay={(locale, date) => moment(date).format("D")}
            formatYear={(locale, date) => moment(date).format("YYYY")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            calendarType="gregory"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
            onClickDay={handleDayClick}
            tileContent={({ date }) => {
              const matchingSchedules = schedules.filter(
                (schedule) =>
                  moment(date).isBetween(schedule.startDate, schedule.endDate, "day", "[]") ||
                  moment(date).isSame(schedule.startDate, "day") ||
                  moment(date).isSame(schedule.endDate, "day"),
              );

              return matchingSchedules.map((matchingSchedule, index) => (
                <StyledSchedule color={matchingSchedule.color} key={index}>
                  {`${matchingSchedule.title}`}
                </StyledSchedule>
              ));
            }}
          />
        </StyledCalendarWrapper>
      </Container>
      <DetailContainer>
        <StyledScheduleContainer>
          {filteredSchedules.map((schedule, index) => (
            <StyledScheduleDetail key={index}>
              <span style={{ color: "#A391FF" }}>{`${schedule.startTime} ~ ${schedule.endTime}`}</span>
              <span>{schedule.title}</span>
              <img src={toggle ? toggle_on : toggle_off} alt="토클 활성화" onClick={handleToggle} />
            </StyledScheduleDetail>
          ))}
        </StyledScheduleContainer>
      </DetailContainer>
    </>
  );
};

export default Calendar;
