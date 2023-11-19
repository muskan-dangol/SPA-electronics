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
  height: 4vh;
  background-color: LightGray;
  display: flex;
  margin: 2px;
`;
const Button = styled.button`
  padding: 3px;
  background: transparent;
  border-radius: 3px;
  margin: 5px;
  border-color: lightblue;
  cursor: pointer;
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
