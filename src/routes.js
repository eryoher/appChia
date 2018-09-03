import React from 'react';
import { Route , IndexRoute } from 'react-router';
import App from './components/app';
import Products from './components/products';
import Category from './components/category';
import Product from './components/product';
import Item from './components/item';


export default (
  <Route path="/" component={App} >
    <IndexRoute component={Products} />    
    <Route path="product/:id" component={Product} />
    <Route path="category/:id" component={Category} />
    <Route path="item/:id" component={Item} />

  </Route>
);
