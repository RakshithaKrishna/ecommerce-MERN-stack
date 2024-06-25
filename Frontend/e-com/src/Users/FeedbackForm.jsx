import React, { useState } from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import { useLocation } from 'react-router-dom';
import AxiosApi from '../AxiosAPI';
import { toast } from 'react-toastify';

const FeedbackForm = () => {

  const location = useLocation()
  const data = location.state


  const productid = data.products[0]._id
 

  const Users = JSON.parse(sessionStorage.getItem('customer'))

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
     try{
      const responce = await AxiosApi.post(`/user/feedback/${Users._id}/${productid}/${data._id}`,{rating:rating,feeback:feedback})
      console.log(responce,"post responce")
      toast.success(responce.data.message)


      
    }catch(error){
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
    
    setRating(0)
    setFeedback("")
  };

  return (
    <div className="">
     <Nav/>
     <div className="min-h-screen">

    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-2 border border-zinc-300 ">
      <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <span className="text-gray-600 mr-2">Rate us:</span>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              required
              onClick={() => handleRatingChange(value)}
              className={`text-2xl ${value <= rating ? 'text-yellow-500' : 'text-gray-400'} focus:outline-none`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-600 mb-2">Feedback:</label>
          <textarea
            id="feedback"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
     </div>
    <Footer/>
    </div>
  );
};

export default FeedbackForm;
