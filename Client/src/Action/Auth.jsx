
import axios from 'axios';
import { currentUser } from './CurrentUser';

const apiUrl = 'http://localhost:3000';
// const apiUrl = 'https://assassin-upload-backend-stack.onrender.com';
// const apiUrl = 'https://modern-rose-leotard.cyclic.app';

export const register = (userData) => async (dispatch) => {

  try {

  
    const response = await axios.post(`${apiUrl}/user/register`, userData);
    const responseData = response.data



    console.log(`Response Data By me: ${JSON.stringify(responseData)}`);

    if (response.status === 200) {
      localStorage.setItem('Profile', JSON.stringify(responseData))
      dispatch(currentUser(JSON.parse(localStorage.getItem("Profile"))))
      dispatch({ type: 'REGISTER_SUCCESS', payload: responseData.token });

    }


    return response


  } catch (error) {

    const errorResponse = error.response

    dispatch({ type: 'REGISTER_FAILED', error: error.message });
    return errorResponse
  }
};



export const login = (userData) => async (dispatch) => {

  try {
    console.log('Before making request');
    const response = await axios.post(`${apiUrl}/user/login`, userData);
    const { token } = response.data

    console.log('After making request');
    if (response.status === 200) {

      localStorage.setItem('Profile', JSON.stringify(response.data))
      dispatch(currentUser(JSON.parse(localStorage.getItem("Profile"))))
      dispatch({ type: "LOGIN_SUCCESSFULL", payload: token })
        
    } 
      return response

  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", error: error.message });
    return error.response
  }

}

export const logout = () => (dispatch, navigate) => {
  navigate.push('/')
  dispatch({ type: "LOGOUT" })
}



