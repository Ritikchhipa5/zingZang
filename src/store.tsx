// store.js
import {legacy_createStore as createStore, combineReducers} from 'redux';
import recordReducer from './reducers/recordReducer';

const rootReducer = combineReducers({
  records: recordReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
