import React from 'react';
import ViewProducts from '../Admin/ViewProducts';
import Nav from './Nav';
import Footer from '../Home/Footer';

const ViewProduct = () => {
  const orders = [
    {
      id: 1,
      productName: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dui eget risus accumsan, eget suscipit libero eleifend.',
      quantity: 2,
      price: 25.99,
      status: 'Shipped',
      image: '2.png', // Dummy image URL
    },
    {
      id: 2,
      productName: 'Product 2',
      description: 'Nulla facilisi. Cras gravida orci vitae ex aliquet viverra.',
      quantity: 1,
      price: 19.99,
      status: 'Pending',
      image: '4.png', // Dummy image URL
    },
    {
      id: 3,
      productName: 'Product 3',
      description: 'Pellentesque sit amet ipsum nec elit condimentum luctus.',
      quantity: 3,
      price: 32.50,
      status: 'Delivered',
      image: '11.png', // Dummy image URL
    },
  ];

  return (
    <div className="">
     <Nav/>
     <div className=" min-h-screen">

    <div style={{ fontFamily: 'Arial, sans-serif', }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Orders</h1>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <img src={order.image} alt={order.productName} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
          <div>
            <h2>{order.productName}</h2>
            <p>{order.description}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price.toFixed(2)}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>
      ))}
    </div>
     </div>
    <Footer/>
    </div>
  );
};

export default ViewProduct
