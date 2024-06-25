import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Nav from './Nav';
import Footer from '../Home/Footer';
import MetaData from '../Home/MetaData';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the rating and feedback to your backend or perform any other action
    console.log('Submitted rating:', rating);
    console.log('Submitted feedback:', feedback);
  };

  return (
    <div className="">
      <MetaData title={"rating"} />
    <Nav/>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Rate your experience</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name='rating'
              />
            </div>
            <div className="mt-6">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={3}
                value={feedback}
                onChange={handleFeedbackChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Tell us about your experience"
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Rating;
