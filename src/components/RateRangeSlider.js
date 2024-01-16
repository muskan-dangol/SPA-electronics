import { useRecoilState } from "recoil";
import { ratingFilterState } from "../store/atom";
import { GrStar } from "react-icons/gr";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";

const RatingFilter = () => {
  const [ratingRange, setRatingRange] = useRecoilState(ratingFilterState);

  const handleRatingChange = (givenRating) => {
    setRatingRange(givenRating);
  };

  return (
    <BoxContainer>
      <Typography>Ratings</Typography>
      <Container>
        {[...Array(5)].map((item, index) => {
          const givenRating = index + 1;
          return (
            <label key={index}>
              <Radio
                type="radio"
                value={givenRating}
                onClick={() => handleRatingChange(givenRating)}
              />
              <Rating>
                <ResponsiveStar
                  color={
                    givenRating < ratingRange || givenRating === ratingRange
                      ? "000"
                      : "rgb(192,192,192)"
                  }
                />
              </Rating>
            </label>
          );
        })}
      </Container>
    </BoxContainer>
  );
};

export default RatingFilter;

const BoxContainer = styled(Box)`
  width: 100%;
`;
const Container = styled.div`
  padding-top: 2%;
  display: flex;
`;
const Radio = styled.input`
  display: none;
`;
const Rating = styled.div`
  cursor: pointer;
  padding: 10%;
`;
const ResponsiveStar = styled(GrStar)`
  font-size: 200%; // Adjust the size using viewport units
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;
