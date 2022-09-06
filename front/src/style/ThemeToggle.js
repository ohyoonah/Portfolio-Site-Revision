import React from "react";
import styled from "styled-components";

const ToggleBtn = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.textColor};;
  font-size: 35px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 25px;
  right: 10px;
  &:hover {
    transform: scale(1.3);
  }
`;

const ThemeToggle = ({ toggle, mode }) => {
  return (
    <ToggleBtn onClick={toggle} mode={mode}>
      {mode === "dark" ? "🌞" : "🌙"}
    </ToggleBtn>
  );
};

export default ThemeToggle;
