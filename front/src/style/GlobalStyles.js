import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: "Elice Digital Baeum",sans-serif;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.borderColor};
  }
  .nav {
    background: ${({ theme }) => theme.bgColor};
    position: sticky;
    top: 0;
    z-index: 2;
    align-items: center;
  }
  .card {
    background: ${({ theme }) => theme.card};
  }
  .card-text {
    line-height: 25px;
  }
  .form-control {
    background: ${({ theme }) => theme.input};
    color: ${({ theme }) => theme.textColor};
    &:focus {
      background: ${({ theme }) => theme.input};
      color: ${({ theme }) => theme.textColor};
    }
  }
  section{
    background: ${({ theme }) => theme.bgColor};
  }
`;
