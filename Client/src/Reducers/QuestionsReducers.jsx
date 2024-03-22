
const initialState = {
    error: null,
    data: null,
  };
  
  const QuestionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'Question_Post_Successfully':
      case 'All_Question_Fetched_Succesfully':
       case 'STORE_USER_ORDER_DETAILS': 
        return {
          ...state,
          data: action.payload,
          error: null, 
        };
  
      case 'POST_ANSWER':
        return {
          ...state,
          data: action.payload,
          error: null, 
        };
  
      case "Couldn't_Post_a_New_Quetions":
      case "Failed_To_fetch_all_Questions":
      case 'Failed_To_Delete':
        return {
          ...state,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default QuestionReducer;
  