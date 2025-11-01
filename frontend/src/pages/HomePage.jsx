import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Code2, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function HomePage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	return (
		<div className="min-h-screen bg-black" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
			{/* background aesthetic */}
			<div className="hero-grid opacity-10"></div>
			<div className="hero-glow opacity-30"></div>

			<div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:py-20 md:py-28">
				<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm px-4 py-2 text-sm text-slate-300 shadow-lg shadow-black/50">
					<Rocket className="w-4 h-4 text-teal-400" />
					<span className="text-teal-400">Connect. Collaborate. Create.</span>
				</div>

				<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
					<span className="block text-white mb-2">Build Amazing</span>
					<span className="block">
						<span className="text-white">Projects </span>
						<span className="bg-gradient-to-r from-purple-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Together</span>
					</span>
				</h1>

				<p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
					Join a community of developers collaborating on real-world projects. Find teammates,
					gain experience, and build your portfolio.
				</p>

				<div className="mt-10 flex flex-wrap items-center gap-4">
					<button 
						onClick={() => navigate('/projects')}
						className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
					>
						<Code2 className="w-5 h-5" />
						Explore Projects
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
					</button>
					<button 
						onClick={() => user ? navigate('/projects/new') : navigate('/login', { state: { from: '/projects/new' } })}
						className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-slate-200 hover:border-teal-500 hover:text-teal-400 hover:bg-zinc-900 transition-all"
					>
						<Rocket className="w-5 h-5" />
						Start a Project
					</button>
				</div>

				{/* Feature Cards */}
				<div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-teal-500/50 transition-all">
						<div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
							<Code2 className="w-6 h-6 text-teal-400" />
						</div>
						<h3 className="text-lg font-semibold text-white mb-2">Real Projects</h3>
						<p className="text-sm text-slate-400">Work on meaningful projects that solve real problems and build your portfolio.</p>
					</div>

					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
						<div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-white mb-2">Find Your Team</h3>
						<p className="text-sm text-slate-400">Connect with developers who share your passion and complement your skills.</p>
					</div>

					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
						<div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
							<Rocket className="w-6 h-6 text-cyan-400" />
						</div>
						<h3 className="text-lg font-semibold text-white mb-2">Grow Together</h3>
						<p className="text-sm text-slate-400">Learn from peers, share knowledge, and accelerate your development journey.</p>
					</div>
				</div>
			</div>
		</div>
	);