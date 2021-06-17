const initialState = {
  users: [],
  editUser: null,
};

export const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ACTION_STORE_USERS': {
      return {
        ...state,
        users: payload,
      };
    }
    case 'ACTION_STORE_USER_TO_EDIT': {
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};
