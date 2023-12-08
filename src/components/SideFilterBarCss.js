import styled from "styled-components";
import { FormControl } from "@mui/material";

export const OuterBox = styled.div`
  float: left;
  width: 25%;
  margin: 1%;
  padding-top: 3%;
  @media (max-width: 600px) {
    width: 100%;
    min-height: 50vh;
  }
  @media (max-width: 500px) {
    width: 100%;
    min-height: 40vh;
  }
`;
export const FormContent = styled(FormControl)`
  width: 100%;
`;

export const Boxes = styled.div`
  position: fixed;
  width: 23%;
  margin: 1%;
  @media (max-width: 600px) {
    width: 90%;
    position: absolute;
    padding: 4%;
  }
`;

export const Filter = styled.h3`
  margin: 0;
`;