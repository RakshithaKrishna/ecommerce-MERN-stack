import React, { useState } from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, image: '2.png', quantity: 1 },
    { id: 2, name: 'Product 2', price: 15, image: '5.png', quantity: 1 },
    { id: 3, name: 'Product 3', price: 20, image: '8.png', quantity: 1 }
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleNextButtonClick = () => {
    // Handle next button click logic here
    // For demonstration purposes, just console logging
    console.log('Next button clicked!');
  };

  return (
    <div className="">
     <Nav/>
    <div className=' min-h-screen'>

      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                {item.name}
              </td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <strong>Total Amount: ${totalAmount}</strong>
      </div>
      <button onClick={calculateTotalAmount}>Calculate Total Amount</button>
      <button onClick={handleNextButtonClick}>Next</button>
    </div>
    <Footer/>
    </div>
  );
};

export default CartPage;
