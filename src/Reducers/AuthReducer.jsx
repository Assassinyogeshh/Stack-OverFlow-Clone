const initialState = {
  token: null,
  error: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        token: action.payload,
        error: null 
      };

    case 'LOGIN_FAIL':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        error: action.error
                
      };

       

    case 'LOGOUT':
      return {
        ...state,
        token: null,
        error: null,
        statusCode:null
      };

    

    default:
      return state;
  }
};

export default AuthReducer;




