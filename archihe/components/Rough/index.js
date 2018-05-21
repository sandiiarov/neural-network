import React from 'react';
import Rough from 'roughjs';

class ReactRough extends React.Component {
  componentDidMount() {
    // const { height, width } = this.props;
    // const canvas = document.createElement('canvas');
    //
    // canvas.height = height;
    //
    // canvas.width = width;
    // rough.canvas(this.node);
    // Rough.canvas(this.node);
  }

  render() {
    return (
      <canvas
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}

export default ReactRough;
