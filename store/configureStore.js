import { createStore } from 'redux';
import reducer from './reducer.js';

export default function configureStore(initialState = {}) {
    return createStore(reducer, initialState);
}
