import React, { useState } from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import { useLocation } from 'react-router-dom';
import AxiosApi from '../AxiosAPI';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Home/MetaData';


function PaymentPage() {
    const location = useLocation();
    const data = location.state;
    console.log(data, 'shipping');

    const NavigateTo = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('online');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const customer = JSON.parse(sessionStorage.getItem('customer'));
    const product = JSON.parse(localStorage.getItem('products'));
    const price = JSON.parse(localStorage.getItem('totalPrice'));
    // const cuponid = JSON.parse(localStorage.getItem("cuponid"));
    const cuponid = localStorage.getItem("cuponid") ? JSON.parse(localStorage.getItem("cuponid")) : null;

    
    console.log(product);

    const productid = product.map((item) => item._id);

    const onToken = async (token) => {
        try {
            await bookorder(token.id);
        } catch (error) {
            console.log(error);
        }
    };

    const bookorder = async () => {
        try {
            let response;
            if (paymentMethod === 'online') {
                // Send a request to your server to confirm the payment intent
                response = await AxiosApi.post(`/user/order/${customer._id}`, {
                    client_secret: "pi_3OzbqZSIUrd5GMmR0BFYCjJa_secret_wWe3AunSoNeahldjDRn3rrU3N",
                    payment_method: paymentMethod,
                  shippingAddress: data.address,
                  fullname: data.fullName,
                  email: data.email,
                  city: data.city,
                  state: data.state,
                  postalCode: data.zipcode,
                  country: data.country,
                  phoneNumber: data.mobilenumber,
                  payment: paymentMethod,
                  cuponid:cuponid ? cuponid :undefined
                   
              });
              NavigateTo('/conformorders')
            } else if (paymentMethod === 'cash_on_delivery') {
                response = await AxiosApi.post(`/user/order/${customer._id}`, {
                    shippingAddress: data.address,
                    fullname: data.fullName,
                    email: data.email,
                    city: data.city,
                    state: data.state,
                    postalCode: data.zipcode,
                    country: data.country,
                    phoneNumber: data.mobilenumber,
                    payment: paymentMethod,
                    cuponid:cuponid ?cuponid : undefined
                });
            }
            console.log(response);
            localStorage.removeItem('products');
             NavigateTo('/conformorders')
            
        } catch (error) {
            console.log(error);
            NavigateTo('/reject')

        }
    };

    return (
        <div className="">
            <MetaData title={"Payment"} />
            <Nav />
            <div className="container mx-auto mt-8 min-h-screen">




            {/* product detils and shipping detils */}
                <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Payment Method</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Payment Method:</label>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="paymentMethod"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <span className="ml-2">Online</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="paymentMethod"
                                    value="cash_on_delivery"
                                    checked={paymentMethod === 'cash_on_delivery'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <span className="ml-2">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                    {paymentMethod === 'online' && (
                        <StripeCheckout
                            token={onToken}
                            stripeKey="pk_test_51OWuXGSIUrd5GMmRMcF46q515tuc6awIkrOqvWJu0PHaLMyaRCgG8sLrr8rT7wOkB3UQU5ZDVMNvtQl00xIA7Iez00D3iXL6iC"
                            amount={price * 100} // Amount in cents
                            currency="USD"
                        >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Pay with Card
                            </button>
                        </StripeCheckout>
                    )}
                    {paymentMethod === 'cash_on_delivery' && (
                        <button
                            onClick={bookorder}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Order Product
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentPage;
