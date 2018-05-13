import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
// eslint-disable-next-line
import worker from 'workerize-loader!../worker';
import Rough from '../components/Rough';

const AppWrapper = styled('div')`
  position: relative;
`;

const Title = styled('h2')`
  position: absolute;
  right: 0;
`;

const Title2 = styled('h2')`
  position: absolute;
  right: 0;
  top: 80px;
`;

class App extends React.Component {
  state = {
    curve: [],
    loss: null,
    predict: null,
  };

  // eslint-disable-next-line
  net = worker();

  epochs = 500;

  width = 500;

  height = 500;

  componentDidMount() {
    const percent = this.width / this.epochs;

    this.net.addEventListener('message', ({ data: { type, result } }) => {
      if (type === 'TFJS') {
        const {
          epoch,
          logs: { loss },
        } = result;

        const x = epoch * percent;

        const y = Math.abs(loss * this.height - 500);

        this.setState(({ curve }) => ({
          curve: [...curve, [x, y > 500 ? 0 : y]],
          loss,
        }));
      }
    });
  }

  fit = () => {
    this.setState({ curve: [] }, () =>
      this.net.fit({ epochs: this.epochs, shuffle: true })
    );
  };

  predict = () => {
    this.net
      .predict([0, 0.5])
      .then(result => this.setState(state => ({ ...state, predict: result })));
  };

  render() {
    return (
      <AppWrapper>
        <Title>LOSS: {this.state.loss}</Title>
        <Title2>PREDICT: {this.state.predict}</Title2>
        <Rough width={this.width} height={this.height}>
          {rc => {
            rc.line(0, 0, 0, 500, {
              stroke: 'white',
              strokeWidth: 5,
              roughness: 0,
            });
            rc.line(0, 500, 500, 500, {
              stroke: 'white',
              strokeWidth: 5,
              roughness: 0,
            });
            rc.curve([[0, 0], ...this.state.curve], {
              stroke: 'white',
              strokeWidth: 1,
            });
          }}
        </Rough>

        <div>{this.state.curve.length}</div>
        <button onClick={this.fit}>FIT</button>
        <button onClick={this.predict}>PREDICT</button>
      </AppWrapper>
    );
  }
}

export default hot(module)(App);
