import {ADD_CURRENT_SONG} from './types';

export const addCurrentSong = (song: any) => {
  console.log(song);

  return {
    type: ADD_CURRENT_SONG,
    payload: song,
  };
};
