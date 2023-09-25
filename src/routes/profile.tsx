import styled from "styled-components";
import { auth, database, storage } from "../firebase";
import { ChangeEvent, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 100%;
  background-color: #317a23;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  svg {
    width: 80px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
  margin-bottom: 18px;
  svg {
    cursor: pointer;
    margin-left: 5px;
    width: 15px;
  }
`;
const NameWrapper = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #bbb;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    color: #bbb;
    width: 25px;
    height: 25px;
  }
`;
const NameInput = styled.input`
  width: 170px;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;
const Tweets = styled.div`
  width: 100%;
  height: auto;
  padding: 0 20px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [name, setName] = useState(user?.displayName?.toString());

  const onChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    try {
      if (user && files && files.length === 1) {
        if (files[0].size > 1024 ** 2) {
          alert("프로필 사진은 1MB까지 업로드할 수 있어요");
          return;
        }
        const locationRef = ref(storage, `avatar/${user?.uid}`);
        const result = await uploadBytes(locationRef, files[0]);
        const avatarUrl = await getDownloadURL(result.ref);
        setAvatar(avatarUrl);
        await updateProfile(user, {
          photoURL: avatarUrl,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onClickName = () => {
    setEdit(true);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onClickSaveName = async () => {
    try {
      if (!user || name === user.displayName) return;
      await updateProfile(user, { displayName: name });
    } catch (e) {
      console.log(e);
    } finally {
      setEdit(false);
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(database, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        id: doc.id,
        tweet,
        createdAt,
        userId,
        username,
        photo,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        id="avatar"
        onChange={onChangeAvatar}
        type="file"
        accept="image/*"
      />
      {edit ? (
        <NameWrapper>
          <NameInput type="text" value={name} onChange={onChangeName} />
          <svg
            onClick={onClickSaveName}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
            />
          </svg>
        </NameWrapper>
      ) : (
        <Name>
          {user?.displayName ?? "익명"}
          <svg
            onClick={onClickName}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </Name>
      )}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
