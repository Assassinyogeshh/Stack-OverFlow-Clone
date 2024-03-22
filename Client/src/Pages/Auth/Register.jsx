import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useDispatch } from 'react-redux';
import { register } from '../../Action/Auth';
import { useFormik } from 'formik';
import { signUpSchema } from './UserSchema';
import AboutRegister from './AboutRegister';


const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: ''
}

function Register({isNight}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { values, handleSubmit, touched, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, Action) => {
      try {
        const response = await dispatch(register(values, navigate))
        console.log('ResponseYogesh:', response);

        if (response.status === 200) {
          alert('REGISTERATION SUCCESFULL')
          Action.resetForm()
          navigate('/')
        }
        else if (response.status === 409) {

          alert('USER ALREADY EXIST')

        }

      }
      catch (error) {
        if (error.response.status === 500) {
          alert('Internal Error Occured')
        }
        console.log(`Registration Failed: ${error}`)


      }
    }

  })


  return (
    <>


      <div className="main_register" style={{backgroundColor:isNight?"#060A13":"", color:isNight?"white":" "}}>

        <AboutRegister className='about_register' />

        <div className="Register_box" style={{background:isNight?"none":"white"}}>
          <span className='stack_logo_img_register'><img src="/stack_logo.png" alt="stack logo" /></span>
          <form className='Register_page' onSubmit={handleSubmit}>
            <label htmlFor="Name">UserName</label>
            <input type="text" name="name" value={values.name} id="Name" onChange={handleChange} required />
            {errors.name && touched.name ? (<p className='form_errors'>{errors.name}</p>) : null}
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" value={values.email} id="Email" onChange={handleChange} required />
            {errors.email && touched.email ? (<p className='form_errors'>{errors.email}</p>) : null}
            <label htmlFor="Password">Password</label>
            <input type="password" name="password" value={values.password} id="Password" onChange={handleChange} required />
            {errors.password && touched.password ? (<p className='form_errors'>{errors.password}</p>) : null}
            <label htmlFor="Cpassword">Confirm Password</label>
            <input type="password" name="cpassword" value={values.cpassword} id="Cpassword" onChange={handleChange} required />
            {errors.cpassword && touched.cpassword ? (<p className='form_errors'>{errors.cpassword}</p>) : null}

            <button type='submit' className="Register_Btn">Register</button>

            <span className='signUp_page'>Already have an account? <Link style={{ color: '#007ac6', textDecoration: 'none' }} to={'/user/Login'}>

              <p>Login</p> </Link>

            </span>
          </form>
        </div>

      </div>





    </>
  )
}

export default Register