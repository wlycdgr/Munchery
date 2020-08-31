import { createStore } from 'redux';
import reducer from './reducer.js';

export default function configureStore() {
    return createStore(reducer);
}
