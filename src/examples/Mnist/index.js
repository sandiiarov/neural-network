import React from 'react';
import { hot } from 'react-hot-loader';
import mnist from 'mnist';
import { fit, predict } from '../tensorflow';
import Draw from '../components/Draw';

const { training } = mnist.set(1);

class App extends React.Component {
  state = {
    epoch: null,
    loss: null,
    acc: null,
    prediction: [],
  };

  fit = () => {
    fit((epoch, { loss, acc }) =>
      this.setState(state => ({ ...state, epoch, loss, acc }))
    );
  };

  predict = async () => {
    const prediction = await predict(this.canvas.canvas);

    this.setState(state => ({ ...state, prediction }));
  };

  render() {
    const { epoch, loss, acc, prediction } = this.state;

    // console.log(prediction);
    // console.log(training[0].output);

    return (
      <Draw
        width={28}
        height={28}
        ref={canvas => {
          this.canvas = canvas;
        }}
      >
        {({ clear }) => (
          <React.Fragment>
            <button onClick={clear}>CLEAR</button>
            <button onClick={this.fit}>FIT</button>
            <button onClick={this.predict}>PREDICT</button>
          </React.Fragment>
        )}
      </Draw>
    );
  }
}

export default hot(module)(App);
