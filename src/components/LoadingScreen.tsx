import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vh;
  display: flex;
  justify-content: center;
  padding: 200px 0;
`;
const Text = styled.h2`
  letter-spacing: 2px;
  font-size: 24px;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
