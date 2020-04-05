import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../LogIn/useAuth';
import { getDatabaseCart,clearLocalStorageDatabaseCart } from '../../utilities/databaseManager';

import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const Shipment = () => {

    const auth = useAuth();

    const { register, handleSubmit, watch, errors } = useForm();
    
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    const [shipmentInfo,setShipmentInfo] = useState(null);
    const [orderId,setOrderId] = useState(null);
    
    
    const onSubmit = data => { 
      //console.log("form ",data);
      setShipmentInfo(data);
    }  
      
    const handlerPlaceOrder =(payment)=>{

      const savedCart = getDatabaseCart();
      const orderDetails = {
        email:auth.user.email,
        cart:savedCart,
        shipment:shipmentInfo,
        payment:payment
      };

      fetch("http://localhost:3001/placeOrder",{
        method:"POST",
        body:JSON.stringify(orderDetails),
        headers:{"Content-type":"application/json"}
      })
      .then(res => res.json())
      .then(orderData =>{
        //console.log("after fetch :",orderData);
        // alert("Place order successful with order id:"+orderData._id);
        //processOrder();
        // setShipmentInfo(true);

        setOrderId(orderData._id);
        clearLocalStorageDatabaseCart();
      })
    }
    

    //console.log(watch('example')) // watch input value by passing the name of it

    

  return (
    <div className="container">
      <div className="row">


        <div style={{display:shipmentInfo && "none"}}   className="col-md-6">
          <h2>Shipment Information</h2>
           {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>  
            
            {/* include validation with required or other standard HTML validation rules */}
            <input name="Name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
            {errors.Name && <span>Name is required</span>}
            
            <input name="Email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
            {errors.Email && <span>Email is required</span>}

            <input name="phoneNumber"  ref={register({ required: true })} placeholder="Phone number"/>
            {errors.phoneNumber && <span>Phone number is required</span>}
            
            <input name="AddressLine1" ref={register({ required: true })}placeholder="Address line 1" />
            {errors.AddressLine1 && <span>Address line 1 is required</span>}
            
            <input name="Address  line 2" ref={register}  placeholder="Address line 2"/>
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            
            <input name="City" ref={register({ required: true })}placeholder="City"/>
            {errors.City && <span>City is required</span>}
            
            <input name="Country" ref={register({ required: true })} placeholder="Country"/>
            {errors.Country && <span>Country is required</span>}
            
            <input name="Zipcode" ref={register({ required: true })} placeholder="Zip code"/>
            {errors.Zipcode && <span>Zip code is required</span>}
            
            
            <input type="submit" />
          
          </form>
           
        </div>
        

        
        <div style={{display : shipmentInfo ? "block":"none"}} className="col-md-6">
            <h2>Payment Information</h2>

            <Elements stripe={stripePromise}>
              <CheckoutForm handlerPlaceOrder={handlerPlaceOrder}></CheckoutForm>
            </Elements>

            {
              orderId && <div>
                            <h3>Thank You for Shopping with Us</h3>
                            <p>Your order id:{orderId}</p>

                          </div>
            }

        </div>

      </div>
    </div>
  )
};

export default Shipment;