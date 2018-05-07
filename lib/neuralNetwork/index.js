import { times, repeat, compose, init, tail, addIndex, map } from 'ramda';
import * as matrix from '../matrix';

const mapIndexed = addIndex(map);

const sigmoid = x => 1 / (1 + Math.exp(-x));

const randomizeWeight = (prev, next) =>
  matrix.create(times(matrix.random, prev * next), [next, prev]);

const randomizeBias = (layer, bias) =>
  matrix.create(repeat(bias, layer), [layer, 1]);

const getWeights = net =>
  compose(mapIndexed((_, i) => randomizeWeight(net[i], net[i + 1])), init)(net);

const getBiases = bias =>
  compose(map(neurons => randomizeBias(neurons, bias)), tail);

export const create = ({ net = [1, 1, 1], bias = matrix.random() }) => ({
  net,
  weights: getWeights(net),
  biases: getBiases(bias)(net),
});

const calculateLayer = ({ weights, biases }, index) =>
  compose(
    matrix.map(sigmoid),
    matrix.add(biases[index]),
    matrix.product(weights[index])
  );

const feed = (input, index = 0, layer) => net => {
  const inputs = matrix.create(input, [input.length, 1]);

  if (net.net.length - 2 === index) {
    return calculateLayer(net, index)(inputs);
  }

  return feed(
    input,
    index + 1,
    calculateLayer(net, index)(index === 0 ? inputs : layer)
  )(net);
};

export const train = data => net => {
  const output = map(d => feed(d.input)(net))(data);

  const target = map(d => matrix.create(d.output, [output.length, 1]))(data);

  const error = mapIndexed((o, i) => matrix.subtract(target[i])(o))(output);

  map(matrix.print)(output);
  map(matrix.print)(target);
  map(matrix.print)(error);
};
