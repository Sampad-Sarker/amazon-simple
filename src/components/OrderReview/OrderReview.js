import React, { useState, useEffect } from 'react';
import './OrderReview.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import thankMessageImg from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const OrderReview = () => {

    const [cartProduct,setCartProduct] = useState([]); //cart state

    const [orderPlaced,setOrderPlaced] = useState(false);//place order state


    const onClickPlaceOrder = () => {

        setCartProduct([]); //make cart empty
        setOrderPlaced(true); //when place order button click ,set true
        processOrder(); //remove data from local storage

    }

    let thankMessage;
    if(orderPlaced){
        //thankMessage=<img src={thankMessageImg} alt=""/>
        thankMessage=<h1>Thank You for Purchasing</h1>
    }

    //remove btn activity
    const onClickRemoveButton = (removedProductItem) =>{
        //console.log("removed button click" ,removedProductItem);

        const newCartProduct = cartProduct.filter(element => element.key!==removedProductItem);
        //console.log(newCartProduct);

        setCartProduct(newCartProduct);

        // remove product item from localStorage and update the localStorage
        removeFromDatabaseCart(removedProductItem);//item removed.this function came from databaseManager.js 



    }
    
    useEffect(() =>{
        const savedCartProduct = getDatabaseCart(); //retrieve data from local storage 
        //console.log(savedCartProduct);
        const savedCartProductKey = Object.keys(savedCartProduct); //get the key name
        //console.log("unique Keys",savedCartProductKey);
        // const savedCartProductNumber = Object.values(savedCartProduct); //get the values
        //console.log(savedCartProductNumber);

        const desiredCartProduct = savedCartProductKey.map( keyOfElement => {
            const findOutProduct = fakeData.find(element => element.key === keyOfElement);
            //desiredCartProduct.quantity = Object.values(savedCartProduct);//same
            findOutProduct.quantity = savedCartProduct[keyOfElement];//same ,add a new key named quantity

            return findOutProduct;
        });
        //console.log("list of added product",desiredCartProduct);
        
        setCartProduct(desiredCartProduct);

        

    }, []);


    const auth = useAuth();  //custom hook
    return (
        <div className="shop-container-OrderReview">
            
            <div className="product-container-OrderReview">
                {/* <h1>this is Order Review</h1>
                <h3>Number of order:{cartProduct.length}</h3> */}
                                
                {
                    cartProduct.map(element => <ReviewItem cartProductItem ={element} removeButtonClick={onClickRemoveButton}  key={element.key}></ReviewItem>)
                }

                <div className="img-style">
                    {thankMessage}
                </div>
                {
                    !cartProduct.length && <h1>Your cart is empty.<a href="/">Keep Shoping</a> </h1>


                }
            </div>

            <div className="cart-container-OrderReview">
                <h3>Check Your Order</h3>
                {/* parameter name must be cart,because cart component already has cart named parameter,without it(cart named parameter ) the component cann't execute both call   */}
                <Cart cart={cartProduct}>
                    <Link to="/shipment">
                        {
                            auth.user ? <button>Proceed to Shipment</button> :
                            <button>Proceed to Login for Shipment</button>
                        }
                        
                    </Link>
                </Cart>
                
            </div>
            
               
        </div>
    );
};

export default OrderReview;