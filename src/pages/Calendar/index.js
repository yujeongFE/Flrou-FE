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
import { GetPlanRequest } from "../../components/api/Plan/GetPlanRequest";
import { UpdatePlanRequest } from "../../components/api/Plan/UpdatePlanRequest";
import { UpdatePlanDone } from "../../components/api/Plan/CompletePlanRequest";
import { DeletePlanRequest } from "../../components/api/Plan/DeletePlanRequest";
import xbutton from "../../assets/x_button.png";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPlanRequest(id, "2024", "5");

        if (!Array.isArray(response)) {
          console.error("데이터가 배열이 아닙니다.");
          return;
        }

        const secondFormatDataArray = response.map((item) => ({
          id: item.id,
          startDate: `${item.s_year}-${item.s_month}-${item.s_day} ${item.s_hour}:${item.s_minute}`,
          endDate: `${item.f_year}-${item.f_month}-${item.f_day} ${item.f_hour}:${item.f_minute}`,
          title: item.plan,
          color: getColorByNumber(item.color),
          isDone: item.isDone, // 완료 여부 추가
        }));

        setSchedules(secondFormatDataArray);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (filteredSchedules.length === 0) {
      handleDayClick(today); // 일정이 선택되지 않은 경우 오늘 날짜를 기준으로 필터링
    }
  }, [filteredSchedules, today]);

  const getColorByNumber = (number) => {
    // 색상 배열
    const colors = [
      "#ff4d6d",
      "#ffb563",
      "#ffe66d",
      "#9ef01a",
      "#72efdd",
      "#4cc9f0",
      "#48bfe3",
      "#3a86ff",
      "#c77dff",
      "#ffc6ff",
      "#ffcfd2",
      "#fde4cf",
      "#fbf8cc",
      "#b9fbc0",
      "#98f5e1",
      "#8eecf5",
      "#90dbf4",
      "#a3c4f3",
      "#cfbaf0",
      "#f1c0e8",
    ];

    // 숫자를 colors 배열의 길이로 나눈 나머지 값을 색상 배열의 인덱스로 사용
    const index = number % colors.length;

    // 해당 인덱스의 색상 반환
    return colors[index];
  };

  const handleDayClick = (value) => {
    const filter_schedules = schedules.filter(
      (schedule) =>
        moment(value).isBetween(schedule.startDate, schedule.endDate, "day", "[]") ||
        moment(value).isSame(schedule.startDate, "day") ||
        moment(value).isSame(schedule.endDate, "day"),
    );

    // 이전 상태와 비교하여 필요한 경우에만 업데이트
    if (JSON.stringify(filter_schedules) !== JSON.stringify(filteredSchedules)) {
      setFilteredSchedules(filter_schedules);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleCompleteToggle = async (scheduleId) => {
    try {
      // 완료 여부 토글
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === scheduleId ? { ...schedule, isDone: !schedule.isDone } : schedule,
      );
      setSchedules(updatedSchedules);

      // 완료 여부 업데이트 API 호출
      await UpdatePlanDone(scheduleId);
    } catch (error) {
      console.error("완료 여부를 업데이트하는 중 오류 발생:", error);
    }
  };

  const handlePopup = (schedule) => {
    setSelectedSchedule(schedule);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    // 팝업이 닫힐 때 토글 이미지를 업데이트
    if (selectedSchedule) {
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === selectedSchedule.id ? { ...schedule, isDone: selectedSchedule.isDone } : schedule,
      );
      setSchedules(updatedSchedules);
    }
  };

  const [toggleStates, setToggleStates] = useState([]);

  useEffect(() => {
    if (schedules.length > 0) {
      // 스케줄이 로드된 후에 토글 상태 배열 초기화
      const initialToggleStates = schedules.map((schedule) => schedule.isDone);
      setToggleStates(initialToggleStates);

      // isDone이 true인 스케줄에 대해서는 토글 상태를 업데이트
      const updatedToggleStates = initialToggleStates.map((isDone) => (isDone ? true : false));
      setToggle(updatedToggleStates);
    }
  }, [schedules]);

  const handleToggle = async (scheduleId) => {
    try {
      const updatedToggleStates = toggleStates.map((state, index) => (index === scheduleId ? !state : state));
      setToggleStates(updatedToggleStates);

      // 스케줄의 완료 여부 업데이트 API 호출
      await UpdatePlanDone(scheduleId);
    } catch (error) {
      console.error("완료 여부를 업데이트하는 중 오류 발생:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const scheduleId = filteredSchedules[index].id;
      await DeletePlanRequest(scheduleId);

      const updatedSchedules = schedules.filter((schedule) => schedule.id !== scheduleId);
      setSchedules(updatedSchedules);

      const updatedFilteredSchedules = filteredSchedules.filter((schedule) => schedule.id !== scheduleId);
      setFilteredSchedules(updatedFilteredSchedules);
    } catch (error) {
      console.error("일정을 삭제하는 중 오류 발생:", error);
    }
  };

  const saveSchedule = async (color, title, startDate, endDate, notificationInterval, s_color) => {
    try {
      const id = selectedSchedule.id;
      const notification = notificationInterval === null ? 15 : notificationInterval;
      await UpdatePlanRequest(
        id,
        title,
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
        endDate.getHours(),
        endDate.getMinutes(),
        notification,
        s_color,
      );

      setSchedules((prevSchedules) =>
        prevSchedules.map((prevSchedule) =>
          prevSchedule.id === selectedSchedule.id ? { ...prevSchedule, title, color, startDate, endDate } : prevSchedule,
        ),
      );
      setShowPopup(false);
    } catch (error) {
      console.error("일정을 업데이트하는 중 오류 발생:", error);
    }
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
                <StyledSchedule
                  color={matchingSchedule.color}
                  key={index}
                  onClick={() => handleCompleteToggle(matchingSchedule.id)} // 스케줄을 클릭하면 완료 여부 토글
                  completed={matchingSchedule.isDone} // 완료 여부에 따라 스타일 변경
                >
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
            <StyledScheduleDetail key={index} style={{ marginBottom: "10px" }}>
              <div style={{ alignItems: "center" }} onClick={() => handlePopup(schedule)}>
                <span style={{ color: "#A391FF" }}>
                  {`${new Date(schedule.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} ~ ${new Date(schedule.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`}
                </span>
                <span style={{ width: "100px", marginLeft: "50px" }}>{schedule.title}</span>
              </div>
              <img src={xbutton} alt="일정 삭제하기" style={{ marginLeft: "50px" }} onClick={() => handleDelete(index)} />
              <img src={toggleStates[index] ? toggle_on : toggle_off} alt="토클 활성화" onClick={() => handleToggle(index)} />
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
          <UpdateModal schedule={selectedSchedule} onClose={closePopup} onSave={saveSchedule} />
        </>
      )}
    </>
  );
};

export default Calendar;
