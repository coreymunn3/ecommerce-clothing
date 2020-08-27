import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
// styles
import './App.css';
// pages
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUp from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './component/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions'; 

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    // destructure off props
    const {setCurrentUser} = this.props
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
          setCurrentUser({
              id: snap.id,
              ...snap.data()
          })
          console.log(snap.data())
          // console log state in the callback 
        })
      }
      // if user is signed out, set state to null
      // same as saying currentUser: null
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    // essentially, calling firebase.unsubscribe()
    this.unsubscribeFromAuth();
  }

  render() {
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
  
}

// dispatch the object from user.action to all reducers
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
