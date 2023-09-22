import {ADD_LYRICS, ADD_RECORDING, REMOVE_RECORDING, USER_INFO} from './types';

export const addRecording = (rec: any) => {
  return {
    type: ADD_RECORDING,
    payload: rec,
  };
};

export const addLyrics = (lyrics: any) => {
  return {
    type: ADD_LYRICS,
    payload: lyrics,
  };
};

export const userInfoAdd = (user: any) => {
  return {
    type: USER_INFO,
    payload: user,
  };
};

export const removeRecording = () => {
  return {
    type: REMOVE_RECORDING,
  };
};
