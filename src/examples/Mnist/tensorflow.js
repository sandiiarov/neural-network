import * as tf from '@tensorflow/tfjs';
import mnist from 'mnist';

const IMAGE_SIZE = 28;

const LEARNING_RATE = 0.3;

const { training } = mnist.set(8000, 2000);

const xs = training.map(({ input }) => input);

const ys = training.map(({ output }) => output);

const model = tf.sequential({
  layers: [
    tf.layers.dense({
      units: 50,
      inputShape: [IMAGE_SIZE ** 2],
      activation: 'relu',
    }),
    tf.layers.dense({
      units: 10,
      inputShape: [50],
      activation: 'softmax',
    }),
  ],
});

model.compile({
  optimizer: tf.train.sgd(LEARNING_RATE),
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});

export const fit = async onEpochEnd => {
  await model.fit(tf.tensor(xs), tf.tensor(ys), {
    batchSize: 32,
    epochs: 15,
    shuffle: true,
    callbacks: { onEpochEnd },
  });
};

export const predict = async input => {
  tf
    .fromPixels(input)
    .reshape([2352])
    .print();

  const result = model.predict(tf.fromPixels(input).reshape([2352]));

  const data = await result.data();

  return Array.from(data);
};
