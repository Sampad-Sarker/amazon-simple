import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {

    const{img, name, quantity, price,key} = props.cartProductItem;
    return (
        <div className="productArea-Review">
            
            
                <div>
                    <img src={img} alt=""/>
                </div>
                <div>
                    <h4>{name}</h4>
                    <h4>Price:${price}</h4>
                    <h4>Quantity: {quantity}</h4>
                    <br/>
                    {/* get whole details of removed item product  */}
                    {/* <button onClick={() => props.removeButtonClick(props.cartProductItem)}>Remove</button>    */}
                    
                    {/*get only unique key value of removed item product */}
                    <button onClick={() => props.removeButtonClick(key)}>Remove</button> 
                </div>
            

            {/* <div className="cart-area">
                <h2>cart area</h2>
            </div> */}
                

            
        
        
        </div>
        
    );
};

export default ReviewItem;