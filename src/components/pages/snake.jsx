import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../../hooks/useInterval.js";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  SNAKE_COLOR,
  APPLE_COLOR,
} from "../../js/snake_constants";

import i18n from "../../i18n/index.js";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));
const Section = React.lazy(() => import("../section"));

const Snake = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };
  const moveSnake = ({ keyCode }) => {
    if (keyCode >= 37 && keyCode <= 40) {
      const newDir = DIRECTIONS[keyCode];
      if (dir[1] === -newDir[1] || dir[0] === -newDir[0]) {
        return;
      }
      setDir(newDir);
    }
  };
  const createApple = () => {
    return apple.map((_, i) =>
      Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE))
    );
  };
  const checkCollision = (head, snk = snake) => {
    if (
      head[0] * SCALE >= CANVAS_SIZE[0] ||
      head[0] < 0 ||
      head[1] * SCALE >= CANVAS_SIZE[1] ||
      head[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (head[0] == segment[0] && head[1] == segment[1]) return true;
    }

    return false;
  };
  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] == apple[0] && newSnake[0][1] == apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };
  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    if (checkCollision(newSnakeHead)) endGame();
    snakeCopy.unshift(newSnakeHead);
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    } else {
      setSpeed((oldSpeed) => oldSpeed * 0.95);
    }
    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = SNAKE_COLOR;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = APPLE_COLOR;
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);
  return (
    <div
      className="focus:outline-none"
      tabIndex="0"
      onKeyDown={(e) => {
        e.preventDefault();
        moveSnake(e);
      }}
    >
      <NavBar />
      <div className="flex-col mt-20 mb-10 focus:outline-none flex items-center w-screen justify-center">
        <canvas
          style={{ border: "1px solid black" }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && <div>GAME OVER!</div>}
        <button onClick={startGame}>Start Game</button>
      </div>
      <Footer />
    </div>
  );
};

export default Snake;
