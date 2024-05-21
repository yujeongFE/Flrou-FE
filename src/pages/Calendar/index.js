import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "../../layout/Header";
import { Container, StyledCalendarWrapper, StyledCalendar, StyledScheduleContainer, StyledSchedule } from "./style";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  // 일정 예시 
  useEffect(() => {
    const initialSchedules = [
      {
        startDate: moment(date).format("YYYY-MM-DD"),
        startTime: "10:00",
        endTime: "15:00",
        endDate: moment(date).add(6, "days").format("YYYY-MM-DD"),
        title: "숙명여자대학교 체육대회",
        color: "#FC819E",
      },
      {
        startDate: moment(date).format("YYYY-MM-DD"),
        startTime: "12:00",
        endTime: "13:00",
        endDate: moment(date).add(0, "days").format("YYYY-MM-DD"),
        title: "진영이랑 청계천",
        color: "#8DECB4",
      },
      {
        startDate: moment(date).format("2024-05-16"),
        startTime: "09:00",
        endTime: "18:00",
        endDate: moment(date).add(1, "days").format("YYYY-MM-DD"),
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
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Container>
      <Header />
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          formatShortWeekday={(locale, date) => moment(date).format("dd")[0]}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
          tileContent={({ date }) => {
            const matchingSchedules = schedules.filter(
              (schedule) =>
                moment(date).isBetween(schedule.startDate, schedule.endDate, "day", "[]") ||
                moment(date).isSame(schedule.startDate, "day") ||
                moment(date).isSame(schedule.endDate, "day"),
            );

            return (
              <StyledScheduleContainer>
                {matchingSchedules
                  .sort((a, b) => moment(a.startTime, "HH:mm").diff(moment(b.startTime, "HH:mm"))) // 시작 시간으로 정렬
                  .map((matchingSchedule, index) => (
                    <StyledSchedule key={index} color={matchingSchedule.color}>
                      {matchingSchedule.title}
                    </StyledSchedule>
                  ))}
              </StyledScheduleContainer>
            );
          }}
        />
      </StyledCalendarWrapper>
    </Container>
  );
};

export default Calendar;
