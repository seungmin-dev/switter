import { ITweet } from "./timeline";
import * as S from "../styles/tweet.styles";
import { doc, updateDoc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { DeleteButton } from "./delete-btn";
import { EditButton } from "./edit-btn";
import { EditPhoto } from "./edit-photo";

export default function Tweet({ tweet, username, photo, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
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

  return (
    <S.Wrapper>
      <S.Username>{username}</S.Username>
      {user?.uid === userId ? (
        !edit ? (
          <S.BtnWrapper>
            <DeleteButton id={id} userId={userId} photo={photo} />
            <EditButton setEdit={setEdit} userId={userId} />
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
        <EditPhoto
          editPhoto={editPhoto}
          photo={photo}
          setEditPhoto={setEditPhoto}
        />
      ) : (
        <S.Photo src={photo} />
      )}
    </S.Wrapper>
  );
}
