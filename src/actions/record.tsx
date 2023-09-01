import {ADD_RECORDING} from './types';

export const addRecording = (rec: any) => {
  return {
    type: ADD_RECORDING,
    payload: rec,
  };
};
