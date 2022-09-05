import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import ThemeToggle from "../style/ThemeToggle";
import { useTheme } from "../context/themeProvider";
import styled from "styled-components";

const HeaderBox = styled.header`
  background: ${({ theme }) => theme.bgColor};
  position: sticky;
  top: 0;
  z-index: 2;
  align-items: center;
  padding: 20px 10px;
  .logo {
    color: ${({ theme }) => theme.textColor};
    font-size: 1.5rem;
    font-weight: 700;
  }
  .nav-link {
    color: ${({ theme }) => theme.textColor};
  }
`

const Header = () => {
  const [ThemeMode, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <HeaderBox>
      <Nav activeKey={location.pathname}>
        <Nav.Item className="me-auto">
          <Nav.Link disabled className="logo">
            PORTFOLIO
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="fw-bold" onClick={() => navigate("/")}>
            나의 페이지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="fw-bold" onClick={() => navigate("/network")}>
            네트워크
          </Nav.Link>
        </Nav.Item>
        {isLogin && (
          <Nav.Item>
            <Nav.Link className="fw-bold" onClick={logout}>
              로그아웃
            </Nav.Link>
          </Nav.Item>
        )}
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
      </Nav>
    </HeaderBox>
  );
}

export default Header;
