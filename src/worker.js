import * as tf from '@tensorflow/tfjs';

const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0]]);

const ys = tf.tensor2d([[0], [1], [1]]);

const model = tf.sequential({
  layers: [tf.layers.dense({ units: 1, inputShape: [2] })],
});

model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

export const fit = async options => {
  await model.fit(xs, ys, {
    ...options,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        // eslint-disable-next-line
        self.postMessage({
          type: 'TFJS',
          method: 'fit',
          result: { epoch, logs },
        });
      },
    },
  });
};

export const predict = async data => {
  const result = await model.predict(tf.tensor2d([data])).data();

  return result[0];
};
