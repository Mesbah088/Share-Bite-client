import React, { useEffect, useState } from 'react';
import FoodCard from '../../Shared/FoodCard';

export default function AvailableFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://share-bite-server-phi.vercel.app/foods?status=available')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch foods');
        return res.json();
      })
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading foods...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Foods</h1>

        {foods.length === 0 ? (
          <p className="text-center text-gray-600">No available foods found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map(food => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
