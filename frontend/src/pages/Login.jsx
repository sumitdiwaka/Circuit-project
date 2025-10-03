import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../features/auth/authService';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate();
    const onChange = (e) => { setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value })) };
    const onSubmit = async (e) => { e.preventDefault(); try { await authService.login({ email, password }); navigate('/'); toast.success('Welcome back!'); } catch (error) { const message = (error.response?.data?.message) || error.message || error.toString(); toast.error(message); } };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-[calc(100vh-120px)] flex items-center justify-center">
            <div className="w-full max-w-md bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
                <p className="text-center text-gray-400 mb-8">Sign in to access your circuits.</p>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="relative">
                        <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="w-full pl-12 pr-4 py-3 bg-secondary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="w-full pl-12 pr-4 py-3 bg-secondary-dark text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-accent-pink to-accent-purple text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg">
                        Login
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="mx-4 text-gray-400">Or continue with</span>
                    <hr className="flex-grow border-gray-600" />
                </div>
                <button className="w-full flex items-center justify-center space-x-3 bg-secondary-dark text-white py-3 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    <FaGoogle />
                    <span>Sign in with Google</span>
                </button>
                <p className="text-center text-gray-400 mt-8">
                    Don't have an account? <Link to="/register" className="font-semibold text-accent-pink hover:underline">Sign up</Link>
                </p>
            </div>
        </motion.div>
    );
}
export default Login;