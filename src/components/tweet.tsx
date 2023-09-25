import { ITweet } from "./timeline";
import * as S from "../styles/tweet.styles";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";

export default function Tweet({ tweet, username, photo, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [tempUrl, setTempUrl] = useState("");

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
    } finally {
      //
    }
  };
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };
  const onClickEdit = async () => {
    if (user?.uid !== userId) return;
    setEdit(true);
  };
  const onClickCompleteEdit = async () => {
    try {
      setLoading(true);
      if (user?.uid !== userId && !edit) return;
      const docRef = doc(database, "tweets", id);
      await updateDoc(docRef, {
        tweet: editTweet,
      });
      if (editPhoto) {
        const locationRef = ref(
          storage,
          `tweets/${user?.uid}-${user?.displayName}/${docRef.id}`
        );
        const result = await uploadBytes(locationRef, editPhoto);
        const url = await getDownloadURL(result.ref);
        await updateDoc(docRef, {
          photo: url,
        });
      }
      tweet = editTweet;
      setEdit(false);
      setEditPhoto(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const onEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <S.Wrapper>
      <S.Username>{username}</S.Username>
      {user?.uid === userId ? (
        !edit ? (
          <S.BtnWrapper>
            <S.DeleteButton onClick={onClickDelete}>
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
            </S.DeleteButton>
            <S.EditButton onClick={onClickEdit}>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
            </S.EditButton>
          </S.BtnWrapper>
        ) : (
          <S.CompleteEditButton onClick={onClickCompleteEdit}>
            {loading ? "저장 중..." : "저장"}
          </S.CompleteEditButton>
        )
      ) : (
        <div></div>
      )}
      {!edit ? (
        <S.Payload>{tweet}</S.Payload>
      ) : (
        <S.Textarea onChange={onChangeText} value={editTweet} />
      )}
      {!photo ? null : edit ? (
        <S.EditPhotoBox>
          <S.EditPhotoButton htmlFor="editFile">
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
          </S.EditPhotoButton>
          <S.AttachEditFileInput
            onChange={onEditFileChange}
            id="editFile"
            type="file"
            accept="image/*"
          />
          <S.Photo src={!editPhoto ? photo : tempUrl} />
        </S.EditPhotoBox>
      ) : (
        <S.Photo src={photo} />
      )}
    </S.Wrapper>
  );
}
