import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
// pages
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUp from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './component/header/header.component.jsx';
import { auth } from './firebase/firebase.utils.js';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    // auth.onAuthStateChanged returns a function firebase.unsubscribe()
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})

      console.log(user);
    })
  }

  componentWillUnmount(){
    // essentially, calling firebase.unsubscribe()
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/signin' component={SignInUp}></Route>
        </Switch>
      </div>
    );
  }
  
}

export default App;
