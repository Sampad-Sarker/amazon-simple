import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {

        //console.log(fakeData);
        const first10Data=fakeData.slice(0,10);   //first 10 data   
        const [products,setProducts] = useState(first10Data);  //server or database data

        const[cart,setCart] = useState([]); //cart state

           
        //sync data state in multiple component.After refreshing cart data of shop may not reset(zero value) 
        useEffect(() =>{
            const savedCartProduct = getDatabaseCart();//retrieve data from local storage 
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
            
            setCart(desiredCartProduct);
    
            
    
        }, []);


        //button onclick function
        const onClickFunction = (singleProduct) =>{
        //console.log("clicked",singleProduct);
        //add product from shop total shows NaN,to solve this bug this part of code is responsible 
        const findOutCartProduct = cart.find(element => singleProduct.key === element.key); //search same product 
        let count=1;
        let newCart;
        if(findOutCartProduct){
            count = findOutCartProduct.quantity+1;
            findOutCartProduct.quantity=count;
            
            const others = cart.filter(element => element.key!== singleProduct.key);
            newCart= [...others,findOutCartProduct]; 

        }else{
            singleProduct.quantity = 1;
            newCart =[...cart,singleProduct];

        }
        
        // const count = findOutCartProduct.length;

        // const newCart = [...cart,singleProduct];//adding new item to newCart
        setCart(newCart);  //update cart

        //console.log(cart);
        //add product from shop total shows NaN,for this cause this part of code no longer need 
        // const singleProductCount = newCart.filter(element => singleProduct.key === element.key); //search same product 
        // const count = singleProductCount.length;

        addToDatabaseCart(singleProduct.key,count);  //product is added to local storage  by its key
    }
      

    return (
        <div className="shop-container">
            <div className="product-container">
                
                    {
                        products.map(element => <Product productItem={element} showAddToCartButton={true} buttonOnClick={onClickFunction} key={element.key}></Product>)   //for multiple map ,there should e a unique key property value
                    }
                
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order-review"><button>Order Review</button></Link>
                </Cart>

                    
            </div>
            
        </div>
    );
};

export default Shop;