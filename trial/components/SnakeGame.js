import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, changeDirection } from '../store/reducers';

const SnakeGame = () => {
  const dispatch = useDispatch();
  const snake = useSelector(state => state.snake);
  const food = useSelector(state => state.food);
  const gameOver = useSelector(state => state.gameOver);
  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(startGame());

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          dispatch(changeDirection('UP'));
          break;
        case 'ArrowDown':
        case 's':
          dispatch(changeDirection('DOWN'));
          break;
        case 'ArrowLeft':
        case 'a':
          dispatch(changeDirection('LEFT'));
          break;
        case 'ArrowRight':
        case 'd':
          dispatch(changeDirection('RIGHT'));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = 10;

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      snake.forEach(([x, y]) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(x * scale, y * scale, scale, scale);
      });

      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillRect(food[0] * scale, food[1] * scale, scale, scale);
    };

    if (!gameOver) {
      drawGame();
    }
  }, [snake, food, gameOver]);

  return (
    <div>
      {gameOver ? <div>Game Over</div> : null}
      <canvas ref={canvasRef} width="200" height="200" style={{ border: '1px solid #000' }}></canvas>
    </div>
  );
};

export default SnakeGame;
