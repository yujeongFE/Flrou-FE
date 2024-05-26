import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import detail_arrow from "../../assets/detail_arrow.png";
import detail_close_arrow from "../../assets/detail_close_arrow.png";
import "./DatePicker.css";

const UpdateModal = ({ schedule, onClose, onSave }) => {
  if (!schedule) return null;

  const [title, setTitle] = useState(schedule.title);
  const [selectedColor, setSelectedColor] = useState(schedule.color);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(schedule.startDate));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(schedule.endDate));

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

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    background: "#fff",
    position: "fixed",
    zIndex: 999,
    width: "400px",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    gap: "10px",
  };

  const buttonStyle = {
    borderRadius: "10px",
    border: "1px solid #84B3FA",
    background: "#FFF",
    fontWeight: "500",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    background: "#84B3FA",
    color: "#FFF",
    marginRight: "30px",
  };

  const TitleContainer = {
    ...buttonStyle,
    fontSize: "15px",
    fontWeight: "500",
    marginBottom: "0px",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const ColorContainer = {
    ...buttonStyle,
    marginBottom: "0px",
  };

  const colorButtonStyle = (color) => ({
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: `2px solid ${color === selectedColor ? "#1d2d44" : "#fff"}`,
    background: color,
    cursor: "pointer",
    margin: "8px",
    pointerEvents: color === selectedColor ? "none" : "auto", // 클릭된 색상은 다시 클릭되지 않도록 설정
  });

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? "" : color); // 같은 색상 버튼을 다시 클릭하면 선택 해제
    setDropdownOpen(false);
  };

  const handleSave = () => {
    onSave(title, selectedColor, selectedStartDate, selectedEndDate);
    onClose();
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#708FFE" }}>Update</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ marginRight: "20px", marginBottom: "0", width: "100px" }}>일정명:</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={TitleContainer} placeholder="일정명" />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ marginRight: "20px", marginBottom: "0", width: "100px" }}>시작 일시:</p>
        <DatePicker
          selected={selectedStartDate}
          onChange={(date) => setSelectedStartDate(date)}
          dateFormat="yyyy-MM-dd HH:mm"
          selectsStart
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          showTimeInput
          style={{ marginBottom: "10px", flex: "1" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ marginRight: "20px", marginBottom: "0", width: "100px" }}>종료 일시:</p>
        <DatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
          dateFormat="yyyy-MM-dd HH:mm"
          selectsEnd
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          minDate={selectedStartDate}
          showTimeInput
          style={{ marginBottom: "10px", flex: "1" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ marginRight: "20px", marginBottom: "0", width: "100px" }}>색상명:</p>
        <div style={{ display: "inline-block", position: "relative", textAlign: "left" }}>
          <button style={{ ...ColorContainer, background: selectedColor || "#FFF" }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            색상 선택
            <img src={dropdownOpen ? detail_close_arrow : detail_arrow} style={{ marginLeft: "10px" }} alt="자세히 보기" />
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#FFF",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                padding: "5px",
                zIndex: 999,
                width: "200px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {colors.map((color) => (
                <div key={color} style={colorButtonStyle(color)} onClick={() => handleColorSelect(color)} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={saveButtonStyle} onClick={handleSave}>
          일정 수정
        </button>
        <button style={buttonStyle} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

UpdateModal.propTypes = {
  schedule: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UpdateModal;
