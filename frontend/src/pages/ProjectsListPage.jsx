import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { Plus, Rocket } from 'lucide-react';

export default function ProjectsListPage() {
	const { api } = useAuth();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		api.get('/projects').then(({ data }) => { if (active) setProjects(data); }).finally(() => setLoading(false));
		return () => { active = false; };
	}, [api]);

	if (loading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
				<div className="text-slate-400">Loading projects...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-slate-200" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
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

			<div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">Browse Projects</h1>
						<p className="text-slate-400 text-sm">Discover exciting projects and find your next collaboration</p>
					</div>
					<Link 
						to="/projects/new" 
						className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
					>
						<Plus className="w-4 h-4" />
						Start a Project
					</Link>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects.map(p => (
						<Link 
							key={p.id} 
							to={`/projects/${p.id}`} 
							className="group block bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 transition-all hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20"
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex-1 min-w-0">
									<h3 className="text-lg font-semibold text-white truncate mb-1 group-hover:text-teal-400 transition-colors">{p.title}</h3>
									<div className="flex items-center gap-1.5 text-xs text-slate-400">
										<Rocket className="w-3 h-3" />
										<span>by {p.owner_name}</span>
									</div>
								</div>
							</div>

							<p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">{p.description}</p>

							{/* Technologies */}
							<div className="mb-3 flex flex-wrap gap-1.5">
								{(() => {
									let techs = [];
									if (Array.isArray(p.technologies)) techs = p.technologies;
									else if (typeof p.technologies === 'string') {
										try { techs = JSON.parse(p.technologies); } catch {}
									}
									return (techs || []).slice(0,6).map(t => (
										<span key={t} className="rounded-full border border-slate-700/70 bg-slate-900/60 px-2.5 py-0.5 text-xs text-slate-300">
											{t}
										</span>
									));
								})()}
							</div>

							{/* Roles */}
							<div className="flex flex-wrap gap-1.5">
								{(() => {
									let roles = [];
									if (Array.isArray(p.roles)) roles = p.roles;
									else if (typeof p.roles === 'string') {
										try { roles = JSON.parse(p.roles); } catch {}
									}
									return (roles || []).slice(0,4).map(r => (
										<span key={r} className="rounded-full border border-teal-700/40 bg-teal-900/30 px-2.5 py-0.5 text-xs text-teal-300">
											{r}
										</span>
									));
								})()}
							</div>
						</Link>
					))}
				</div>

				{projects.length === 0 && (
					<div className="text-center py-16">
						<div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Rocket className="w-10 h-10 text-teal-400" />
						</div>
						<h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
						<p className="text-slate-400 mb-6">Be the first to start a project!</p>
						<Link 
							to="/projects/new" 
							className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
						>
							<Plus className="w-4 h-4" />
							Start a Project
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}