import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/circuits/`

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

// Create a new circuit
const createCircuit = async (circuitData) => {
  const response = await axios.post(API_URL, circuitData, getAuthHeaders());
  return response.data;
};

// Get user circuits
const getCircuits = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};
// Update a circuit
const updateCircuit = async (circuitId, circuitData) => {
  const response = await axios.put(API_URL + circuitId, circuitData, getAuthHeaders());
  return response.data;
};

// Delete a circuit
const deleteCircuit = async (circuitId) => {
  const response = await axios.delete(API_URL + circuitId, getAuthHeaders());
  return response.data;
};

const circuitService = {
  createCircuit,
  getCircuits,
  updateCircuit,
  deleteCircuit,
};

export default circuitService;