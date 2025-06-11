import  { useState } from 'react';
import { supabase } from './supabaseClient';

export default function ReviewForm() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert('You must be logged in to submit a review.');
      setLoading(false);
      return;
    }

    const userId = user.id;
    const fullName = user.user_metadata?.full_name || 'Anonymous';

    const { error } = await supabase.from('reviews').insert([
      {
        user_id: userId,
        name: fullName,
        comment,
        rating,
      },
    ]);

    if (error) {
      alert('Error submitting review');
      console.error(error);
    } else {
      alert('Review submitted!');
      setComment('');
      setRating(5);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="mb-2 p-2 w-full border rounded"
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="mb-2 p-2 w-full border rounded"
      >
        {[5, 4, 3, 2, 1].map((num) => (
          <option key={num} value={num}>
            {num} Stars
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
