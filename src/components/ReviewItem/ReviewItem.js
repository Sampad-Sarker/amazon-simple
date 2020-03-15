import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {

    const{img,name,seller,quantity,price} = props.cartProductItem;
    return (
        <div className="productArea">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4>
                <h4>Price:${price}</h4>
                <h4>Quantity: {quantity}</h4>
             <br/>
             <button>Remove</button>   
            </div>
            
        
        
        </div>
        
    );
};

export default ReviewItem;