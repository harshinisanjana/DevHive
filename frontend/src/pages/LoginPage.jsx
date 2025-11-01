import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            await login(formData.email, formData.password);
            const returnPath = location.state?.from || '/';
            navigate(returnPath);
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
            <div className="hero-grid opacity-10"></div>
            <div className="hero-glow opacity-30"></div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-2xl mb-4 border border-zinc-800">
                        <Lock className="w-8 h-8 text-teal-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to continue building amazing projects</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-slate-500" />
                                </div>
                                <input 
                                    type="email"
                                    name="email"
                                    className="w-full rounded-xl bg-black border border-zinc-700 pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all" 
                                    placeholder="you@example.com" 
                                    value={formData.email} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-slate-500" />
                                </div>
                                <input 
                                    type="password"
                                    name="password"
                                    className="w-full rounded-xl bg-black border border-zinc-700 pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all" 
                                    placeholder="••••••••" 
                                    value={formData.password} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-white font-semibold hover:from-purple-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-between pt-4">
                            <Link to="/register" className="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1">
                                <UserPlus className="w-4 h-4" />
                                Create account
                            </Link>
                            <button type="button" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}