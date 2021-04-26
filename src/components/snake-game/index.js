import React, { Component } from "react";
import "./style.css";

// For canvas
const borderColor = "black";
const backgroundColor = "white";

// For Snake
const snakeBorderColor = "darkgreen";
const snakeBackgroundColor = "lightgreen";

// For Food
const foodBorderColor = "darkred";
const foodBackgroundColor = "red";

// Food Coordinates
let foodX = undefined;
let foodY = undefined;

// Coordinates of Each Snake Part
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [...snake],
      score: 0,
      dx: 10,
      dy: 0,
      isGameOver: false,
    };
  }

  componentDidMount() {
    this.drawCanvas();
  }

  drawCanvas = () => {
    const gameCanvas = this.refs.canvas;
    const ctx = gameCanvas.getContext("2d");

    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = borderColor;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

    this.createFood(gameCanvas);
    this.main(ctx, gameCanvas);

    document.addEventListener("keydown", this.changeDirection);
  };

  main = (ctx, gameCanvas) => {
    if (this.didGameEnd(gameCanvas)) {
      this.setState({ isGameOver: true });

      return;
    }

    setTimeout(() => {
      this.clearCanvas(ctx, gameCanvas);
      this.drawFood(ctx);
      this.advancedSnake(gameCanvas);
      this.drawSnake(ctx);

      this.main(ctx, gameCanvas);
    }, 60);
  };

  drawSnake = (ctx) => {
    this.state.snake.forEach((snakePart) => {
      ctx.fillStyle = snakeBackgroundColor;
      ctx.strokeStyle = snakeBorderColor;
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    });
  };

  advancedSnake = (gameCanvas) => {
    const { dx, dy, snake } = this.state;

    const duplicateSnake = [...snake];
    const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };

    duplicateSnake.unshift(snakeHead);

    this.setState({ snake: duplicateSnake }, () => {
      const { snake, score } = this.state;
      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

      if (didEatFood) {
        this.setState({ score: score + 10 });
        this.createFood(gameCanvas);
      } else {
        snake.pop();
      }
    });
  };

  clearCanvas = (ctx, gameCanvas) => {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
  };

  changeDirection = (event) => {
    const { dx, dy } = this.state;

    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === leftKey && !goingRight) {
      this.setState({ dx: -10, dy: 0 });
    }

    if (keyPressed === upKey && !goingDown) {
      this.setState({ dx: 0, dy: -10 });
    }

    if (keyPressed === rightKey && !goingLeft) {
      this.setState({ dx: 10, dy: 0 });
    }

    if (keyPressed === downKey && !goingUp) {
      this.setState({ dx: 0, dy: 10 });
    }
  };

  randomTen = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  };

  createFood = (gameCanvas) => {
    foodX = this.randomTen(0, gameCanvas.width - 10);
    foodY = this.randomTen(0, gameCanvas.height - 10);

    this.state.snake.forEach((part) => {
      const foodIsOnSnake = part.x == foodX && part.y == foodY;

      if (foodIsOnSnake) {
        this.createFood(gameCanvas);
      }
    });
  };

  drawFood = (ctx) => {
    ctx.fillStyle = foodBackgroundColor;
    ctx.strokeStyle = foodBorderColor;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
  };

  didGameEnd = (gameCanvas) => {
    const { snake } = this.state;

    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;

      if (didCollide) {
        return true;
      }
    }

    const hitLeftWall = snake[0].x === 0;
    const hitRightWall = snake[0].x === gameCanvas.width - 10;
    const hitToptWall = snake[0].y === 0;
    const hitBottomWall = snake[0].y === gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  };

  restartGame = () => {
    this.setState(
      {
        snake: [...snake],
        score: 0,
        dx: 10,
        dy: 0,
        isGameOver: false,
      },
      () => this.drawCanvas()
    );
  };

  render() {
    const { score, isGameOver } = this.state;

    return (
      <div>
        <div id="score-container">
          <p id="score-heading">Score</p>
          <span>{score}</span>
        </div>
        <div id="game-canvas-container">
          <canvas id="game-canvas" width="400" height="400" ref="canvas" />
        </div>
        {isGameOver && (
          <div id="game-over-container">
            <p id="game-over-heading">Game Over</p>
            <button id="restart-btn" onClick={this.restartGame}>
              Restart
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default SnakeGame;
