import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";
import styled from "styled-components";
import character from "../../assets/flrou_character.png";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 997;
`;

const Modal = styled.div`
  position: fixed;
  width: 90%;
  max-width: 600px; /* Limiting maximum width for better readability */
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: black;
  padding: 20px;
  border-radius: 26px;
  box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.24);
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center; /* 중앙 정렬 추가 */
`;

const Paragraph = styled.p`
  margin: 10px 0; /* Adjusted margin for better spacing */
  font-size: 18px;
  font-weight: bold;
`;

const BlueText = styled.span`
  color: #63a1fd;
  font-weight: bold;
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
`;

const Text = styled.p`
  margin: 10px 0 20px;
  font-size: 14px;
  line-height: 1.5;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px; /* Increased padding for button */
  background-color: #63a1fd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #5079c6;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ToggleButton = styled.button`
  margin: 0 8px; /* Adjusted margin for toggle buttons */
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#63a1fd" : "#ddd")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.active ? "#5079c6" : "#ccc")};
  }
`;

const PerformanceChart = ({ isActive, successCount, currentYear, date, user_id, force }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [notificationTime, setNotificationTime] = useState("00:15"); // 초기 알림 시간 설정 (00:15)
  const currentDateMonth = new Date();
  const currentDate = currentDateMonth.getMonth() + 1;

  useEffect(() => {
    const generateData = () => {
      if (successCount && successCount.length > 0) {
        let newData = [];

        if (isActive === "month") {
          successCount.forEach((count, index) => {
            const total = count[0] + count[1];
            const completionRate = total === 0 ? 0 : Math.round((count[0] / total) * 100);
            const incompleteRate = total === 0 ? 0 : 100 - completionRate;
            newData.push({
              month: `${index + 1}월`,
              완료율: completionRate,
              미완료율: incompleteRate,
            });
          });
        } else {
          let totalSuccess = 0;
          let totalCount = 0;
          successCount.forEach((count) => {
            totalSuccess += count[0];
            totalCount += count[0] + count[1];
          });
          const completionRate = totalCount === 0 ? 0 : Math.round((totalSuccess / totalCount) * 100);
          const incompleteRate = totalCount === 0 ? 0 : 100 - completionRate;
          newData.push({
            month: `${currentDate}월`,
            완료율: completionRate,
            미완료율: incompleteRate,
          });
        }
        setData(newData);
      }
    };
    generateData();
  }, [isActive, successCount, currentYear, currentDate]);

  const handleSubmit = async () => {
    const id = localStorage.getItem("user_id");
    try {
      const response = await axios.post("http://localhost:3000/user/setForce", {
        user_id: id,
        cur_year: currentYear,
        cur_month: currentDate,
        alarm: notificationTime, // 알림 시간 설정
      });
      console.log(response);
      // 팝업 닫기
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggle = (time) => {
    setNotificationTime(time);
  };

  const renderToggleButtons = () => {
    const buttons = [];
    for (let minute = 15; minute < 61; minute += 15) {
      // 15분 간격으로 버튼 생성
      const label = `${minute < 10 ? `0${minute}` : minute}`; // 시간과 분을 포맷팅
      const value = `${minute}`;
      buttons.push(
        <ToggleButton key={label} active={notificationTime === value} onClick={() => handleToggle(value)}>
          {label}분 전
        </ToggleButton>,
      );
    }
    return buttons;
  };

  return (
    <div style={{ position: "relative", backgroundColor: "#fff", textAlign: "left", width: "100%", height: "100%" }}>
      {showModal && <Backdrop />}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip cursor={{ fill: "rgba(207, 239, 255, 0.7)" }} formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="완료율" stackId="a" fill="#75b1f6" barSize={30} onClick={(data, index) => setHoveredIndex(index)} />
          <Bar dataKey="미완료율" stackId="a" fill="#A9A6A6" barSize={30} onClick={(data, index) => setHoveredIndex(index)} />
          <ReferenceLine y={50} stroke="#FFC2C2" strokeWidth={2} label={{ value: "50", position: "right", dy: 5 }} />
        </BarChart>
      </ResponsiveContainer>
      {showModal && (
        <Modal>
          <Paragraph>
            {`${currentDate}월의 일정 완료율이 `}
            <BlueText>{data.length > 0 ? `${data[4].완료율}%` : "데이터 없음"}</BlueText>
            {`입니다.`}
          </Paragraph>
          <StyledImage src={character} alt="character" />
          <Text>
            많은 일정에 <BlueText>알림</BlueText>을 설정하지 않았어요
            <br />
            오늘부터 <BlueText>한 달간</BlueText> 모든 일정에 알림이 설정됩니다.
            <br />
            <BlueText>알림 시간</BlueText>을 선택해주세요~
          </Text>
          <ToggleContainer>{renderToggleButtons()}</ToggleContainer>
          <Button onClick={handleSubmit}>확인</Button>
        </Modal>
      )}
    </div>
  );
};

export default PerformanceChart;
