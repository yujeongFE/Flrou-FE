import React, { useState } from "react";
import Header from "../../layout/Header";
import { Container, CenteredContent, DateTimeButton, PeriodText, PriodChangeButton } from "./style";
import PerformanceChart from "../../components/Graph/PerformanceChart";
import TripleSelectButton from "../../components/Button/TripleSelectButton";

const Graph = () => {
  const [isActive, setIsActive] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태 추가

  const handleButtonClick = (option) => {
    setIsActive(option);
  };

  const handlePrev = () => {
    // 만약 월 선택 상태라면
    if (isActive === "month") {
      const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const prevYear = prevMonth.getFullYear();
      const prevMonthIndex = prevMonth.getMonth();

      // 이전 달이 현재 월보다 이전인지 확인하여 이동 제한
      if (prevYear <= currentDate.getFullYear() || (prevYear === currentDate.getFullYear() && prevMonthIndex < currentDate.getMonth())) {
        setCurrentDate(prevMonth);
      }
    }
    // 만약 연도 선택 상태라면
    else if (isActive === "year") {
      const prevYear = currentDate.getFullYear() - 1;
      // 이동하려는 연도가 현재 시점의 연도보다 큰 경우 이동을 제한
      if (prevYear >= new Date().getFullYear()) {
        return;
      }
      setCurrentDate(new Date(prevYear, currentDate.getMonth(), 1));
    }
  };

  const handleNext = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextYear = nextMonth.getFullYear();
    const nextMonthIndex = nextMonth.getMonth();

    // 다음 달이 현재 연도와 현재 월보다 이후인지 확인하여 이동 제한
    if (nextYear > new Date().getFullYear() || (nextYear === new Date().getFullYear() && nextMonthIndex > new Date().getMonth())) {
      setCurrentDate(new Date());
      return;
    }

    setCurrentDate(nextMonth);
  };

  const getCurrentMonth = () => {
    if (isActive === "month") {
      return `${currentDate.toLocaleString("default", { year: "numeric" })} ${currentDate.toLocaleString("default", { month: "long" })}`;
    } else {
      return `${currentDate.toLocaleString("default", { year: "numeric" })}`;
    }
  };

  return (
    <Container>
      <Header />
      <DateTimeButton>
        <TripleSelectButton options={["year", "month"]} onClick={handleButtonClick} activeOption={isActive} />
      </DateTimeButton>
      <PeriodText>
        {(isActive === "month" || isActive === "year") && (
          <>
            <PriodChangeButton style={{ justifyContent: "flex-start" }} onClick={handlePrev}>
              {"< "}
            </PriodChangeButton>
            <span>{getCurrentMonth()}</span>
            <PriodChangeButton style={{ justifyContent: "flex-start" }} onClick={handleNext}>
              {" >"}
            </PriodChangeButton>
          </>
        )}
      </PeriodText>
      <CenteredContent>
        <span>일정 완료율 그래프</span>
      </CenteredContent>
      <PerformanceChart
        style={{ marginTop: "200px" }}
        displayMonths={isActive === "month" ? 12 : 1}
        isActive={isActive}
        currentDate={currentDate}
        currentYear={currentDate.getFullYear()}
      />
    </Container>
  );
};

export default Graph;
