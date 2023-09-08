import {USER_INFO} from '../actions/types';

const initialState = {
  user: 'sdbfjhbsdjh',
};

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default UserReducer;
