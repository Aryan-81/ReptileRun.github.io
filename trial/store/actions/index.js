export const START_GAME = 'START_GAME';
export const MOVE_SNAKE = 'MOVE_SNAKE';
export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
export const GAME_OVER = 'GAME_OVER';

export const startGame = () => ({
  type: START_GAME,
});

export const moveSnake = () => ({
  type: MOVE_SNAKE,
});

export const changeDirection = (direction) => ({
  type: CHANGE_DIRECTION,
  payload: direction,
});

export const gameOver = () => ({
  type: GAME_OVER,
});
