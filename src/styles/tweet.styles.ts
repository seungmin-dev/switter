import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TextArea = styled.textarea`
  border: 2px solid #317a23;
  padding: 20px 15px;
  border-radius: 10px;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #317a23;
  }
`;
export const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #317a23;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #317a23;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
export const AttachFileInput = styled.input`
  display: none;
`;
export const SubmitButton = styled.input`
  background-color: #317a23;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
