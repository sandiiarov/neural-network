import React from 'react';
// import styled from 'styled-components';
// import * as tf from '@tensorflow/tfjs';
import Rough from '../components/Rough';

// const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0]]);
//
// const ys = tf.tensor2d([[0], [1], [1]]);
//
// const model = tf.sequential({
//   layers: [
//     tf.layers.dense({ units: 1, activation: 'sigmoid', inputShape: [2] }),
//   ],
// });
//
// model.compile({
//   optimizer: 'sgd',
//   loss: 'meanSquaredError',
// });

// const draw = () =>

// const fff = async curve => {
//   if (curve._points.length === 1) {
//     model.fit(xs, ys, {
//       epochs: 100,
//       shuffle: true,
//       callbacks: {
//         onEpochEnd: (epoch, logs) => {
//           curve.setPoint(curve._points.length, epoch, logs.loss);
//
//           return increase(curve);
//         },
//       },
//     });
//   }
// };

const Index = () => <Rough width={500} height={500} />;

// Index.getInitialProps = async () => {
//   const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0]]);
//
//   const ys = tf.tensor2d([[0], [1], [1]]);
//
//   const model = tf.sequential({
//     layers: [
//       tf.layers.dense({ units: 1, activation: 'sigmoid', inputShape: [2] }),
//     ],
//   });
//
//   model.compile({
//     optimizer: 'sgd',
//     loss: 'meanSquaredError',
//   });
//
//   await model.fit(xs, ys, {
//     epochs: 10,
//     shuffle: true,
//     callbacks: {
//       onEpochEnd: async (epoch, logs) => {
//         console.log(epoch, logs);
//       },
//     },
//   });
//
//   const result = model.predict(tf.tensor2d([[0, 0.9]]));
//
//   const data = await result.data();
//
//   return {
//     // data: data[0],
//     data: data[0],
//   };
// };

export default Index;
