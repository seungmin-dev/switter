import { ITweet } from "./timeline";
import * as S from "../styles/tweet.styles";

export default function Tweet({ tweet, username, photo }: ITweet) {
  return (
    <S.Wrapper>
      <S.Column>
        <S.Username>{username}</S.Username>
        <S.Payload>{tweet}</S.Payload>
      </S.Column>
      {photo ? (
        <S.Column>
          <S.Photo src={photo} />
        </S.Column>
      ) : null}
    </S.Wrapper>
  );
}
