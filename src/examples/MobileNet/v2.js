import React from 'react';
import { hot } from 'react-hot-loader';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Webcam from 'react-webcam';

class MobileNet extends React.Component {
  state = {
    prediction: null,
  };

  async componentDidMount() {
    this.model = await mobilenet.load();

    setInterval(() => this.predict(), 1000);
  }

  predict = async () => {
    this.webcam.getScreenshot();

    const predictions = await this.model.classify(this.webcam.canvas);

    this.setState({ prediction: predictions[0].className });
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
