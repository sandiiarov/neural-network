import React from 'react';
import { map } from 'ramda';
import styled from 'styled-components';

const Brackets = styled('div')`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-gap: 10px 20px;
  text-align: center;
  margin: 10px;
  padding: 10px 30px;
  border: 1px solid;
  border-image: linear-gradient(
    to right,
    white 0%,
    black 10%,
    transparent 10%,
    transparent 90%,
    black 70%,
    white 100%
  );
  border-image-slice: 1;
`;

const Matrix = ({ matrix, cols }) => (
  <Brackets cols={cols}>
    {map(({ id, value }) => <div key={id}>{value}</div>)(matrix)}
  </Brackets>
);

export default Matrix;
