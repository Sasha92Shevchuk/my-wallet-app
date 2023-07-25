import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderBox = styled.header`
  display: flex;

  /* box-shadow: 0px 10px 19px -3px rgba(148, 148, 148, 1); */
  border-bottom: 1px solid red;
  justify-content: space-between;
  padding: 10px;
`;

export const PageLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 25px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
  background-color: rgb(235, 216, 255);
  color: #373737;
  transition: all 250ms ease;
  box-shadow: 0px 3.4369285106658936px 3.4369285106658936px 0px #00000040;
  &.active {
    background-color: #5cd3a8;
  }
  :hover,
  :focus {
    transform: scale(1.03);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

export const BlockWallet = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
export const InfoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 25px;
  transition: all 250ms ease;
  box-shadow: 0px 3.4369285106658936px 3.4369285106658936px 0px #00000040;
  &.active {
    background-color: #5cd3a8;
  }
  :hover,
  :focus {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

export const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 40px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
  background-color: #5cd3a8;
  color: #373737;
  transition: all 250ms ease;
  box-shadow: 0px 3.4369285106658936px 3.4369285106658936px 0px #00000040;
  :hover,
  :focus {
    transform: scale(1.03);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: fit-content;
  height: 25px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
  background-color: rgb(235, 216, 255);
  color: #373737;
  transition: all 250ms ease;
  box-shadow: 0px 3.4369285106658936px 3.4369285106658936px 0px #00000040;
`;
