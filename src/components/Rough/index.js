import React from 'react';
import rough from 'roughjs';

class Rough extends React.Component {
  componentDidMount() {
    this.rc = rough.canvas(this.node);
    this.props.children(this.rc);
  }

  componentDidUpdate(prevProps) {
    prevProps.children(this.rc);
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}

export default Rough;
