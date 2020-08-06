import React from 'react';
import { Link } from 'react-router-dom';
import {auth } from '../../firebase/firebase.utils';
 
import { ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';
 
const Header = ({ currentUser}) => (
  <div className='header'>
    <Link to='/' className='logo-container'>
      <Logo className='logo'></Logo>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        Shop
      </Link>
      <Link className='option' to='/shop'>
        Contact
      </Link>
        {
          // check if current user exists, if so this shows 'sign out' instead of 'sign in'
          currentUser ? 
          <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
          :
          <Link className='option' to='/signin'>Sign In</Link>
        }
    </div>
  </div>
)

export default Header;