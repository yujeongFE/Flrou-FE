import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  display: flex;
  width: 14.6vw;
  height: 5.3vh;
  max-height: 55px;
  padding: 7px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 19px;
  border: 3px solid #63a1fd;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: #4e4d4d;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${(props) =>
    props.isActive
      ? `
          background-color: #75b1f6;
          color: #fff;
        `
      : `
      background-color: #fff;
      color: #4e4d4d;
    `};
`;

const PrimaryButton = ({ children, onClick, isActive }) => {
  return (
    <StyledButton onClick={onClick} isActive={isActive}>
      {children}
    </StyledButton>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
export default PrimaryButton;
