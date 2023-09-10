import {ADD_CURRENT_SONG} from '../actions/types';

const initialState = {
  currentSong: null,
};

const SongReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };

    default:
      return state;
  }
};
export default SongReducer;
