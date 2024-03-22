import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../Action/Auth'
import { signInSchema } from './UserSchema'
import { useFormik } from 'formik'
import { useAuth0 } from "@auth0/auth0-react";

const initialValues = {
  email: '',
  password: ''
}

function Login({isNight}) {

  const { user, loginWithPopup } = useAuth0();


  const handleGoogleLogin = async () => {
    try {
      await loginWithPopup(); // or loginWithRedirect() depending on your preference

      const userGoogleData={
        name: user.given_name,
        G_email: user.email,
      }

      dispatch(login(userGoogleData))


    } catch (error) {
      console.log('Google Login Error:', error);
    }
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleSubmit, touched, handleChange, errors } = useFormik({

    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values, Action) => {
      try {
     const response= await dispatch(login(values, navigate))

     if (response.status === 200) {
      alert('Login Succesfulled')
      navigate('/')
      Action.resetForm()
    }
    else if (response.status === 404) {
      alert('Login Failed')
    }
  
       
      }

      catch (error) {

        if (error.response.status === 500) {
          alert('Internal Error Occured')
        }

        console.log(`Login Failed ${error}`);
      }

    }


  })


  return (
    <>
      <div className="auth_user" style={{backgroundColor:isNight?"#060A13":"", color:isNight?"white":" "}}>

        <span className='stack_logo_img'><img src="/stack_logo.png" alt="stack logo" /></span>
        <div className="loginBox" style={{background:isNight?"none":"white"}}>
          <form className='Login_Page' onSubmit={handleSubmit} >
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name='email' value={values.email} onChange={handleChange} required autoComplete="off" />
            {errors.email && touched.email ? (<p className='form_errors'>{errors.email}</p>) : null}
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={values.password} onChange={handleChange} required autoComplete="off" />
            {errors.password && touched.password ? (<p className='form_errors'>{errors.password}</p>) : null}
            <span className="checkBox">
              <span><input type="checkbox" id='check_Box' /><label htmlFor="check_Box">Remember me</label> </span>
              <Link to={'/forgetPassword'}>
              <p>Forget Password</p>
              </Link>
              </span>

            <button type='submit' className="submitBtn" >Login</button>
            <p style={{marginLeft:"9rem"}}>Or</p>
            <button  className="submitBtn" onClick={handleGoogleLogin}>Log In With Google</button>
            <span className='signUp_page'>Don't have an account?  <Link style={{color:'#007ac6', textDecoration:'none'}} to={'/user/register'}>

              <p> Register</p> </Link>

            </span>

          </form>
        </div>
        
      </div>
    </>
  )
}

export default Login
