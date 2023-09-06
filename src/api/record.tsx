import axios from 'axios';
export const changeLyrics = async ({value}: any) => {
  return await axios
    .request({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://3.64.26.250:8000/change_lyrics?client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o&s0_original=2.770&sf_original=4.003&s0_replacement=2.815&sf_replacement=4.077&song_to_replace=Boten_Anna',
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: value,
    })
    .then(response => {
      console.log(response.data);
      return true;
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
