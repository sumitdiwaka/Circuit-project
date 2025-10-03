const Circuit = require('../models/Circuit');


const createCircuit = async (req, res) => {
  const { title, description, components, imageUrl } = req.body;

  if (!title || !description || !imageUrl) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  const circuit = await Circuit.create({
    title,
    description,
    components,
    imageUrl,
    user: req.user.id, // Link the circuit to the logged-in user
  });

  res.status(201).json(circuit);
};

const getCircuits = async (req, res) => {
  // We have access to req.user from our 'protect' middleware
  const circuits = await Circuit.find({ user: req.user.id });
  res.status(201).json(circuits);
};


const updateCircuit = async (req, res) => {
  const circuit = await Circuit.findById(req.params.id);

  if (!circuit) {
    return res.status(404).json({ message: 'Circuit not found' });
  }

  // Security Check: Ensure the logged-in user owns the circuit
  if (circuit.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedCircuit = await Circuit.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the modified document
  });

  res.status(201).json(updatedCircuit);
};

const deleteCircuit = async (req, res) => {
  const circuit = await Circuit.findById(req.params.id);

  if (!circuit) {
    return res.status(404).json({ message: 'Circuit not found' });
  }

  // Security Check: Ensure the logged-in user owns the circuit
  if (circuit.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await circuit.deleteOne(); // Mongoose v6+ uses deleteOne()

  res.status(201).json({ id: req.params.id, message: 'Circuit removed' });
};


module.exports = {
  getCircuits,
  createCircuit,
  updateCircuit,
  deleteCircuit,
};