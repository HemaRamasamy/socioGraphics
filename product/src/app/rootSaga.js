import { all } from 'redux-saga/effects';
import productSaga from '../feature/productSaga';

// Here you can include all the saga which you write for components

export default function * rootSaga () {
  yield all([
    productSaga()
  ]);
}
