import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  width: 100%;
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 9px 20px;
  margin-top: 15px;
  border-radius: 10px;
  border: 2px solid #317a23;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 20px;
  margin-right: 5px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithRedirect(auth, provider);
      // signInWithPopup <- 옵션 두개!
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) console.log(e.message);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
}
