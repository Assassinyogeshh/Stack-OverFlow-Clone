const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default currentUserReducer;
