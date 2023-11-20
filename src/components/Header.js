import styled from "styled-components";

function Header() {
  return (
    <Container>
      <Button>PHONO</Button>
    </Container>
  );
}
export default Header;

const Container = styled.div`
  height: 10%;
  background-color: #e2effe;
  display: flex;
`;
const Button = styled.button`
  padding: 3px;
  background: transparent;
  border-radius: 3px;
  margin: 5px;
  border-color: lightblue;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
