import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../app/axiosClient';
import { getProduct, getProductSuccess, getProductFailure } from './productSlice';

function * productAPI (action) {
  try {
    const { productId, reviewId } = action.payload;
    const response = yield call(() => getRequest(`reviews/${productId}/${reviewId}`));
    const data = response.data;
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

export default function * rootSaga () {
  yield all([takeLatest(getProduct, productAPI)]);
}
