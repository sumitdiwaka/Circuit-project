import { Link, useNavigate } from 'react-router-dom';
import authService from '../features/auth/authService';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaMicrochip } from 'react-icons/fa';

function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <header className='p-4'>
            <div className='container mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10'>
                <Link to='/' className='flex items-center space-x-3'>
                    <FaMicrochip className='text-3xl text-accent-pink' />
                    <span className='text-2xl font-bold text-white'>CircuitRepo</span>
                </Link>
                <ul className='flex items-center space-x-6 text-white'>
                    {user ? (
                        <li>
                            <button onClick={onLogout} className='flex items-center space-x-2 hover:text-accent-pink transition-colors'>
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to='/login' className='flex items-center space-x-2 hover:text-accent-pink transition-colors'>
                                    <FaSignInAlt />
                                    <span>Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/register' className='flex items-center space-x-2 hover:text-accent-pink transition-colors'>
                                    <FaUser />
                                    <span>Register</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
export default Header;