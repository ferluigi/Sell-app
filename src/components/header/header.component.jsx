import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {auth} from '../../firebase/firebase.utils';

import { createStructuredSelector } from "reselect";
import CartIcon  from "../cart-icon/cart-icon";
import './header.styles.scss';
import CartDropDown from '../card_dropdown/cart-dropdown';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from "../../redux/user/user.selector";

const Header = ({currentUser, hidden}) => (
    <div className="header">
    <Link className="logo-container" to="/">
<Logo className="logo" />
    </Link>
    <div className="options">
    <Link className="option" to="/shop">
    SHOP
    </Link>
    <Link className="option" to="/shop">
    cONTACT
    </Link>
   
    {currentUser ? (<div className= "option" onClick={() => auth.signOut()}>
    SING OUT
    </div>
    ):(
    <Link className="option" to="/signin">
        SING IN
    </Link>
    )} 
    <CartIcon/>
    </div>
  {  hidden ? null : 
    <CartDropDown/>}
    </div>
);

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);