import { combineReducers } from 'redux';
import componentsReducer from './components';

const rootReducer = combineReducers({
    data : componentsReducer
});

export default rootReducer;
