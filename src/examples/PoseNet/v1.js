import React from 'react';
import { hot } from 'react-hot-loader';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

class PoseNet extends React.Component {
  state = {
    prediction: null,
  };

  async componentDidMount() {
    this.model = await posenet.load();

    setInterval(() => this.predict(), 1000);
  }

  predict = async () => {
    this.webcam.getScreenshot();

    const predictions = await this.model.estimateSinglePose(
      this.webcam.canvas,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );

    console.log(predictions);

    // this.setState({ prediction: predictions[0].className });
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

export default hot(module)(PoseNet);
