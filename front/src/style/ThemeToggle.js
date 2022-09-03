import React from "react";
import styled from "styled-components";

const ToggleBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-size: 25px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
