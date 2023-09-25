import styled from "styled-components";
import { auth, database, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

interface IDeleteButtonProps {
  id: string;
  userId: string;
  photo?: string;
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

export const DeleteButton = ({ id, userId, photo }: IDeleteButtonProps) => {
  const user = auth.currentUser;
  const onClickDelete = async () => {
    const ok = confirm("정말로 이 글을 지울까요?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(database, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClickDelete}>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
        />
      </svg>
    </Button>
  );
};
