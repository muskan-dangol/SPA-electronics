import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = ({ count }) => (
  <Grid container wrap="wrap" sx={{ mt: 10, ml: 3, marginRight:3 }}>
    {Array.from(new Array(count)).map((_, index) => (
      <Box key={index} sx={loadingBoxStyles}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          sx={imageStyles}
        />
        <Box sx={detailsContainerStyles}>
          <Skeleton sx={titleStyles} />
          <Skeleton width="60%" sx={textStyles} />
        </Box>
      </Box>
    ))}
  </Grid>
);

const loadingBoxStyles = {
  width: "25%",
  boxSizing: "border-box",
  p: 2,
};

const imageStyles = {
  width: "100%",
  height: 118,
};

const detailsContainerStyles = {
  pt: 0.5,
};

const titleStyles = {
  margin: "5px 0",
};

const textStyles = {
  width: "60%",
  marginTop: 1,
};

export default LoadingSkeleton;
