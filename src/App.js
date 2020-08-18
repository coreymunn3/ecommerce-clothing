import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
// pages
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUp from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './component/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';


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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth object contains user information like UID and display name
      // console.log(userAuth);
      // userAuth will be null if signing out
      if(userAuth){
        // create userRef using google auth data
        const userRef = await createUserProfileDocument(userAuth);
        // subscribe to userRef
        userRef.onSnapshot(snap => {
          console.log(snap.data())
          // set local app state using snapshot.data() properties
          this.setState({
            currentUser: {
              id: snap.id,
              ...snap.data()
            }
          // console log state in the callback 
          }, ()=> {console.log(this.state)});
        });
      }
      else {
        // if user is signed out, set state to null
        // same as saying currentUser: null
        this.setState({currentUser: userAuth});
      }
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
