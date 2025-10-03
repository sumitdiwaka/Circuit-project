const express = require('express');
const router = express.Router();
const {
  getCircuits,
  createCircuit,
  updateCircuit, 
  deleteCircuit,
} = require('../controllers/circuitController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCircuits).post(protect, createCircuit);


router.route('/:id').put(protect, updateCircuit).delete(protect, deleteCircuit);

module.exports = router;