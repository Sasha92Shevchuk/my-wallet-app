import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform:  rotateY(0deg);
  }
  25% {
    transform:  rotateY(45deg);
  }
   50% {
    transform:  rotateY(90deg);
  }
  100% {
    transform:  rotateY(0deg);
  }
`;

export const LogoContainer = styled.div`
  animation: ${spinAnimation} 5s linear infinite;
`;

export const LogoSvg = styled.svg`
  width: 40px;
  height: 60px;
`;
