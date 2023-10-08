import {Alert} from 'react-native';
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
    .then(async value => {
      return await value.json();
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

const createVideoSong = async ({description}: any) => {
  const jsonData = {
    prompts: {
      '0': description?.[0],
      '30': description?.[1],
      '60': description?.[2],
      '90': description?.[3],
    },
  };
  console.log(
    GENERATE_TRACK.VIDEO_CREATE +
      `?settings_json=${encodeURIComponent(
        JSON.stringify(jsonData),
      )}&allowed_params=prompts&client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o`,
  );
  return await fetch(
    GENERATE_TRACK.VIDEO_CREATE +
      `?settings_json=${encodeURIComponent(
        JSON.stringify(jsonData),
      )}&allowed_params=prompts&client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o`,
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
      console.error(JSON.stringify(error.message), 'asdjksdkfjk');
      Alert.alert(error.message);
    });
};

const mergeVideoSong = async (data: any) => {
  console.log(
    GENERATE_TRACK.VIDEO_AUDIO_CREATE +
      `?video_path=${data?.video_path}&song_path=${data?.song_path}&client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o`,
  );
  return await fetch(
    GENERATE_TRACK.VIDEO_AUDIO_CREATE +
      `?video_path=${data?.video_path}&song_path=${data?.song_path}&client_id=MjrK0Yx7O2UlkLqU&current_key=1oovbp1z5ExvCf3o`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(value => {
      console.log(value);
      return value;
    })
    .catch(error => {
      console.log(error);
    });
};

export {
  createTextSong,
  requestTextSongs,
  createAlbumCoverSong,
  addVideo,
  requestDownloadLink,
  createVideoSong,
  mergeVideoSong,
};
