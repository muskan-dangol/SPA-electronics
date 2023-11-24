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
  width: 100%;
  padding: 5px;
  background-color: #e2effe;
  display: flex;
  position: fixed;
  height: 50px;
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
