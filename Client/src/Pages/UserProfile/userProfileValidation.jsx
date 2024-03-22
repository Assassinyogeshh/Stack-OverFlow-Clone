import * as yup from 'yup';

export const profileValidation = yup.object({
    DisplayName: yup.string().min().max(26).required('Please Enter Your Name'),
    AboutMe: yup.string().required('Please fill the required Field'),
    tags: yup.string().required('Please fill the required field')
});