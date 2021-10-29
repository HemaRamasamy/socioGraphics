import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Rating, Typography, Button, Box, CircularProgress } from '@mui/material';

const rowTitle = ['Reviewer Name', 'Comment', 'Usefulness', 'Rating'];
const FlexBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

const ProductTable = () => {
  const productReview = useSelector((state) => state.products.productReview);
  const loader = useSelector((state) => state.products.loader);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [isShow, setIsShow] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const onButtonClick = (event) => {
    const targetButton = event.target.id;
    setIsShow((state) => ({
      ...state,
      [targetButton]: !state[targetButton]
    }));
  };

  useEffect(() => { setRowsPerPage(3); }, []);
  useEffect(() => {
    productReview.map((product) => (
      setIsShow((state) => ({
        ...state,
        [product.product_id]: false
      }))
    ));
  }, [productReview]);

  return (
    <Box>
      <TableContainer >
        <Table stickyHeader
          aria-label="sticky table"
          size="small">
          <TableHead>
            <TableRow>
              {rowTitle.map((title, index) => (
                <TableCell key={index}
                  sx={{ fontWeight: 'bold' }}>
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={loader ? { position: 'relative', height: '200px' } : { position: 'relative' }}>

            {
              loader
                ? <TableRow>
                  <TableCell>
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '50%',
                        left: '50%'
                      }}>
                      <CircularProgress/>
                    </Box>
                  </TableCell>
                </TableRow>

                : productReview && productReview?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) =>
                    (<TableRow key={product.product_id}><TableCell>{product.friend ? product.reviewer.name : '-'}</TableCell>
                      <TableCell>{product.comment}</TableCell>
                      <TableCell>{product.usefulness}</TableCell>
                      <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <FlexBox>
                            <Typography variant="body2"> Overall </Typography>
                            <Rating name="read-only"
                              value={product.ratings.Overall}
                              readOnly />
                          </FlexBox>
                          {
                            isShow[`productButton${product.product_id}`] &&
                                            (<>
                                              <FlexBox>
                                                <Typography variant="body2"> Delivery Time </Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.delivery_time}
                                                  readOnly />
                                              </FlexBox>
                                              <FlexBox>
                                                <Typography variant="body2">Discounts and Offer </Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.discounts_and_offers}
                                                  readOnly />
                                              </FlexBox>
                                              <FlexBox>
                                                <Typography variant="body2">Matches Description</Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.matches_description}
                                                  readOnly />
                                              </FlexBox>
                                              <FlexBox>
                                                <Typography variant="body2">Matches Photo</Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.matches_photo}
                                                  readOnly />
                                              </FlexBox>
                                              <FlexBox>
                                                <Typography variant="body2">Packaging</Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.packaging}
                                                  readOnly />
                                              </FlexBox>
                                              <FlexBox>
                                                <Typography variant="body2">Price</Typography>
                                                <Rating name="read-only"
                                                  value={product.ratings.price}
                                                  readOnly />
                                              </FlexBox>
                                            </>)
                          }
                        </Box>
                        <Box>
                          { isShow[`productButton${product.product_id}`]
                            ? <Button size="small"
                              variant="contained"
                              sx={{ fontSize: '12px' }}
                              id={`productButton${product.product_id}`}
                              onClick={onButtonClick}>Hide </Button>
                            : <Button size="small"
                              variant="contained"
                              sx={{ fontSize: '12px' }}
                              id={`productButton${product.product_id}`}
                              onClick={onButtonClick} >Show More  </Button>
                          }
                        </Box>
                      </TableCell>
                    </TableRow>)
                  )
            }

          </TableBody>
        </Table>
        {!loader &&
                <TablePagination
                  component="div"
                  count={productReview.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[3]}
                />
        }
      </TableContainer>

    </Box>
  );
};
export default ProductTable;
