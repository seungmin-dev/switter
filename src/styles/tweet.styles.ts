import styled from "styled-components";
import { TextArea } from "./tweetForm.styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 2fr;
  grid-template-columns: 3fr 100px;
  padding: 20px 0;
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
export const BtnWrapper = styled.div``;
export const EditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: tomato;
  border: none;
  float: right;
  margin-bottom: 5px;
  svg {
    width: 16px;
  }
`;
export const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: tomato;
  border: none;
  float: right;
  margin-bottom: 5px;
  svg {
    width: 16px;
  }
`;
export const CompleteEditButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
  background-color: #317a23;
  border: none;
  color: white;
  border-radius: 8px;
`;
export const EditPhotoBox = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  position: relative;
`;
export const EditPhotoButton = styled.label`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AttachEditFileInput = styled.input`
  display: none;
`;
export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
`;
