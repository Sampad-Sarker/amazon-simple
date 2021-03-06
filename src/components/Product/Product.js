import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {

    //console.log(props);
    // console.log(props.productItem);

    const {img, name,seller,price,stock,key} = props.productItem;//destructuring
    
    return (
        <div className="productArea">
            <div>
                <img src={img} alt=""/>
            </div>
            <div >
                {/* link to dynamic path using ket value */}
                <h4 className = "product-name"><Link to={"product/"+key}>{name}</Link> </h4>  
                <br/>
                <small>by: {seller}</small>
                <br/>
                <p>${price}</p>
                <br/>
                <small>Only {stock} left in stock-order soon</small>
                <br/><br/>
                {/*conditional based ui rendering,when condition 
                is true it show the button otherwise not
                
                it can be done using if() condition.
                
                implemented way is shorthand style.
                by default condition value is true like  props.showAddToCartButton means it is true by default
                *******************/}
                {props.showAddToCartButton === true  &&   <button onClick={()=>props.buttonOnClick(props.productItem)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}

            </div>
            
        </div>
    );
};

export default Product;