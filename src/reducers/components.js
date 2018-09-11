import * as types from '../actions/types';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case types.FETCH_DATA_CATEGORIES:
            return {...state, categories:action.payload.data.categories };
        case types.FETCH_DATA_PRODUCTS:

            return {...state, products:action.payload.data.products };
        case types.FETCH_DATA_PRODUCT:
            return {...state, product:action.payload.data.product };
            case types.GET_DATA_BANNERS:
                return {...state, banners:action.payload.data.banners };
        case types.FETCH_DATA_CATEGORY:
            return {...state, category:action.payload.data.category };
        case types.FETCH_DATA_ITEM:
            return {...state, item:action.payload.data.item };
        case types.SEND_DATA:
            return {...state, formResponse:action.payload.data };
    }
    return state;
}
