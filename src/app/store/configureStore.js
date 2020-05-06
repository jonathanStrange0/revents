import {createStore} from 'redux'
import {devToolsEnhancecr} from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';

export const configureStore = () => {
    const store = createStore(rootReducer, devToolsEnhancecr)

    return store;
}