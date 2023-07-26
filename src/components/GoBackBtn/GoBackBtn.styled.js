import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const BackLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  gap: 10px;
  margin-left: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  border: none;
  cursor: pointer;
  transition: 250ms;

  :hover {
    transform: translateX(-10px);
    color: #471ca9;
  }
`;
