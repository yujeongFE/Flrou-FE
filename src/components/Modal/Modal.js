import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 8px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-family: "Coiny";
  text-align: center;

  text-shadow:
    0 0 3px #9dbafe,
    0 0 3px #9dbafe,
    0 0 3px #9dbafe;
  color: #329cfe;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.28px;
  align-text: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1.5px solid #7ec2dd;
  border-radius: 4px;
  box-sizing: border-box;
  border-color: #7ec2dd;
  font-size: 18px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  margin-top: 30px;
  width: 100%;
  align-item: center;
  border: none;
  border-radius: 10px;
  background-color: #b0c3ff;
  color: #2c2c2c;
  cursor: pointer;
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.14px;

  &:hover {
    background-color: #d2ddff;
  }
`;

export const ModalText = styled.span`
  width: 100%;
  font-size: 20px;
  text-align: right;
  display: block;
  margin-top: 10px;
  padding-bottom: 5px;
  color: 8277eE;
`;
