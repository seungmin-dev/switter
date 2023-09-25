import styled from "styled-components";
import { TextArea } from "./tweetForm.styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 2fr;
  grid-template-columns: 3fr 100px;
  padding: 20px 10px;
  border-bottom: 1px solid #dedede;
  gap: 5px;
`;
export const Username = styled.h2`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
`;
export const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;
export const Textarea = styled(TextArea)`
  height: 100%;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 5px;
`;

export const CompleteEditButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
  background-color: #317a23;
  border: none;
  color: white;
  border-radius: 8px;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
`;
