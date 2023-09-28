import axios from 'axios';
import {API, GENERATE_TRACK, LINK} from './constant';
export const changeLyrics = async ({value}: any) => {
  const url =
    LINK.CHANGE_LYRICS +
    `?client_id=${value.client_id}&current_key=${value.current_key}&s0_original=${value.s0}&sf_original=${value.s1}&s0_replacement=${value.r0}&sf_replacement=${value.r1}&song_to_replace=Boten_Anna`;

  //
  console.log(url);
  return await fetch(url, {
    method: 'POST',
    body: value.data,
    // headers: {
    //   'Content-Type': 'multipart/form-data', // Set the content type for FormData
    // },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error.message);
      return false;
    });

  // .then(response => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(error => {
  //   console.log(error);
  // });
};
export async function addAIRecording(data: any) {
  return fetch(GENERATE_TRACK.ADD_AI_RECORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async data => {
      return await data.json();
    })
    .catch(error => {
      console.log(error);
    });
}
