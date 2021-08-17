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
  SNAKE_HEAD_COLOR,
} from "../../js/snake_constants";

import i18n from "../../i18n/index.js";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));

const Snake = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStopped, setGameStopped] = useState(true);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setGameStopped(false);
    setScore(0);
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setGameStopped(true);
  };
  const moveSnake = ({ keyCode }) => {
    if (keyCode >= 37 && keyCode <= 40) {
      const newDir = DIRECTIONS[keyCode];
      if (dir[1] === -newDir[1] || dir[0] === -newDir[0]) {
        return;
      }
      setDir(newDir);
    }
    if (keyCode === 32 && gameStopped) {
      startGame();
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
      if (head[0] === segment[0] && head[1] === segment[1]) return true;
    }

    return false;
  };
  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
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
      setScore((oldScore) => oldScore + 1);
    }
    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

    context.fillStyle = SNAKE_HEAD_COLOR;

    // Snake body
    snake.forEach(([x, y], i) => {
      context.fillStyle = i % 2 === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
      i !== 0 && context.fillRect(x, y, 1, 1);
    });

    // Snake head
    context.fillStyle = SNAKE_HEAD_COLOR;
    context.beginPath();
    var startAngle = (dir[0] * Math.PI) / 2 + Math.PI;
    if (dir[1] === 1) startAngle += Math.PI;
    context.arc(
      snake[0][0] + 0.5,
      snake[0][1] + 0.5,
      0.5,
      startAngle,
      startAngle + Math.PI
    );
    context.fill();
    context.fillRect(
      snake[0][0] + (dir[0] < 0 ? 0.5 : 0),
      snake[0][1] + (dir[1] < 0 ? 0.5 : 0),
      dir[0] !== 0 ? 0.6 : 1,
      dir[1] !== 0 ? 0.6 : 1
    );

    //Apple
    context.fillStyle = APPLE_COLOR;
    context.beginPath();
    context.arc(apple[0] + 0.5, apple[1] + 0.5, 0.5, 0, 2 * Math.PI);
    context.fill();
  }, [snake, apple, gameOver, dir]);
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
      <div className="flex-col mt-20 mb-6 focus:outline-none flex items-center w-screen justify-center">
        <h2 className="mt-6 text-green-500 font-bold">CSnake</h2>
        <canvas
          onClick={startGame}
          className="border-8 border-green-500"
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameStopped && (
          <div className="absolute text-lg mt-10 text-green-600">
            {i18n.t("snake.click_to_start")} {gameOver && i18n.t("snake.again")}
          </div>
        )}
        {gameOver && (
          <div className="absolute -mt-8 text-red text-3xl">
            {i18n.t("snake.game_over")}
          </div>
        )}
        <h3 className="mt-5">
          {i18n.t("snake.score")}: {score}
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Snake;
