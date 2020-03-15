import React, { useState, useEffect } from 'react';
import './OrderReview.css';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {

    const [cartProduct,setCartProduct] = useState([]);
    
    useEffect(() =>{
        const savedCartProduct = getDatabaseCart();
        console.log(savedCartProduct);
        const savedCartProductKey = Object.keys(savedCartProduct); //get the key name
        console.log("unique Keys",savedCartProductKey);
        // const savedCartProductNumber = Object.values(savedCartProduct); //get the values
        //console.log(savedCartProductNumber);

        const desiredCartProduct = savedCartProductKey.map( keyOfElement => {
            const findOutProduct = fakeData.find(element => element.key === keyOfElement);
            //desiredCartProduct.quantity = Object.values(savedCartProduct);//same
            findOutProduct.quantity = savedCartProduct[keyOfElement];//same ,add a new key named quantity

            return findOutProduct;
        });
        console.log("list of added product",desiredCartProduct);
        
        setCartProduct(desiredCartProduct);

        

    }, []);
    return (
        <div>
            <h1>this is Order Review</h1>
            <h3>Number of order:{cartProduct.length}</h3>
                             
            {
                cartProduct.map(element => <ReviewItem cartProductItem ={element} key={element.key}></ReviewItem>)
            }
               
        </div>
    );
};

export default OrderReview;