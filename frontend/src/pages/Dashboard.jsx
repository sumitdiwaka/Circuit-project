import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import CircuitFormModal from '../components/CircuitFormModal';
import CircuitItem from '../components/CircuitItem';
import Spinner from '../components/Spinner';
import circuitService from '../features/circuits/circuitService';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [circuits, setCircuits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [circuitToEdit, setCircuitToEdit] = useState(null); // State for the circuit being edited

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCircuits = async () => {
            try {
                const data = await circuitService.getCircuits();
                setCircuits(data);
            } catch (error) {
                toast.error('Failed to fetch circuits.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCircuits();
    }, [user, navigate]);

    const openModalForCreate = () => {
        setCircuitToEdit(null); // Ensure we are in "create" mode
        setIsModalOpen(true);
    };

    const openModalForEdit = (circuit) => {
        setCircuitToEdit(circuit); // Set the circuit to edit
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCircuitToEdit(null); // Clear edit state on close
    };


    const handleCircuitCreated = (newCircuit) => {
        setCircuits((prevCircuits) => [newCircuit, ...prevCircuits]);
    };

    const handleCircuitUpdated = (updatedCircuit) => {
        setCircuits(circuits.map((c) => c._id === updatedCircuit._id ? updatedCircuit : c));
    };

    const handleDelete = async (circuitId) => {
        if (window.confirm('Are you sure you want to delete this circuit?')) {
            try {
                await circuitService.deleteCircuit(circuitId);
                setCircuits(circuits.filter((circuit) => circuit._id !== circuitId));
                toast.success('Circuit deleted.');
            } catch (error) {
                toast.error('Failed to delete circuit.');
            }
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <Spinner />;
        }
        if (circuits.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {circuits.map((circuit) => (
                            <CircuitItem key={circuit._id} circuit={circuit} onDelete={handleDelete} onEdit={openModalForEdit} />
                        ))}
                    </AnimatePresence>
                </div>
            );
        }
        return (
            <div className="text-center text-gray-400 mt-20">
                <p>You haven't created any circuits yet.</p>
                <p>Click the button above to get started!</p>
            </div>
        );
    };

    return (
        <>
            <CircuitFormModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onCircuitCreated={handleCircuitCreated}
                onCircuitUpdated={handleCircuitUpdated}
                circuitToEdit={circuitToEdit}
            />

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="container mx-auto p-4 text-white"
            >
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <h1 className="text-4xl font-bold">Welcome, {user?.username}</h1>
                    <button 
                        onClick={openModalForCreate}
                        className="flex items-center space-x-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white py-3 px-6 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg"
                    >
                        <FaPlus />
                        <span>Create New Circuit</span>
                    </button>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[500px]">
                    <h2 className="text-2xl font-semibold mb-6">Your Circuits</h2>
                    {renderContent()}
                </div>
            </motion.div>
        </>
    );
}

export default Dashboard;