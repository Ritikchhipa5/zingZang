// store.js
import {legacy_createStore as createStore, combineReducers} from 'redux';
import recordReducer from './reducers/recordReducer';
import UserReducer from './reducers/UserReducer';
import SongReducer from './reducers/SongReducer';

const rootReducer = combineReducers({
  records: recordReducer,
  userData: UserReducer,
  songs: SongReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
