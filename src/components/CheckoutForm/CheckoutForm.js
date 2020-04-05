import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {

  const [paymentError,setPaymentError] = useState(null);
  const [paymentSuccess,setPaymentSuccess] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log("strip integrated...",error,paymentMethod);

    if(error){
        setPaymentError(error.message);
        setPaymentSuccess(null);
    }
    else{
      setPaymentSuccess(paymentMethod);
      setPaymentError(null);
      //console.log(paymentMethod);
      const payment ={id:paymentMethod.id,last4:paymentMethod.card.last4};

      props.handlerPlaceOrder(payment);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentSuccess && <p style={{color:"green"}}>Payment succcessful</p>
      }
      {
        paymentError && <p style={{color:"red"}}>{paymentError}</p>
      }

    </form>
  );
};

export default CheckoutForm;