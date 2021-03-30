import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        const product = {};
        fetch('https://secret-savannah-26127.herokuapp.com/addProduct',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
        
    }
    return (
        <div>
        <form action="">
        <p><span>Name: </span><input type="text"/></p>
        <p><span>Price: </span><input type="text"/></p>
        <p><span>Quantity: </span><input type="text"/></p>
        <p><span>Upload Image: </span><input type="file"/></p>
        <button onClick = {handleAddProduct}>Add Products</button>
        </form>
            
        </div>
    );
};

export default Inventory;