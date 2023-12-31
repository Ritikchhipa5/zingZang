import {ADD_LYRICS, ADD_RECORDING, REMOVE_RECORDING} from '../actions/types';

const initialState = {
  recordedAudios: [],
  lyrics: [],
};

const recordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_RECORDING:
      return {
        ...state,
        recordedAudios: [
          ...state.recordedAudios,
          action.payload?.recordedAudios,
        ],
      };
    case ADD_LYRICS:
      return {
        ...state,
        lyrics: action.payload,
      };
    case REMOVE_RECORDING:
      return {
        ...state,
        recordedAudios: [],
      };
    default:
      return state;
  }
};
export default recordReducer;
