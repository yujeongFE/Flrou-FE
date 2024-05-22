import React from "react";
import PropTypes from "prop-types";

const UpdateModal = ({ schedule, onClose, onSave }) => {
  if (!schedule) return null;

  const buttonStyle = {
    borderRadius: "10px",
    border: "1px solid #84B3FA",
    background: "#FFF",
    fontWeight: "500",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    padding: "10px 20px",
    cursor: "pointer",
    marginRight: "20px",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    background: "#84B3FA",
    color: "#FFF",
  };

  return (
    <div
      style={{
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
      }}
    >
      <h2 style={{ textAlign: "center" }}>{schedule.title}</h2>
      <p style={{ textAlign: "center" }}>{`시작 일시: ${new Date(schedule.startDate).toLocaleString()}`}</p>
      <p style={{ textAlign: "center" }}>{`종료 일시: ${new Date(schedule.endDate).toLocaleString()}`}</p>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <p>색상 정보:</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: schedule.color,
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
        <p>{schedule.color}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={saveButtonStyle} onClick={onSave}>
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
