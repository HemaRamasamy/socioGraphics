import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const initialState = {
  loader: true,
  productReview: []
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct (state) {
      state.loader = true;
    },
    getProductSuccess (state, action) {
      state.loader = false;
      const data = action.payload;
      const productData = data?.reviews;
      state.productReview = productData?.map(({ comment, ratings, reviewer, friend, usefulness }) => ({ comment, product_id: uuid(), ratings, reviewer, friend, usefulness }));
    },
    getProductFailure (state) {
      state.loader = false;
      alert('something went wrong!!');
    }

  }
});

export const { getProduct, getProductSuccess, getProductFailure } = ProductSlice.actions;
export default ProductSlice.reducer;
