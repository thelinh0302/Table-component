import { PayloadAction } from '@reduxjs/toolkit';
import { delay, ForkEffect, takeEvery } from 'redux-saga/effects';
import { setDisplayLayout } from '@/store/slices/layoutSlice';

function* handleDisplayLayoutSaga(action: PayloadAction<number>) {
  console.log('Waiting 1s');
  // Wait 1s
  yield delay(1000);

  console.log('Waiting done, dispatch action', action);

  // Dispatch action success
}

export default function* homeSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  console.log('home saga....');

  //example
  yield takeEvery(setDisplayLayout.toString(), handleDisplayLayoutSaga);
}
