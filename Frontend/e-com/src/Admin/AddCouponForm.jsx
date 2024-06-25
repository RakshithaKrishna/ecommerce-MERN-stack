import React, { useState } from 'react';
import AxiosApi from '../AxiosAPI';

const AddCouponForm = () => {
    const [couponData, setCouponData] = useState({
        code: '',
        discountAmount: '',
        Validity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData({
            ...couponData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosApi.post(`/admin/cupon`, couponData);
            console.log(response, "response");
        } catch (error) {
            console.log(error);
        }

        // Reset form fields after submission
        setCouponData({
            code: '',
            discountAmount: '',
            validity: ''
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded shadow-md ml-60 border border-zinc-200">
            <h2 className="text-2xl font-bold mb-4">Add Coupon Code</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-gray-700">Coupon Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={couponData.code}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="discountAmount" className="block text-gray-700">Discount Amount (%):</label>
                    <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        value={couponData.discountAmount}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="validity" className="block text-gray-700">Validity:</label>
                    <input
                        type="date"
                        id="validity"
                        name="Validity"
                        value={couponData.Validity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Coupon</button>
            </form>
        </div>
    );
};

export default AddCouponForm;
