import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../LogIn/useAuth';

const Shipment = () => {

    const auth = useAuth();

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { console.log(data) }

    //console.log(watch('example')) // watch input value by passing the name of it

  return (
    // {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>  
      
      {/* include validation with required or other standard HTML validation rules */}
      <input name="Name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
      {errors.Name && <span>Name is required</span>}
      
      <input name="Email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
      {errors.Email && <span>Email is required</span>}
      
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
  )
};

export default Shipment;