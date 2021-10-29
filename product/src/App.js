import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/app/store';
import ProductList from '../src/feature/productList.js';
function App () {
  return (
    <ReduxProvider store={store}>
      <ProductList/>
    </ReduxProvider>
  );
}

export default App;
