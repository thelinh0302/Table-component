import { all, AllEffect } from 'redux-saga/effects';
import SagaModules from '../features/**/saga.ts';

const appSaga = SagaModules.reduce((prev: Array<object>, module: any) => {
  prev.push(module.default());
  return prev;
}, []);

console.log('SagaModules===>', SagaModules);

export default function* rootSaga(): Generator<
  AllEffect<unknown>,
  void,
  unknown
> {
  yield all(appSaga);
}
