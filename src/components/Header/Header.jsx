import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = styled.nav`
  display: flex;
  gap: 16px;
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1), font-weight 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: orange;
    font-weight: 500;
  }

  &.active {
    color: orange;
    font-weight: 500;
  }
`;

export const Header = () => {
  return (
    <div>
      <header>
        <Navigation>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/movies">Movies</HeaderLink>
        </Navigation>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <ToastContainer />
    </div>
  );
};
