import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    min-width: 200px;
    height: 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    font-size: 16px;
    @media screen and (min-width: 768px) {
      min-width: 350px;
    }
  }
`;

export const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border: 1px solid grey;
  /* background-color: #5cd3a8; */
`;
