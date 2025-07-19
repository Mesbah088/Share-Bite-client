import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const API_BASE = 'https://share-bite-server-phi.vercel.app/'; 


  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/foods`);
      setFoods(res.data);
    } catch (error) {
      console.error('Failed to fetch foods:', error);
    } finally {
      setLoading(false);
    }
  };

  // Requests fetch
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/requests`);
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add food
  const addFood = async (newFood) => {
    try {
      const res = await axios.post(`${API_BASE}/foods`, newFood);
      setFoods(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Failed to add food:', error);
    }
  };

  // Add request
  const addRequest = async (newRequest) => {
    try {
      const res = await axios.post(`${API_BASE}/requests`, newRequest);
      setRequests(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Failed to add request:', error);
    }
  };

  // Update request status
  const updateRequest = async (requestId, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE}/requests/${requestId}`, { status: newStatus });
      setRequests(prev => prev.map(r => r._id === requestId ? res.data : r));
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchRequests();
  }, []);

  return (
    <FoodContext.Provider value={{
      foods,
      requests,
      loading,
      addFood,
      addRequest,
      updateRequest,
      fetchFoods,
      fetchRequests
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
