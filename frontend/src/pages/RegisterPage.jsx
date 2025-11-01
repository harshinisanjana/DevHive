import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			await register(name, email, password);
			const next = search.get('next') || '/projects';
			navigate(next);
		} catch (err) {
			setError('Registration failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-black flex items-center justify-center px-4" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
			{/* Background */}
			<div className="pointer-events-none fixed inset-0">
				<div className="absolute inset-0" style={{
					backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.05) 1px, transparent 0)',
					backgroundSize: '40px 40px'
				}} />
				<div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-purple-500/5" />
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl mb-4">
						<UserPlus className="w-8 h-8 text-purple-400" />
					</div>
					<h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
					<p className="text-slate-400 text-sm">Join the community and start collaborating</p>
				</div>

				{/* Form Card */}
				<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm text-slate-400 mb-2">Name</label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
								<input 
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 transition-colors" 
									placeholder="Enter your name" 
									value={name} 
									onChange={e=>setName(e.target.value)}
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm text-slate-400 mb-2">Email</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
								<input 
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 transition-colors" 
									placeholder="Enter your email" 
									type="email" 
									value={email} 
									onChange={e=>setEmail(e.target.value)}
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm text-slate-400 mb-2">Password</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
								<input 
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 transition-colors" 
									placeholder="Create a password" 
									type="password" 
									value={password} 
									onChange={e=>setPassword(e.target.value)}
									required
								/>
							</div>
						</div>

						{error && (
							<div className="bg-red-950/50 border border-red-800/50 rounded-xl p-3 text-sm text-red-300">
								{error}
							</div>
						)}

						<button 
							disabled={loading} 
							className="group w-full rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed px-6 py-3 font-semibold text-white transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center gap-2"
						>
							{loading ? (
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							) : (
								<>
									Register
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
								</>
							)}
						</button>
					</form>
				</div>

				{/* Footer */}
				<p className="text-center text-sm text-slate-400 mt-6">
					Already have an account?{' '}
					<Link className="text-teal-400 hover:text-teal-300 font-medium transition-colors" to="/login">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}