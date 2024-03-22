import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import QuestionReducer from './QuestionsReducers';
import currentUserReducer from './currentUserReducer';
import usersReducer from './UsersReducer'
const rootReducer= combineReducers({
    AuthReducer,
    QuestionReducer,
    currentUserReducer,
    usersReducer
})

export default rootReducer