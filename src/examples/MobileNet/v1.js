import React from 'react';
import { hot } from 'react-hot-loader';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { IMAGENET_CLASSES } from './data';

const IMAGE_SIZE = 224;

const cropImage = img => {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - size / 2;
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - size / 2;

  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
};

class MobileNet extends React.Component {
  state = {
    prediction: null,
  };
  async componentDidMount() {
    this.model = await tf.loadModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
    );

    setInterval(() => this.predict(), 1000);
  }

  predict = () => {
    this.webcam.getScreenshot();

    tf.tidy(() => {
      // tf.fromPixels() returns a Tensor from an image element.
      const raw = tf.fromPixels(this.webcam.canvas).toFloat();
      const cropped = cropImage(raw);
      const resized = tf.image.resizeBilinear(cropped, [
        IMAGE_SIZE,
        IMAGE_SIZE,
      ]);

      // Normalize the image from [0, 255] to [-1, 1].
      const offset = tf.scalar(127);
      const normalized = resized.sub(offset).div(offset);

      // Reshape to a single-element batch so we can pass it to predict.
      const batched = normalized.expandDims(0);

      // Make a prediction through mobilenet.
      const data = this.model.predict(batched).dataSync();

      this.setState({ prediction: this.topPredictions(data)[0] });
    });
  };

  topPredictions = data => {
    const K = 10;

    const tuples = Array.from(data)
      .map((prob, index) => ({ index, prob }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, K)
      .map(({ index }) => IMAGENET_CLASSES[index]);

    return tuples;
  };

  render() {
    return (
      <React.Fragment>
        <Webcam
          ref={webcam => {
            this.webcam = webcam;
          }}
          audio={false}
          width={640}
          height={480}
        />
        <h1>{this.state.prediction}</h1>
      </React.Fragment>
    );
  }
}

export default hot(module)(MobileNet);
