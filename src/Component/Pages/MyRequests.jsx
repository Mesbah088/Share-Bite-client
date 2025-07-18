
import { MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useFood } from '../../AuthProvider/FoodContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyRequests = () => {
  const { userRequests, fetchUserRequests } = useFood();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/requests/${id}`, { status: 'rejected' });
      toast.success('Request cancelled');
      fetchUserRequests();
    } catch (error) {
      toast.error('Failed to cancel request');
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/requests/${id}`, { status: 'completed' });
      toast.success('Marked as collected');
      fetchUserRequests();
    } catch (error) {
      toast.error('Failed to update request');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Food Requests</h1>
        <p className="text-gray-600">Track your food requests and their current status</p>
      </div>

      {userRequests.length > 0 ? (
        <div className="space-y-6">
          {userRequests.map((request) => (
            <div key={request._id} className="card p-6 shadow-md rounded-lg bg-white">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <img
                  src={request.foodImage}
                  alt={request.foodTitle}
                  className="w-full lg:w-24 h-48 lg:h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                      {request.foodTitle}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">
                    Requested from <span className="font-medium">{request.donorName}</span>
                  </p>
                  <p className="text-gray-700 mb-3 italic">"{request.message}"</p>
                  <p className="text-sm text-gray-500">
                    Requested on {formatDate(request.requestDate)}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 lg:w-32">
                  {request.status === 'pending' && (
                    <button onClick={() => handleCancel(request._id)} className="btn-outline text-sm">
                      Cancel Request
                    </button>
                  )}
                  {request.status === 'approved' && (
                    <button onClick={() => handleComplete(request._id)} className="btn-primary text-sm">
                      Mark as Collected
                    </button>
                  )}
                  <button className="btn-outline text-sm">Message Donor</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't made any food requests yet. Browse available food items to get started.
            </p>
            <a href="/foods" className="btn-primary">
              Browse Available Foods
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
