import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
// pages
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUp from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './component/header/header.component.jsx';


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route path='/signin' component={SignInUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
