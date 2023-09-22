// store.js
import {legacy_createStore as createStore, combineReducers} from 'redux';
import recordReducer from './reducers/recordReducer';
import UserReducer from './reducers/UserReducer';
import SongReducer from './reducers/SongReducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// defaults to localStorage for web
// You can choose different storage options

const persistConfig = {
  key: 'root', // key is a unique identifier for your storage
  storage: AsyncStorage, // define your storage engine
  whitelist: ['userData'],
};

const rootReducer = combineReducers({
  records: recordReducer,
  userData: UserReducer,
  songs: SongReducer,
});

// const configureStore = () => {
//   return createStore(rootReducer);
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
// export default configureStore;
