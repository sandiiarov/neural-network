import React from 'react';

class Draw extends React.Component {
  static defaultProps = {
    loadTimeOffset: 5,
    brushSize: 6,
    brushColor: '#ffffff',
    width: 400,
    height: 400,
    disabled: false,
  };

  // eslint-disable-next-line
  isMouseDown = false;

  linesArray = [];

  startDrawIdx = [];

  timeoutValidity = 0;

  getMousePos = ({ clientX, clientY }) => {
    const { left, top } = this.canvas.getBoundingClientRect();

    return {
      x: clientX - left,
      y: clientY - top,
    };
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);

    this.timeoutValidity += 1;

    this.linesArray = [];

    this.startDrawIdx = [];
  };

  drawLine = line => {
    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = line.size;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(line.startX, line.startY);
    this.ctx.lineTo(line.endX, line.endY);
    this.ctx.stroke();
  };

  drawStart = event => {
    this.isMouseDown = true;

    this.startDrawIdx.push(this.linesArray.length);

    const { x, y } = this.getMousePos(event);

    this.x = x;

    this.y = y;

    this.draw(event);
  };

  drawEnd = () => {
    this.isMouseDown = false;
  };

  draw = event => {
    if (!this.isMouseDown || this.props.disabled) return;

    const { x, y } = this.getMousePos(event);

    const newX = x + 1;

    const newY = y + 1;

    const line = {
      color: this.props.brushColor,
      size: this.props.brushSize,
      startX: this.x,
      startY: this.y,
      endX: newX,
      endY: newY,
    };

    this.drawLine(line);

    this.linesArray.push(line);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.linesArray);
    }

    this.x = newX;

    this.y = newY;
  };

  render() {
    return (
      <React.Fragment>
        <canvas
          width={this.props.width}
          height={this.props.height}
          style={{ display: 'block', background: '#000000' }}
          ref={canvas => {
            if (canvas) {
              this.canvas = canvas;
              this.ctx = canvas.getContext('2d');
            }
          }}
          onMouseDown={this.drawStart}
          onClick={() => false}
          onMouseUp={this.drawEnd}
          onMouseOut={this.drawEnd}
          onBlur={this.drawEnd}
          onMouseMove={this.draw}
        />
        {this.props.children({ clear: this.clear })}
      </React.Fragment>
    );
  }
}

export default Draw;
