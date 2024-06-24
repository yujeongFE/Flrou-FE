import React from "react";
import styled, { css } from "styled-components";

const Pattern = styled.div`
  z-index: -1;
  width: 31.26vw;
  height: 31.26vw;
  max-width: 300px;
  max-height: 300px;
  min-width: 200px;
  min-height: 200px;
  position: absolute;
  background-color: ${(props) =>
    props.color === "brown" ? "rgba(193, 195, 248, 0.40)" : props.color === "green" && "rgba(143, 214, 223, 0.40)"};
  filter: blur(10.42vw);
  ${(props) =>
    props.color === "green" &&
    css`
      top: 4.44vh;
    `}
  ${(props) =>
    props.color === "brown" &&
    css`
      width: 25.26vw;
      height: 35.9vh;
      right: 5vw;
      bottom: -5.19vh;
    `}
`;

const Background = () => {
  return (
    <>
      <Pattern color="brown" />
      <Pattern color="green" />
    </>
  );
};

export default Background;
