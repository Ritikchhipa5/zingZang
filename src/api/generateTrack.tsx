import {ALBUM, GENERATE_TRACK} from './constant';

const createTextSong = async (body: any) => {
  return await fetch(GENERATE_TRACK.CREATE_TEXT_SONG, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.error(error);
    });
};

const requestTextSongs = async (body: any) => {
  return await fetch(GENERATE_TRACK.REQUEST_TEXT_SONGS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(value => {
      console.log(value);
      return value;
    })
    .catch(error => {
      console.log(error);
    });
};

const createAlbumCoverSong = async (body: any) => {
  return await fetch(ALBUM.CREATE_ALBUM_COVER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.error(error);
    });
};

async function addVideo(data: any) {
  fetch(GENERATE_TRACK.VIDEO_CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: await JSON.stringify(data),
  })
    .then(async data => {
      console.log(await data.json());
    })
    .catch(error => {
      console.log(error);
    });
}

export {createTextSong, requestTextSongs, createAlbumCoverSong, addVideo};
