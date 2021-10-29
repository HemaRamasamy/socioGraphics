import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Select, FormControl, MenuItem, InputLabel, Box, Typography } from '@mui/material';
import { getProduct } from './productSlice';
import TableData from './tableData';
import { useEffect } from 'react';

export default function BasicSelect () {
  const dispatch = useDispatch();
  const [productId, setProductId] = React.useState(1);
  const [reviewId, setReviewId] = React.useState(1);
  const productHandleChange = (event) => {
    setProductId(event.target.value);
  };
  const reviewHandleChange = (event) => {
    setReviewId(event.target.value);
  };
  const productIds = [];
  for (let i = 1; i <= 20; i++) {
    productIds.push(i);
  }
  const reviewIds = [];
  for (let i = 1; i <= 20; i++) {
    reviewIds.push(i);
  }
  useEffect(() => {
    dispatch(getProduct({ productId, reviewId }));
    // eslint-disable-next-line
    },[])

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' }}>
                Product Review
      </Typography>
      <Box sx={{ pt: 3 }}>
        <FormControl variant="standard" sx={{ width: '120px', mr: 2 }}>
          <InputLabel id="product-select-label">Product Id</InputLabel>
          <Select
            labelId="product-id-label"
            id="productSelect"
            value={productId}
            label="Product Id"
            onChange={productHandleChange}
          >
            {
              productIds.map(id => <MenuItem value={id} key={id}>{id}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ width: '120px', mr: 2 }}>
          <InputLabel id="review-select-label">Review Id</InputLabel>
          <Select
            labelId="review-id-label"
            id="reviewSelect"
            value={reviewId}
            label="Product Id"
            onChange={reviewHandleChange}
          >
            {
              reviewIds.map(id => <MenuItem value={id} key={id}>{id}</MenuItem>)
            }
          </Select>
        </FormControl>
      </Box>
      <Button variant="outlined" sx={{ my: 3 }} onClick={() => dispatch(getProduct({ productId, reviewId }))}>Get Product Reviews</Button>

      <Box>
        <TableData/>
      </Box>
    </Box>

  );
}
