import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { FiLogIn } from 'react-icons/fi';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-2xl border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-700 mb-2 font-semibold">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
              required 
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-2 font-semibold">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
              required 
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
          >
            <FiLogIn />
            <span>Login</span>
          </button>
        </form>
        <p className="text-center mt-6 text-slate-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register here</Link></p>
      </div>
    </div>
  );
};

export default StudentLogin;