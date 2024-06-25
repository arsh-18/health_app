import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async e => {
    e.preventDefault();
    setLoading(true);
    // console.log(id)
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Rating and review fields are required");
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating: rating,
          reviewText: reviewText
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setLoading(false);
      toast.success(result.message);
    } catch (err) {
      setLoading(false);
      toast.error(err.message || 'Something went wrong');
      console.error('Error submitting review:', err);
    }
  }

  return (
    <form onSubmit={handleSubmitReview}>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate the overall experience?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (hover || rating) ? "text-yellowColor" : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => { setRating(0); setHover(0) }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          Share your feedback or suggestions*
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor px-4 py-3 rounded-md w-full"
          rows="5"
          placeholder="Write your message"
          onChange={e => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button type='submit' className='btn'>
        {loading ? <HashLoader size={25} color='#fff' /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
