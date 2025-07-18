import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Package } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider/authProvider';
import { useContext } from 'react';

export default function ManageFoods() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load all foods from database
  useEffect(() => {
    axios.get('http://localhost:3000/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filter foods created by the current user
  const userFoods = foods.filter(food => food.donorEmail === user?.email);

  // Delete food item
  const deleteFood = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/foods/${id}`);
      setFoods(prevFoods => prevFoods.filter(f => f._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleDelete = (food) => {
    setSelectedFood(food);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedFood) {
      deleteFood(selectedFood._id);
      setShowDeleteModal(false);
      setSelectedFood(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'donated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen mt-5 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage My Foods</h1>
            <p className="text-gray-600 mt-2">Track and manage all your shared food items</p>
          </div>
          <Link
            to="/add-food"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Food</span>
          </Link>
        </div>

        {userFoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Foods Shared Yet</h3>
            <p className="text-gray-600 mb-6">
              Start sharing food with your community to make a difference.
            </p>
            <Link
              to="/add-food"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
            >
              Share Your First Food
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {userFoods.map((food) => (
              <div key={food._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                            {food.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full ${getStatusColor(food.status)}`}>
                            {food.status.charAt(0).toUpperCase() + food.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/food/${food._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(food)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{food.description}</p>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        <span>Quantity: {food.quantity}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{food.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Expires: {new Date(food.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Food Item</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedFood?.name}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
