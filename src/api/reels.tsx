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

async function likeVideo(data: any) {
  return fetch(REELS.LIKE_REEL, {
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

async function unlikeVideo(data: any) {
  return fetch(REELS.LIKE_REEL, {
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
async function saveVideo(data: any) {
  return fetch(REELS.SAVE_REEL, {
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

async function unSaveVideo(data: any) {
  return fetch(REELS.UNSAVE_REEL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async data => {
      console.log(data);
      return await data.json();
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
  return fetch(REELS.GET_ALL_REELS, {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (data: any) => {
      return await data.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export {
  addReelVideo,
  unlikeVideo,
  likeVideo,
  saveVideo,
  getSavedVideos,
  getAllVideos,
  unSaveVideo,
};
