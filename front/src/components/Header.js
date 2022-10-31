import React, { useContext } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
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
  .menu {
    align-self: center;
  }
  .logout {
    align-self: center;
    font-size: 0.9rem;
    border-left: 1px solid lightgray;
  }
`;

const NavLinkStyle = styled(NavLink)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 8px;
  margin-right: 15px;
  &:hover {
    color: ${({ theme }) => theme.pointColor};
  }
  &.active {
    color: ${({ theme }) => theme.pointColor};
    font-weight: 600;
    border-bottom: 3px solid ${({ theme }) => theme.pointColor};
  }
`;

const Header = () => {
  const [ThemeMode, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
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
        <Nav.Item className="menu">
          <NavLinkStyle
            className={({ isActive }) => isActive && "active"}
            to="/"
          >
            나의 페이지
          </NavLinkStyle>
          <NavLinkStyle
            className={({ isActive }) => isActive && "active"}
            to="/network"
          >
            네트워크
          </NavLinkStyle>
        </Nav.Item>
        {isLogin && (
          <Nav.Item className="logout">
            <Nav.Link onClick={logout} className="text-muted">
              로그아웃
            </Nav.Link>
          </Nav.Item>
        )}
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
      </Nav>
    </HeaderBox>
  );
};

export default Header;
