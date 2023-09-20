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

export const LINK = {
  REQUEST_LINK: API + '/api/security/requestDownloadLink',
  CHANGE_LYRICS: 'http://3.64.26.250:8000/change_lyrics',
};

export const GENERATE_TRACK = {
  CREATE_TEXT_SONG: API + '/api/Spotify/createTextSong',
  REQUEST_TEXT_SONGS: API + '/api/Spotify/requestTextSongs',
  ADD_CREATE: API + '/api/tiktok/addVideo',
  VIDEO_CREATE: AI_API + '/deforum/run',
};

export const REELS = {
  GET_ALL_REELS: API + '/api/tiktok/requestAllVideos',
  ADD_VIDEO_ON_REEL: API + '/api/tiktok/addVideo',
  LIKE_REEL: API + '/api/tiktok/unLikeVideo',
  DISLIKE_REEL: API + '/api/tiktok/unlikevideo',
  SAVE_REEL: API + '/api/tiktok/saveVideo',
  UNSAVE_REEL: API + '/api/tiktok/unSaveVideo',
  GET_ALL_SAVE_REEL: API + '/api/tiktok/requestSavedVideos',
};
