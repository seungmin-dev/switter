import * as S from "../styles/tweetForm.styles";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostTweetForm() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        alert("이미지 파일은 1MB까지 업로드할 수 있어요");
        return;
      }
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || loading || tweet === "") return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(database, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "익명",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Form onSubmit={onSubmit}>
      <S.TextArea
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={100}
        placeholder="무슨 일이 일어나고 있나요?"
      />
      <S.AttachFileButton htmlFor="file">
        {file ? "사진 업로드 ✅" : "사진 추가"}
      </S.AttachFileButton>
      <S.AttachFileInput
        onChange={onFileChange}
        id="file"
        type="file"
        accept="image/*"
      />
      <S.SubmitButton type="submit" value={loading ? "저장 중..." : "작성"} />
    </S.Form>
  );
}
