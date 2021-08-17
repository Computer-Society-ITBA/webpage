const CANVAS_SIZE = [640, 480];
const SNAKE_START = [
  [7, 9],
  [7, 10],
];
const APPLE_START = [7, 3];
const SCALE = 40;
const SPEED = 200;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

const SNAKE_COLOR = "33FF88";
const APPLE_COLOR = "orange";
const SNAKE_HEAD_COLOR = "33EE88";

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  SNAKE_COLOR,
  APPLE_COLOR,
  SNAKE_HEAD_COLOR,
};
