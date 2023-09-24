import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 70px 0;
`;
export const Title = styled.h1`
  color: #317a23;
  font-size: 42px;
  font-weight: bold;
`;
export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Switcher = styled.span`
  margin: 10px 0;
  text-align: center;
  a {
    text-decoration: none;
    color: #317a23;
    font-weight: 700;
  }
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid #317a23;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    background-color: #317a23;
    color: white;
    letter-spacing: 2px;
    font-weight: 600;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Error = styled.span`
  color: #e33505;
`;
