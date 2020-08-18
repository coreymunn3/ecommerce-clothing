import React from 'react';
import SignIn from '../../component/sign-in/sign-in.component.jsx';
import SignUp from '../../component/sign-up/sign-up.component.jsx';

import './sign-in-up.styles.scss';

const SignInUp = () => (
  <div className='sign-in-up'>
    <SignIn></SignIn>
    <SignUp></SignUp>
  </div>
);

export default SignInUp;