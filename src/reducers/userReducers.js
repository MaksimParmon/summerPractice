import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_FAIL,
} from "../constants/userConstants";

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { laoding: true };
    case USER_LOGIN_SUCCESS:
      return { laoding: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { laoding: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userProfileReducers = (
  state = { user: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { loading: true, ...state };
    case USER_INFO_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
