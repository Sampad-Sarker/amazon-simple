import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {

    //console.log(fakeData);
    const first10Data=fakeData.slice(0,10);   //first 10 data   
    const [products,setProducts] = useState(first10Data);  //server or database data

    const[cart,setCart] = useState([]); //cart state



    const onClickFunction = (singleProduct) =>{
        //console.log("clicked",singleProduct);

        const newCart = [...cart,singleProduct];//adding new item to newCart
        setCart(newCart);  //update cart

        //console.log(cart);
        const singleProductCount = newCart.filter(element => singleProduct.key === element.key); //search same product 
        const count = singleProductCount.length;
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
                <Cart cart={cart}></Cart>

                    {/* <h3>this is cart</h3>
                    <h4>Order summary :{cart.length}</h4> */}
            </div>
            
        </div>
    );
};

export default Shop;