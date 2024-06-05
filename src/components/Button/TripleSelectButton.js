import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 150px;
  height: auto;
  background-color: #f2f5f2;
  gap: 15px;

  color: var(--Sub-Font, #b0b0b0);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  padding: 10px;
  border-radius: 30px;
`;

const StyledButton = styled.button`
  display: flex;
  width: auto;
  height: 21px;
  padding: 6px 12px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 8px;
  background: #329cfe;

  ${(props) =>
    props.isActive
      ? `
          background-color: #75b1f6;
          border: 1px solid #63a1fd;
          color: #fff;
        `
      : `
      background-color: #fff;
      border: 1px solid #b0b0b0;
      color: #b0b0b0;
    `};
`;

const TripleSelectButton = ({ options, onClick, activeOption }) => {
  return (
    <ButtonContainer>
      {options.map((option, index) => (
        <StyledButton key={index} onClick={() => onClick(option)} isActive={activeOption === option}>
          {option}
        </StyledButton>
      ))}
    </ButtonContainer>
  );
};

TripleSelectButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  activeOption: PropTypes.string.isRequired,
};

export default TripleSelectButton;
