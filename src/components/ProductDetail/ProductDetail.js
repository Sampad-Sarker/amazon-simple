import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail =() => {

    const {productKey} = useParams();   //`useParams` hook here to access  the dynamic pieces of the URL.
    console.log(productKey);

    const individualProductDetail = fakeData.find(element => element.key === productKey); //not using real data.stored fake data uses
    //console.log(individualProductDetail);
    return (
        <div>
            <h2>{productKey } details coming ..........</h2>
            
            {/*parameter name must be productItem,because in <Product> component
            already accepting parameter which  name is productItem as props from shop.js. if 
            another named parameter is tried to put ,it can not execute new 
            named parameter  */}

            {/* <Product productItem = {individualProductDetail}></Product> */}    

            {/* showAddToCartButton={false} use for conditional 
            ui rendering,parameter name must be same 
            as <Product> component.so have to use 
            showAddToCartButton as a parameter.
            This exlanation is same as above one */}
            <Product productItem = {individualProductDetail}  showAddToCartButton={false}></Product>
        </div>
    );
};
export default ProductDetail;  