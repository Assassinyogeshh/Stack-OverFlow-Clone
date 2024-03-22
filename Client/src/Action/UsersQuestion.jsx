import axios from 'axios';

const apiUrl = 'http://localhost:3000';
// const apiUrl = 'https://assassin-upload-backend-stack.onrender.com';
// const apiUrl = 'https://modern-rose-leotard.cyclic.app';

export const askQuestion= (userQuestion, navigate)=> async(dispatch)=>{

try {

   const ProfileToken =JSON.parse( localStorage.getItem('Profile'))

   const token= ProfileToken.token
   
   if (!token) {
     throw new Error('Authorization token not found in localStorage');
   }

  
   const config = {
     headers: {
       'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
       'Content-Type': 'application/json', // Set the appropriate content type
     },
   };


    const response=await axios.post(`${apiUrl}/Questions/Ask`,  userQuestion, config);
    
    const data= response?.data
   if(response.status === 200){
    // const token = response.headers['authorization'];
    dispatch({type:'Question_Post_Successfully', payload:data})
    dispatch(fetchAllQuestions())
   }

 return response
} catch (error) {
  // console.log(error);
  // dispatch({type:"Couldn't_Post_a_New_Quetions", error:error.message})   
}

}

export const fetchAllQuestions=(fetchAllQuestions, navigate)=> async(dispatch)=>{
    try {
        const response= await axios.get(`${apiUrl}/Questions/fetchAllQuestions`,  fetchAllQuestions);

 const data= response.data
          if(response.status===200){
            dispatch({type:"All_Question_Fetched_Succesfully", payload:data});
          }

          return response

    } catch (error) {
         dispatch({type:'Failed_To_fetch_all_Questions', error:error.message})
    }
}

export const deleteQuestion=(id, navigate)=> async(dispatch)=>{
    try {
      const ProfileToken =JSON.parse( localStorage.getItem('Profile'))

      const token= ProfileToken.token
   
      
      if (!token) {
        throw new Error('Authorization token not found in localStorage');
      }
   
     
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
          'Content-Type': 'application/json', // Set the appropriate content type
        },
      };


     const response = await axios.delete(`${apiUrl}/Questions/delete/${id}`, config)   
   
      if(response.status === 200){
        const token = response.headers['authorization'];
        dispatch(fetchAllQuestions())
        navigate('/')
      }
      
 return response
    } catch (error) {
        dispatch({type:'Failed_To_Delete', error:error})
    }
}


export const voteQuestions=(id,value)=>async(dispatch)=>{
   try {

    const ProfileToken =JSON.parse( localStorage.getItem('Profile'))

    const token= ProfileToken.token
 
    
    if (!token) {
      throw new Error('Authorization token not found in localStorage');
    }
 
   
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    };

    const response= await axios.patch(`${apiUrl}/Questions/vote/${id}`, {value} , config);
    
    if(response.status===200){
      // console.log(response);
      const token = response.headers['authorization'];
        dispatch(fetchAllQuestions())
    }
    return response
   } catch (error) {
    dispatch({type:"Failed_To_Vote_The_Question", error:error.message})
   }
}




export const postAnswer= (id, noOfAnswers, answerBody, userAnswered)=> async(dispatch)=>{

try {
  const ProfileToken =JSON.parse( localStorage.getItem('Profile'))

  const token= ProfileToken.token

  
  if (!token) {
    throw new Error('Authorization token not found in localStorage');
  }

 
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
      'Content-Type': 'application/json', // Set the appropriate content type
    },
  };

  

const response= await axios.patch(`${apiUrl}/answers/post/${id}`,  {id,
  noOfAnswers,
  answerBody,
  userAnswered,
},
config
);

const responseData=response.data

console.log(responseData);
const updatedToken = response.headers['authorization'];

dispatch({ type: "POST_ANSWER", payload: response.data })
dispatch(fetchAllQuestions())

return responseData

} catch (error) {
  console.log(error);
}

}


export const deleteAnswer=(id,  answerId, noOfAnswers)=>async(dispatch)=>{

 try {

  const ProfileToken =JSON.parse( localStorage.getItem('Profile'))

  const token= ProfileToken.token

  
  if (!token) {
    throw new Error('Authorization token not found in localStorage');
  }

 
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
      'Content-Type': 'application/json', // Set the appropriate content type
    },
  };

  const response=  await axios.patch(`${apiUrl}/answers/delete/${id}`,{ answerId, noOfAnswers}, config)
 
  if(response.status=200){
    const updatedToken = response.headers['authorization'];
    dispatch(fetchAllQuestions());
  }

   return response

 } catch (error) {
  console.log(error);
 }

}

export const userCheckOut = (amount, plan) => async (dispatch) => {
  try {
    const ProfileToken = JSON.parse(localStorage.getItem('Profile'));

    if (!ProfileToken) {
      alert("Sign In Before Subscribe");
      return;
    }

    const token = ProfileToken.token;

    if (!token) {
      throw new Error('Authorization token not found in localStorage');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data: { key } } = await axios.get("http://localhost:3000/getKey");

    const { data: { order } } = await axios.post("http://localhost:3000/Questions/checkOut", {
      amount, plan
    }, config);
console.log(order);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: plan,
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: `http://localhost:3000/Questions/verifyPayment`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office",
      },
      theme: {
        "color": "#121212"
      }
    };

  
    dispatch(storeOrderDetails(order));

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    console.error(error);
  }
};


const storeOrderDetails = (order) => ({
  type: 'STORE_USER_ORDER_DETAILS',
  payload: order,
});
