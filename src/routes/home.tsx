import { auth } from "../firebase";

export default function Home() {
  const onClickLogout = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
}
