import {createStore} from 'redux'
import {devToolsEnhancecr} from 'redux-devtools-extension'
import rootReducer from '../../features/testarea/testReducer';

export const configureStore = () => {
    const store = createStore(rootReducer, devToolsEnhancecr)

    return store;
}