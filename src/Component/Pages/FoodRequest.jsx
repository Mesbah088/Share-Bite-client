import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/authProvider";
import { useFood } from "../../AuthProvider/FoodContext";
import { MessageSquare, Calendar, User, Package, Check, X } from "lucide-react";

export default function FoodRequests() {
  const { user } = useContext(AuthContext);
  const { foods, requests, updateRequest, loading } = useFood();


  const userRequests = requests.filter((req) => req.requesterId === user.id);

  const requestsForUserFoods = requests.filter((req) => {
    const food = foods.find((f) => f.id === req.foodId);
    return food && food.donorId === user.id;
  });

  const handleRequestAction = (requestId, action) => {
    updateRequest(requestId, action);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Food Requests</h1>
          <p className="text-gray-600 mt-2">
            Manage your food requests and incoming requests
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Requests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Requests
            </h2>

            {userRequests.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  You haven't made any food requests yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.map((request) => {
                  const food = foods.find((f) => f.id === request.foodId);
                  return (
                    <div
                      key={request.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {food?.name || "Food Not Found"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            From: {food?.donorName || "Unknown"}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {request.message}
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          Requested on{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Incoming Requests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Incoming Requests
            </h2>

            {requestsForUserFoods.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  No one has requested your food items yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requestsForUserFoods.map((request) => {
                  const food = foods.find((f) => f.id === request.foodId);
                  return (
                    <div
                      key={request.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {food?.name || "Food Not Found"}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span>{request.requesterName}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {request.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            Requested on{" "}
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleRequestAction(request.id, "approved")
                              }
                              className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm"
                              disabled={loading}
                            >
                              <Check className="h-3 w-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() =>
                                handleRequestAction(request.id, "rejected")
                              }
                              className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                              disabled={loading}
                            >
                              <X className="h-3 w-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
