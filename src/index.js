import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import Photo from './examples/Photo/v2';

// eslint-disable-next-line
injectGlobal`
  body {
    background: #000000;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    margin: 0;
  }
`;

const root = document.createElement('div');

if (document.body) document.body.appendChild(root);

render(<Photo />, root);
