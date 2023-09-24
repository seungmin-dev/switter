import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "../styles/auth.styles";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { customErrors } from "../commons/util";

interface ICreateAccountForm {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register, formState } = useForm<ICreateAccountForm>();

  const onValid = async (data: ICreateAccountForm) => {
    if (loading) return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError && typeof e.code === "string") {
        setError(customErrors(e.code));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Wrapper>
      <S.Title>Join 🥥</S.Title>
      <S.Form onSubmit={handleSubmit(onValid)}>
        <S.Input
          type="text"
          {...register("name")}
          placeholder="이름"
          required
        />
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
        {formState.errors.root?.message}
        <S.Input
          type="submit"
          value={loading ? "Loading..." : "Create Account"}
        />
        <S.Error>{error}</S.Error>
        <S.Switcher>
          계정이 이미 있나요? <Link to="/login">로그인</Link>
        </S.Switcher>
      </S.Form>
    </S.Wrapper>
  );
}
