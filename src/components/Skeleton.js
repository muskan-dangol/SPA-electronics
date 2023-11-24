// Skeleton.js

import React from "react";
import styled, { keyframes, css } from "styled-components";

const shimmerAnimation = keyframes`
  to {
    transform: translateX(100%);
  }
`;

const OuterContainer = styled.div`
  position: relative;
  overflow: hidden;
  float:right;
  background-color: #e5e5e5;
  border-radius: 2px;
  margin: 5px 0px;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  ${(props) => props.outerClassName};
`;

const InnerContainer = styled.div.attrs((props) => ({
  as: "div", // Use a custom component to avoid passing invalid HTML attributes
}))`
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(to right, #e5e5e5, #ffffff, #e5e5e5);
  height: 100%;
  ${(props) => props.innerClassName};
  animation: ${({ $animation }) =>
    $animation &&
    css`
      ${shimmerAnimation} ${$animation}
    `};
`;

function Skeleton({
  times,
  outerClassName,
  innerClassName,
  width,
  height,
  animation,
}) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <OuterContainer
          outerClassName={outerClassName}
          width={width}
          height={height}
          key={i}
        >
          <InnerContainer
            innerClassName={innerClassName}
            $animation={animation}
          />
        </OuterContainer>
      );
    });

  return boxes;
}

export default Skeleton;
