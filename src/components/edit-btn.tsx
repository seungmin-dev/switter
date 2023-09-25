import styled from "styled-components";
import { auth } from "../firebase";

interface IEditButtonProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: tomato;
  border: none;
  margin-bottom: 5px;
  svg {
    width: 16px;
  }
`;

export const EditButton = ({ setEdit, userId }: IEditButtonProps) => {
  const user = auth.currentUser;
  const onClickEdit = async () => {
    if (user?.uid !== userId) return;
    setEdit(true);
  };
  return (
    <Button onClick={onClickEdit}>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
      </svg>
    </Button>
  );
};
