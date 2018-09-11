import axios from 'axios';
import * as types from '../actions/types';


  export function fetchDataCategories(productId){
    const request = axios.get(types.PATH_SITE + `categories/getListById/${productId}.json`);
    return{
      type: types.FETCH_DATA_CATEGORIES,
      payload: request
    };
  }

  export function getItem(id){
    const request = axios.get(types.PATH_SITE + `items/${id}.json`);
    return{
      type: types.FETCH_DATA_ITEM,
      payload: request
    };
  }


  export function getCategory(id){
    const request = axios.get(types.PATH_SITE + `categories/${id}.json`);
    return{
      type: types.FETCH_DATA_CATEGORY,
      payload: request
    };
  }

  export function getProduct(productId){
    const request = axios.get(types.PATH_SITE + `products/${productId}.json`);
    return{
      type: types.FETCH_DATA_PRODUCT,
      payload: request
    };
  }

  export function fetchDataProducts(){
    const request = axios.get(types.PATH_SITE + 'products.json');
    return{
      type: types.FETCH_DATA_PRODUCTS,
      payload: request
    };
  }

  export function getBanners(){
    const request = axios.get(types.PATH_SITE + 'banners.json');
    return{
      type: types.GET_DATA_BANNERS,
      payload: request
    };
  }


  export function sendInfo(data){

    var params = new URLSearchParams();
    params.append('front', true);
    params.append('name', data.name);
    params.append('phone', data.phone);
    params.append('email', data.email);
    params.append('message', data.message);
    params.append('branch', data.branch);
    params.append('term',( data.term) ? 1 : 0 );

    const request = axios.post(types.PATH_SITE + 'contacts.json',params);
    return{
      type: types.SEND_DATA,
      payload: request
    };
  }
