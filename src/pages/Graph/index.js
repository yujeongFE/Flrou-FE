import React, { useState, useEffect } from "react";
import Header from "../../layout/Header";
import { Container, CenteredContent, DateTimeButton, PeriodText, PriodChangeButton, Center } from "./style";
import PerformanceChart from "../../components/Graph/PerformanceChart";
import TripleSelectButton from "../../components/Button/TripleSelectButton";
import { CompletionRateRequest } from "../../components/api/Graph/CompletionRateRequest";
import BottomBar from "../../components/Link/BottomMenu";
import useIsMobile from "../../hooks/useIsMobile";

const Graph = () => {
  const user_id = localStorage.getItem("user_id");
  const [isActive, setIsActive] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState(currentDate.getMonth() + 1);
  const [selectYear, setSelectYear] = useState(currentDate.getFullYear());
  const [successCount, setSuccessCount] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reply = await CompletionRateRequest(user_id, selectYear, selectMonth);
        setSuccessCount(reply);
      } catch (error) {
        console.error("데이터 가져오기 에러:", error);
      }
    };

    fetchData();
  }, [selectYear, selectMonth]);

  // 이전 연도로 이동하는 함수
  const handlePrevYear = () => {
    const prevYear = selectYear - 1;
    if (prevYear >= new Date().getFullYear()) {
      return;
    }
    setSelectYear(prevYear);
  };

  // 다음 연도로 이동하는 함수
  const handleNextYear = () => {
    const nextYear = selectYear + 1;
    if (nextYear > new Date().getFullYear()) {
      return;
    }
    setSelectYear(nextYear);
  };

  const handleButtonClick = (option) => {
    setIsActive(option);
  };

  const handlePrev = () => {
    if (isActive === "month") {
      const prevMonth = selectMonth - 1;
      if (prevMonth < 0) {
        return;
      }
      setSelectMonth(prevMonth);
    } else if (isActive === "year") {
      handlePrevYear();
    }
  };

  const handleNext = () => {
    if (isActive === "month") {
      const nextMonth = selectMonth + 1;
      if (nextMonth > 11) {
        return;
      }
      setSelectMonth(nextMonth);
    } else {
      handleNextYear();
    }
  };

  const getCurrentMonth = () => {
    if (isActive === "month") {
      return `${selectYear}년 ${selectMonth}월`; // selectMonth는 0부터 시작하므로 1을 더해줌
    } else {
      return `${selectYear}년`;
    }
  };

  return (
    <Container>
      <Header />
      <Center>
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
        <DateTimeButton>
          <TripleSelectButton options={["year", "month"]} onClick={handleButtonClick} activeOption={isActive} />
        </DateTimeButton>
      </Center>
      <PerformanceChart style={{ marginTop: "200px" }} isActive={isActive} currentYear={selectYear} successCount={successCount} />
      {isMobile && <BottomBar />} {/* 하단 바 추가 */}
    </Container>
  );
};

export default Graph;
