import {ALBUM, GENERATE_TRACK, LINK} from './constant';

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
  console.log(data);
  return fetch(GENERATE_TRACK.ADD_CREATE, {
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

async function requestDownloadLink(data: any) {
  return await fetch(LINK.REQUEST_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.log(error);
    });
}

const createVideoSong = async (data: any) => {
  return await fetch(
    GENERATE_TRACK.VIDEO_CREATE +
      `?settings_json={"prompts":{"0":"${data?.description}","30":" anthropomorphic clean cat, surrounded by mandelbulb fractals, epic angle and pose, symmetrical, 3d, depth of field --neg nsfw, nude","60":" a beautiful coconut --neg photo, realistic  nsfw, nude","90":" a beautiful durian, amazing award winning photography --neg nsfw, nude"}}
  &allowed_params=prompts&client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(value => {
      return value;
    })
    .catch(error => {
      console.error(error);
    });
};
export {
  createTextSong,
  requestTextSongs,
  createAlbumCoverSong,
  addVideo,
  requestDownloadLink,
  createVideoSong,
};
