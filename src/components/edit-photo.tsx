import styled from "styled-components";
import { Photo } from "../styles/tweet.styles";
import { useState } from "react";

interface IEditPhotoProps {
  editPhoto: File | null;
  setEditPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  photo: string;
}

const EditPhotoBox = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  position: relative;
`;
const EditPhotoButton = styled.label`
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
const AttachEditFileInput = styled.input`
  display: none;
`;

export const EditPhoto = ({
  editPhoto,
  photo,
  setEditPhoto,
}: IEditPhotoProps) => {
  const [tempUrl, setTempUrl] = useState("");
  const onEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        alert("이미지 파일은 1MB까지 업로드할 수 있어요");
        return;
      }
      setEditPhoto(files[0]);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setTempUrl(event.target?.result);
        }
      };
    }
  };
  return (
    <EditPhotoBox>
      <EditPhotoButton htmlFor="editFile">
        {editPhoto ? (
          "✅"
        ) : (
          <svg
            style={{ width: "30px" }}
            fill="#317a23"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 11.25a.75.75 0 001.5 0v-2.546l.943 1.048a.75.75 0 101.114-1.004l-2.25-2.5a.75.75 0 00-1.114 0l-2.25 2.5a.75.75 0 101.114 1.004l.943-1.048v2.546z"
            />
          </svg>
        )}
      </EditPhotoButton>
      <AttachEditFileInput
        onChange={onEditFileChange}
        id="editFile"
        type="file"
        accept="image/*"
      />
      <Photo src={!editPhoto ? photo : tempUrl} />
    </EditPhotoBox>
  );
};
