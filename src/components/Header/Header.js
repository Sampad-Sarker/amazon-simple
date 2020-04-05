import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../LogIn/useAuth';


const Header = () => {

    //const user = useContext(UserContext);  //context
    const auth = useAuth();
    //console.log(auth.user);

    return (
        <div className="header">
            <img src={logo} alt=""/>

            <nav>
                <a href="/shop">Shop</a>
                <a href="/order-review">Order Review</a>
                <a href="/inventory">Inventory</a>
                {/* <span style = {{color:'red'}}>{user}</span> */}

                {
                    auth.user ? <span style={{color:'white'}}>Hi,{auth.user.name} <a href="/login">SignOut</a> </span> :
                    <button href ="/shipment" style={{color:'white'}}>SignIn</button>
                }
            </nav>
        </div>
    );
};

export default Header;