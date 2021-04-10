import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState('');
    useEffect(()=>{
        fetch('https://secret-savannah-26127.herokuapp.com/products?search=' + search)
        .then(res =>res.json())
        .then(data =>setProducts(data))
    },[search])
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(products,productKeys)
        fetch('https://secret-savannah-26127.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res =>res.json())
        .then(data => setCart(data))
    }, [])

    const handleSearch = (event) =>{
        setSearch(event.target.value);
        // console.log(search);
    }

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            <input style={{ height:'40px', width:'250px'}} type="text" onBlur={handleSearch} placeholder = 'search' className="product-search"/>
            {
            products.length === 0 && <p style = {{color: 'green',textAlign: 'center'}}><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner></p>
            }
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
               </Cart>
            </div>
            
        </div>
    );
};

export default Shop;