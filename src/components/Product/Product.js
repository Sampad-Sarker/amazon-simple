import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {

    //console.log(props);
    // console.log(props.productItem);

    const {img, name,seller,price,stock} = props.productItem;//destructuring
    
    return (
        <div className="productArea">
            <div>
                <img src={img} alt=""/>
            </div>
            <div >
                <h4 className = "product-name">{name}</h4>
                <br/>
                <small>by: {seller}</small>
                <br/>
                <p>${price}</p>
                <br/>
                <small>Only {stock} left in stock-order soon</small>
                <br/><br/>
                <button onClick={()=>props.buttonOnClick(props.productItem)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>

            </div>
            
        </div>
    );
};

export default Product;