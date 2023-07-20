import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 1280px;
  min-height: calc(100vh - 100px);
`;
