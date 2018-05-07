import {
  splitEvery,
  head,
  last,
  map as _map,
  add as _add,
  subtract as _subtract,
  multiply as _multiply,
  divide as _divide,
  zipWith,
  ifElse,
  is,
  times,
  sum,
  nth,
  flatten as _flatten,
  transpose as _transpose,
  reverse,
} from 'ramda';
import uuid from 'uuid/v1';

export const random = () => Math.random() * 2 - 1;

export const create = (flatten, shape) => ({
  data: splitEvery(last(shape), flatten),
  shape,
  rows: head(shape),
  cols: last(shape),
  flatten,
  flattenWithKeys: _map(value => ({ id: uuid(), value }), flatten),
});

const math = fn => a => b =>
  ifElse(
    is(Number),
    number => create(_map(fn(number), b.flatten), b.shape),
    matrix => create(zipWith(fn, matrix.flatten, b.flatten), b.shape)
  )(a);

export const add = value => math(_add)(value);

export const subtract = value => math(_subtract)(value);

export const multiply = value => math(_multiply)(value);

export const divide = value => math(_divide)(value);

export const transpose = ({ data, shape }) =>
  create(_flatten(_transpose(data)), reverse(shape));

export const product = a => b => {
  const multiplied = (m1, i) => (m2, j) =>
    zipWith(_multiply, _map(nth(j))(m2), m1[i]);

  const data = times(
    i => times(j => sum(multiplied(a.data, i)(b.data, j)), b.cols),
    a.rows
  );

  return create(_flatten(data), [a.rows, b.cols]);
};

export const map = fn => ({ flatten, shape }) =>
  create(_map(fn, flatten), shape);

// eslint-disable-next-line
export const print = ({ data }) => console.table(data);
