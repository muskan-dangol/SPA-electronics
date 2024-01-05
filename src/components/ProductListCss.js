import styled from "styled-components";

export const ContentContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 200px;
  float: left;
  width: 70%;
  padding-top: 6%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 2%;
  }
`;

export const ContentBox = styled.div`
  float: left;
  width: 100%;
  height 25vh;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
  
  &:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  @media (min-width: 600px) {
    width: 48%;
    margin: 1%;
  }
@media (min-width: 1000px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
 
`;

export const ProductTitle = styled.p`
  margin: 5px 0px;
  font-size: 1.2rem;
  height: 4vh;
`;

export const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin: 0px;
  color: red;
`;

export const ProductImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

export const ProductDetails = styled.div`
  width: 100%;
  text-align: center;
  background-color: aliceblue;
  height: 10%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
