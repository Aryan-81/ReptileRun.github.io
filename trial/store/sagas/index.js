import { takeEvery, put, delay, select } from 'redux-saga/effects';
import { startGame, moveSnake, gameOver } from '../reducers';

function* gameSaga() {
  yield put(startGame());
  while (true) {
    const state = yield select();
    if (state.gameOver) {
      yield put(gameOver());
      break;
    }
    yield put(moveSnake());
    yield delay(state.speed);
  }
}

function* watchStartGame() {
  yield takeEvery('START_GAME', gameSaga);
}

export default function* rootSaga() {
  yield watchStartGame();
}
