import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider/authProvider';
import axios from 'axios';
import {
  Calendar, MapPin, User, Package, ArrowLeft,
  MessageSquare, Clock
} from 'lucide-react';
import { useContext } from 'react';

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [message, setMessage] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ fetch food by ID
  useEffect(() => {
  axios.get(`https://share-bite-server-phi.vercel.app/foods/${id}`)

      .then(res => setFood(res.data))
      .catch(err => {
        console.error('Food fetch error:', err);
        navigate('/available-foods');
      });
  }, [id, navigate]);

  if (!food) return <div className="text-center py-10">Loading...</div>;

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');

    setLoading(true);
    try {
      await axios.post(`https://share-bite-server-phi.vercel.app/requests`, {
        foodId: food._id,
        donorId: food.donorId,
        userId: user._id,
        userName: user.displayName,
        userEmail: user.email,
        message,
      });
      alert('Request sent successfully!');
      setShowRequestForm(false);
      setMessage('');
    } catch (err) {
      console.error('Request error:', err);
      alert('Failed to send request.');
    } finally {
      setLoading(false);
    }
  };

  const isExpiringSoon = new Date(food.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const canRequest = user && user._id !== food.donorId && food.status === 'available';

  return (
    <div className=" bg-gray-50 py-12">
      <div className=" mx-auto px-4">
        <button
          onClick={() => navigate('/available-foods')}
          className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Available Foods
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={food.image} alt={food.name} className="w-full h-96 object-cover" />
            </div>

            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold mb-2">{food.name}</h2>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {food.category}
              </span>

              <p className="mt-4 text-gray-600">{food.description}</p>

              <div className="mt-6 space-y-3 text-gray-700">
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2" /> Quantity: {food.quantity}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" /> Location: {food.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Expires: {new Date(food.expiryDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" /> Donor: {food.donorName}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Posted: {new Date(food.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-6">
                {canRequest ? (
                  showRequestForm ? (
                    <form onSubmit={handleRequest}>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="w-full border border-gray-300 rounded p-3 mb-4"
                        rows="4"
                        required
                      />
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="bg-gray-200 px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                        >
                          {loading ? 'Sending...' : 'Send Request'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowRequestForm(true)}
                      className="w-full bg-emerald-500 text-white px-4 py-3 rounded hover:bg-emerald-600"
                    >
                      <MessageSquare className="inline h-5 w-5 mr-2" />
                      Request This Food
                    </button>
                  )
                ) : user?._id === food.donorId ? (
                  <div className="bg-yellow-50 p-4 rounded border mt-4 text-yellow-800">
                    You shared this food. You can manage it from your dashboard.
                  </div>
                ) : !user ? (
                  <div className="bg-blue-50 p-4 rounded border mt-4 text-blue-800">
                    Please <button onClick={() => navigate('/login')} className="underline">sign in</button> to request.
                  </div>
                ) : (
                  <div className="bg-red-100 p-4 rounded text-red-800 mt-4">
                    This food is not available for request.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}