import {ADD_RECORDING} from '../actions/types';

const initialState = {
  recordedAudios: [],
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
    default:
      return state;
  }
};
export default recordReducer;
