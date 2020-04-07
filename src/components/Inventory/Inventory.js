import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const addInventoryBtn =()=>{

        const product = fakeData[0];
        console.log("before add",product);

        fetch("https://shrouded-ridge-17870.herokuapp.com/addProduct",{   //server address

            method:"POST",
            body:JSON.stringify(fakeData),
            headers:{"Content-type":"application/json"}
        })
        .then(res=>res.json())
        .then(data=>{console.log("post successful",data)})

    }
    return (
        <div>
            <h1>Add inventory to sell more.......</h1>

            {/* <button onClick={addInventoryBtn}>add inventory</button> */}
        </div>
    );
};

export default Inventory;