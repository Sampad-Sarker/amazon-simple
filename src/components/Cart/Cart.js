
import React from 'react';
import './Cart.css';
// import { UserContext } from '../../App';  //import only a context from app.js

const Cart = (props) => {

    // const user = useContext(UserContext);  // use the imported context 
    // console.log(user);

    

    //console.log(props);
    const cart = props.cart;

    let total=0;
    for (let i = 0; i < cart.length; i++) {  //total price
        const cartProduct = cart[i];
        total = total+cartProduct.price*cartProduct.quantity;
        //debugger;
    }

    let shippingCost=0;

    if(total >35)   //shipping cost calculate
    {
        shippingCost =0;
    }
    else if(total > 15)
    {
        shippingCost = 15.99;
    }
    else if(total >0){
        shippingCost=4.99;
    }

    const taxRate = total*0.10;   //10% tax

    const formateValue =(num) =>{   //to show decimal value
        return num.toFixed(2);
    }

    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Items Ordered:{cart.length}</h4>
            <h4>Product Price:${formateValue(total)}</h4>
            <h4><small>Shipping:${formateValue(shippingCost)}</small></h4>
            <h4><small>Tax:${formateValue(taxRate)}</small></h4>
             <h4>Total:${formateValue(total+shippingCost+taxRate)}</h4>

             {/* <Link to="/order-review"><button>Order Review</button></Link> */}

            {/* conditional ui rendering */}
            {
                props.children
            }

            {/* //context info// */}
            {/* <h4>{user}</h4>   */}
        </div>
    );
};

export default Cart;