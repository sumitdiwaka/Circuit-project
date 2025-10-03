import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import circuitService from '../features/circuits/circuitService';
import { FaTimes } from 'react-icons/fa';

function CircuitFormModal({ isOpen, onClose, onCircuitCreated, onCircuitUpdated, circuitToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    components: '',
    imageUrl: '',
  });

  const { title, description, components, imageUrl } = formData;
  const isEditMode = Boolean(circuitToEdit);

  useEffect(() => {
    // If a circuit is passed for editing, pre-fill the form
    if (isEditMode) {
      setFormData({
        title: circuitToEdit.title,
        description: circuitToEdit.description,
        components: circuitToEdit.components.join(', '),
        imageUrl: circuitToEdit.imageUrl,
      });
    } else {
      // Otherwise, ensure the form is clear
      setFormData({ title: '', description: '', components: '', imageUrl: '' });
    }
  }, [circuitToEdit, isEditMode]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const circuitData = {
      title,
      description,
      components: components.split(',').map(item => item.trim()),
      imageUrl,
    };

    try {
      if (isEditMode) {
        // Update existing circuit
        const updatedCircuit = await circuitService.updateCircuit(circuitToEdit._id, circuitData);
        onCircuitUpdated(updatedCircuit);
        toast.success('Circuit updated successfully!');
      } else {
        // Create new circuit
        const newCircuit = await circuitService.createCircuit(circuitData);
        onCircuitCreated(newCircuit);
        toast.success('Circuit created successfully!');
      }
      onClose();
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      toast.error(message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-secondary-dark rounded-2xl p-8 border border-white/10 shadow-2xl relative text-white"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">{isEditMode ? 'Edit Circuit' : 'Create a New Circuit'}</h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <input type="text" name="title" value={title} onChange={onChange} placeholder="Circuit Title (e.g., 555 Timer Flasher)" required className="w-full pl-4 pr-4 py-3 bg-primary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink" />
              <textarea name="description" value={description} onChange={onChange} placeholder="Description" required className="w-full pl-4 pr-4 py-3 bg-primary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink min-h-[100px]" />
              <input type="text" name="components" value={components} onChange={onChange} placeholder="Components (comma separated, e.g., LED, 1k Resistor)" required className="w-full pl-4 pr-4 py-3 bg-primary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink" />
              <input type="text" name="imageUrl" value={imageUrl} onChange={onChange} placeholder="Image URL (e.g., https://imgur.com/your-image.png)" required className="w-full pl-4 pr-4 py-3 bg-primary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink" />
              <button type="submit" className="w-full bg-gradient-to-r from-accent-pink to-accent-purple text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg">
                {isEditMode ? 'Save Changes' : 'Save Circuit'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CircuitFormModal;