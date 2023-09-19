import {REELS} from './constant';

const addReelVideo = async (body: any) => {
  const data = {
    id: 'MjrK0Yx7O2UlkLqU',
    link: 'example22.com',
  };
  return await fetch(REELS.ADD_VIDEO_ON_REEL, {
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

async function likeVideo() {
  const data = {
    id: '5',
    videoID: 'GyVFDYVL8uFy0fqi',
    ownerID: '4',
  };
  fetch(REELS.LIKE_REEL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async data => {
      console.log(await data.json());
    })
    .catch(error => {
      console.log(error);
    });
}

async function saveVideo() {
  const data = {
    id: 'MjrK0Yx7O2UlkLqU',
    videoID: 'GyVFDYVL8uFy0fqi',
    ownerID: '4',
    link: 'example.com',
  };
  fetch(REELS.SAVE_REEL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async data => {
      console.log(await data.json());
    })
    .catch(error => {
      console.log(error);
    });
}

async function getSavedVideos() {
  const data = {
    id: 'm56jBT1HlYaOtpn4',
  };
  return fetch(REELS.GET_ALL_SAVE_REEL, {
    method: 'GET',
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

async function getAllVideos() {
  const data = {
    id: 'm56jBT1HlYaOtpn4',
  };
  return fetch(REELS.GET_ALL_REELS, {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async (data: any) => {
      return await data.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export {addReelVideo, likeVideo, saveVideo, getSavedVideos, getAllVideos};
