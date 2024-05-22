import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snake: [[5, 5]],
  direction: 'RIGHT',
  food: [10, 10],
  gameOver: false,
  speed: 200,
};

const getNextPosition = (head, direction) => {
  switch (direction) {
    case 'UP':
      return [head[0], head[1] - 1];
    case 'DOWN':
      return [head[0], head[1] + 1];
    case 'LEFT':
      return [head[0] - 1, head[1]];
    case 'RIGHT':
      return [head[0] + 1, head[1]];
    default:
      return head;
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.snake = [[5, 5]];
      state.direction = 'RIGHT';
      state.food = [10, 10];
      state.gameOver = false;
    },
    moveSnake: (state) => {
      const newSnake = [...state.snake];
      const head = newSnake[newSnake.length - 1];
      const newHead = getNextPosition(head, state.direction);

      // Check for collisions with the walls
      if (newHead[0] < 0 || newHead[1] < 0 || newHead[0] >= 20 || newHead[1] >= 20) {
        state.gameOver = true;
        return;
      }

      // Check for collisions with itself
      if (newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
        state.gameOver = true;
        return;
      }

      // Add the new head to the snake body
      newSnake.push(newHead);

      // Check for food consumption
      if (newHead[0] === state.food[0] && newHead[1] === state.food[1]) {
        // Generate new food position
        state.food = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
      } else {
        // Remove the tail if no food is eaten
        newSnake.shift();
      }

      state.snake = newSnake;
    },
    changeDirection: (state, action) => {
      const oppositeDirections = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
      };

      // Prevent the snake from reversing
      if (oppositeDirections[state.direction] !== action.payload) {
        state.direction = action.payload;
      }
    },
    gameOver: (state) => {
      state.gameOver = true;
    },
  },
});

export const { startGame, moveSnake, changeDirection, gameOver } = gameSlice.actions;
export default gameSlice.reducer;
