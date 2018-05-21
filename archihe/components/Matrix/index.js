import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-gap: 10px 20px;
  text-align: center;
  font-size: 12px;
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid;
  border-image: linear-gradient(
    to right,
    white,
    black 20px,
    transparent 10px,
    transparent calc(100% - 20px),
    black 10px,
    white
  );
  border-image-slice: 1;
`;

const Item = styled('div')`
  border: 1px solid;
  border-image: linear-gradient(
    to right,
    #262626,
    black 20px,
    transparent 10px,
    transparent calc(100% - 20px),
    black 10px,
    #262626
  );
  border-image-slice: 1;
  padding: 2px;
`;

const Matrix = ({ tensor }) => (
  <Wrapper cols={tensor.shape[0]}>
    {Array.from(tensor.dataSync()).map(value => (
      <Item key={value}>{value}</Item>
    ))}
  </Wrapper>
);

export default Matrix;
