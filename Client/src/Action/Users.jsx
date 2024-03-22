import axios from 'axios';


// const apiUrl = 'https://modern-rose-leotard.cyclic.app';
// const apiUrl = 'https://assassin-upload-backend-stack.onrender.com';
const apiUrl='http://localhost:3000'

export const fetchAllUsers = () => async (dispatch) => {

  try {


    const response = await axios.get(`${apiUrl}/user/getAllUsers`);


    dispatch({ type: 'Fetch_All_Users', payload: response.data })

    return response

  } catch (error) {
    console.log(' i am the failed error' + error);
    dispatch({ type: 'Fetch_Failed' })
  }

}

export const updateProfile = (id, userProfile) => async (dispatch) => {
  try {


    const ProfileToken = JSON.parse(localStorage.getItem('Profile'))

    const token = ProfileToken.token

    if (!token) {
      throw new Error('Authorization token not found in localStorage');
    }


    const config = {
      headers: {
        'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    };

    const response = await axios.patch(`${apiUrl}/user/updateProfile/${id}`, userProfile, config);
    console.log(response.status);
    console.log(response.data);
    dispatch({ type: 'Update_User_Profile', payload: response.data })

    return response

  } catch (error) {
    console.log(error);
    dispatch({ type: 'Updating_Failed' })
  }
}