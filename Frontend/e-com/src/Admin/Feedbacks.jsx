import React from 'react';

const Feedbacks = () => {
    // Dummy data for feedbacks
    const feedbacksData = [
        {
            id: 1,
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            productName: 'Premium Quality Dust Watch',
            productImage: '11.png', // Add product image URL
            feedback: 'The product exceeded my expectations. Highly recommended!',
            rating: 5
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            productName: 'Diamond Platinum Watch',
            productImage: '12.png', // Add product image URL
            feedback: 'Nice product, but delivery was a bit slow.',
            rating: 4
        },
        {
            id: 3,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            productName: 'Diamond Platinum Watch',
            productImage: '12.png', // Add product image URL
            feedback: 'Nice product, but delivery was a bit slow.',
            rating: 4
        },
        {
            id: 4,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            productName: 'Diamond Platinum Watch',
            productImage: '12.png', // Add product image URL
            feedback: 'Nice product, but delivery was a bit slow.',
            rating: 4
        },
        {
            id: 5,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            productName: 'Diamond Platinum Watch',
            productImage: '12.png', // Add product image URL
            feedback: 'Nice product, but delivery was a bit slow.',
            rating: 4
        },
        // Add more dummy feedbacks as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-h-96">
            <h1 className="text-2xl font-semibold mb-4">Admin View Feedbacks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacksData.map(feedback => (
                    <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">{feedback.customerName}</h2>
                            <p className="text-gray-600">{feedback.customerEmail}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">{feedback.productName}</h3>
                            <img src={feedback.productImage} alt={feedback.productName} className="w-full rounded-lg shadow-md mb-2 h-52 object-cover" />
                            <p className="text-gray-600">{feedback.feedback}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold mr-2">{`Rating: ${feedback.rating}/5`}</p>
                            <div className="flex">
                                {[...Array(feedback.rating)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-yellow-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
