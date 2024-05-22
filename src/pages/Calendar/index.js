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
import UpdateModal from "../../components/Modal/UpdateModal";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // 일정 예시
  useEffect(() => {
    const initialSchedules = [
      {
        startDate: "2024-05-22 10:00",
        endDate: "2024-05-29 15:00",
        title: "숙명여자대학교 체육대회",
        color: "#FC819E",
      },
      {
        startDate: "2024-05-19 12:00",
        endDate: "2024-05-19 13:00",
        title: "진영이랑 청계천",
        color: "#8DECB4",
      },
      {
        startDate: "2024-05-16 09:00",
        endDate: "2024-05-23 18:00",
        title: "고려대 축제",
        color: "#DCBFFF",
      },
      {
        startDate: "2024-05-17 20:00",
        endDate: "2024-05-17 22:00",
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

  const handlePopup = (schedule) => {
    setSelectedSchedule(schedule);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedSchedule(null);
  };

  const saveScheduleColor = (color) => {
    setSchedules((prevSchedules) => prevSchedules.map((schedule) => (schedule === selectedSchedule ? { ...schedule, color } : schedule)));
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
            <StyledScheduleDetail key={index} onClick={() => handlePopup(schedule)}>
              <span
                style={{ color: "#A391FF" }}
              >{`${new Date(schedule.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} ~ ${new Date(schedule.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`}</span>

              <span>{schedule.title}</span>
              <img src={toggle ? toggle_on : toggle_off} alt="토클 활성화" onClick={handleToggle} />
            </StyledScheduleDetail>
          ))}
        </StyledScheduleContainer>
      </DetailContainer>
      {showPopup && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 998,
            }}
            onClick={closePopup}
          />
          <UpdateModal schedule={selectedSchedule} onClose={closePopup} onSave={saveScheduleColor} />
        </>
      )}
    </>
  );
};

export default Calendar;
