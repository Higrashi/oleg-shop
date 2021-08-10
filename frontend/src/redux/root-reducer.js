import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shoppingCartReducer from './shopping-cart/shopping-cart.reducer';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['shoppingCart']
}


const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer
});

export default persistReducer(persistConfig, rootReducer);