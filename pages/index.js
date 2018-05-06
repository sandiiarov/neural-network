import React from 'react';
import { times } from 'ramda';
import styled from 'styled-components';
import {
  create,
  add,
  subtract,
  multiply,
  divide,
  product,
  transpose,
  map,
  print,
} from '../lib/matrix';
import Matrix from '../components/Matrix';

const random = times(() => Math.floor(Math.random() * 10));

const m1 = create(random(6), [2, 3]);
const m2 = create(random(6), [3, 2]);

const m3 = map(v => v + 1)(m1);

print(m3);

const result = product(m1)(m2);

const IndexPageWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const IndexPage = () => (
  <IndexPageWrapper>
    <Matrix matrix={m1.flattenWithKeys} cols={m1.cols} />
    +
    <Matrix matrix={m2.flattenWithKeys} cols={m2.cols} />
    =
    <Matrix matrix={result.flattenWithKeys} cols={result.cols} />
  </IndexPageWrapper>
);

export default IndexPage;
