import React from 'react';
// import styled from 'styled-components';
import * as nn from '../lib/neuralNetwork';
// import Matrix from '../components/Matrix';

const net = nn.create({ net: [3, 3, 3, 2], bias: 1 });

const data = [{ input: [1, 1, 1], output: [1, 1] }];

nn.train(data)(net);

// const Wrapper = styled('div')`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
//
// const Title = styled('div')`
//   text-transform: uppercase;
//   color: #434343;
// `;

const IndexPage = () => (
  <React.Fragment>
    {/* <Wrapper>
      <Title>input to hidden weights</Title>
      <Matrix
        matrix={net.weight.inputHidden.flattenWithKeys}
        cols={net.weight.inputHidden.cols}
      />
    </Wrapper>
    <Wrapper>
      <Title>hidden to output weights</Title>
      <Matrix
        matrix={net.weight.hiddenOutput.flattenWithKeys}
        cols={net.weight.hiddenOutput.cols}
      />
    </Wrapper>
    <Wrapper>
      <Title>output</Title>
      <Matrix matrix={output.flattenWithKeys} cols={output.cols} />
    </Wrapper> */}
  </React.Fragment>
);

export default IndexPage;
