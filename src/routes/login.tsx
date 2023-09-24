import { useForm } from "react-hook-form";
import { useState } from "react";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import * as S from "../styles/auth.styles";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import GithubButton from "../components/github-btn";
import { customErrors } from "../commons/util";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm<ILoginForm>();

  const onValid = async (data: ILoginForm) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError && typeof e.code === "string")
        setError(customErrors(e.code));
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Wrapper>
      <S.Title>Log into 🥥</S.Title>
      <S.Form onSubmit={handleSubmit(onValid)}>
        <S.Input
          type="email"
          {...register("email")}
          placeholder="이메일"
          required
        />
        <S.Input
          type="password"
          {...register("password")}
          placeholder="비밀번호"
          required
        />
        <S.Input type="submit" value={loading ? "loading" : "login"} />
        <S.Error>{error}</S.Error>
        <S.Switcher>
          계정이 없나요? <Link to="/create-account">회원가입</Link>
        </S.Switcher>
      </S.Form>
      <GithubButton />
    </S.Wrapper>
  );
}
