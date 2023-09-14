export const API = 'http://3.129.111.250:4242';
export const AI_API = 'http://3.78.234.117:8000';
export const AUTH = {
  SIGN_WITH_EMAIL: API + '/api/singin/singInEmail',
  SIGN_WITH_GOOGLE: API + '/api/singup/singUpGoogle',
  REGISTER_WITH_EMAIL: API + '/api/singup/singUpEmail',
};

export const ALBUM = {
  CREATE_ALBUM_COVER: AI_API + '/sdapi/v1/txt2img',
};

export const GENERATE_TRACK = {
  CREATE_TEXT_SONG: API + '/api/Spotify/createTextSong',
  REQUEST_TEXT_SONGS: API + '/api/Spotify/requestTextSongs',
};

export const REELS = {
  GET_ALL_REELS: API + '/api/tiktok/requestAllVideos',
  ADD_VIDEO_ON_REEL: API + '/api/tiktok/addVideo',
  LIKE_REEL: API + '/api/tiktok/likevideo',
  SAVE_REEL: API + '/api/tiktok/saveVideo',
  GET_ALL_SAVE_REEL: API + '/api/tiktok/requestSavedVideos',
};
