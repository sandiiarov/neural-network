import {
  times,
  repeat,
  compose,
  init,
  tail,
  addIndex,
  map,
  append,
  lensProp,
  over,
} from 'ramda';
import * as matrix from '../matrix';

const mapIndexed = addIndex(map);

const sigmoid = x => 1 / (1 + Math.exp(-x));

const dsigmoid = x => x * (1 - x);

const randomizeWeight = (prev, next) =>
  matrix.create(times(matrix.random, prev * next), [next, prev]);

const randomizeBias = (layer, bias) =>
  matrix.create(repeat(bias, layer), [layer, 1]);

const getWeights = net =>
  compose(mapIndexed((_, i) => randomizeWeight(net[i], net[i + 1])), init)(net);

const getBiases = bias =>
  compose(map(neurons => randomizeBias(neurons, bias)), tail);

export const create = ({
  net = [1, 1, 1],
  bias = matrix.random(),
  lerningRate = 1,
}) => ({
  net,
  outputs: [],
  weights: getWeights(net),
  biases: getBiases(bias)(net),
  lerningRate,
});

const calculateLayer = ({ weights, biases }, index) =>
  compose(
    matrix.map(sigmoid),
    matrix.add(biases[index]),
    matrix.product(weights[index])
  );

const addOutput = output => over(lensProp('outputs'), append(output));

const feed = (input, index = 0, layer) => n => {
  const inputs = matrix.create(input, [input.length, 1]);

  const net = index === 0 ? n : addOutput(layer)(n);

  if (net.net.length - 2 === index) {
    return addOutput(calculateLayer(net, index)(inputs))(net);
  }

  return feed(
    input,
    index + 1,
    calculateLayer(net, index)(index === 0 ? inputs : layer)
  )(net);
};

export const train = data => net => {
  map(({ input, output }) => {
    const outputs = feed(input)(net);
    //
    // const targets = matrix.create(output, [outputs.length, 1]);
    //
    // const errors = matrix.subtract(targets)(outputs);
    //
    // console.log('outputs');
    // matrix.print(outputs);
    // console.log('targets');
    // matrix.print(targets);
    // console.log('errors');
    // matrix.print(errors);
    //
    // const a = compose(
    //   matrix.multiply(net.lerningRate),
    //   matrix.multiply(errors),
    //   matrix.map(dsigmoid)
    // )(outputs);
    //
    // matrix.print(a);

    console.log('NET', outputs);
  }, data);
};
