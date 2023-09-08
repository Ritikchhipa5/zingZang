export const API = 'http://3.129.111.250:4242';

export const AUTH = {
  SIGN_WITH_EMAIL: API + '/api/singin/singInEmail',
  SIGN_WITH_GOOGLE: API + '/api/singup/singUpGoogle',
  REGISTER_WITH_EMAIL: API + '/api/singup/singUpEmail',
};

export const GENERATE_TRACK = {
  CREATE_TEXT_SONG: API + '/api/Spotify/createTextSong',
  REQUEST_TEXT_SONGS: API + '/api/Spotify/requestTextSongs',
};
