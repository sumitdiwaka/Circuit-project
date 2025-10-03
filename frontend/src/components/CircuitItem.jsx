import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import FaPencilAlt
import { motion } from 'framer-motion';

// Add on Edit to the props
function CircuitItem({ circuit, onDelete, onEdit }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary-dark/50 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col justify-between"
    >
      <div>
        <img src={circuit.imageUrl} alt={circuit.title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-2xl font-bold mb-2">{circuit.title}</h3>
        <p className="text-gray-400 mb-4">{circuit.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {circuit.components.map((component, index) => (
            <span key={index} className="bg-primary-dark text-accent-pink text-xs font-semibold px-2.5 py-1 rounded-full">
              {component}
            </span>
          ))}
        </div>
      </div>
      <div className="self-end flex items-center space-x-4">
        {/* Edit Button */}
        <button 
          onClick={() => onEdit(circuit)} 
          className="text-gray-400 hover:text-accent-purple transition-colors"
        >
          <FaPencilAlt size={18} />
        </button>
        {/* Delete Button */}
        <button 
          onClick={() => onDelete(circuit._id)} 
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default CircuitItem;