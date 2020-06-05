import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import { createStructuredSelector } from "reselect";

import { connect } from 'react-redux';

import  HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sing-in-sing-up/sign-in sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user.actions';
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckOutPage from "./pages/checkout/checkout.jsx";


class App extends React.Component{

  unsusbscribeFromAuth = null;

    componentDidMount(){

      const {setCurrentUser} =  this.props;

      this.unsusbscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser ({
                id: snapShot.id,
                ...snapShot.data()
              });
            });
        }
       setCurrentUser(userAuth);
      });
    }

    componentWillUnmount(){
      this.unsusbscribeFromAuth();
    }

  render(){
    
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckOutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            this.props.currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
    
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToprops = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToprops )
  (App);
