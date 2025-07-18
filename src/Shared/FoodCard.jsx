import React from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, User, Package } from 'lucide-react';

export default function FoodCard({ food }) {

  const isExpiringSoon = new Date(food.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            food.status === 'available' ? 'bg-green-100 text-green-800' :
            food.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {food.status.charAt(0).toUpperCase() + food.status.slice(1)}
          </span>
        </div>
        {isExpiringSoon && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
              Expires Soon
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {food.name}
          </h3>
          <span className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded-full">
            {food.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {food.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Package className="h-4 w-4 mr-2" />
            <span>Quantity: {food.quantity}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{food.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Expires: {new Date(food.expiryDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            <span>By {food.donorName}</span>
          </div>
        </div>
        
        <Link 
          to={`/food/${food._id}`} 
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors font-medium text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
