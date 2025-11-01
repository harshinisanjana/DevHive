import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Plus, Users, Eye, Edit, Trash2, Calendar, User, Mail } from 'lucide-react';

export default function MyProjectsPage() {
	const { api, user } = useAuth();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Use placeholder data for demo
		const sampleProjects = [
			{
				id: 1,
				owner_id: user?.id || 1,
				title: 'DevHive Landing Revamp',
				description: 'Modernize the landing page with Tailwind and animations.',
				technologies: ['React', 'Tailwind', 'Framer Motion'],
				roles: ['Frontend Developer'],
				created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
			},
			{
				id: 2,
				owner_id: user?.id || 1,
				title: 'API Gateway Service',
				description: 'Lightweight gateway for routing and auth.',
				technologies: ['Node', 'Express', 'JWT'],
				roles: ['Backend Developer'],
				created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
			}
		];
		
		setProjects(sampleProjects);
		setLoading(false);
	}, [user]);

	if (loading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-slate-400">Loading your projects...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-slate-100 px-4 py-8" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
			{/* Background effects */}
			<div className="pointer-events-none fixed inset-0">
				<div className="absolute inset-0" style={{
					backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.05) 1px, transparent 0)',
					backgroundSize: '40px 40px'
				}} />
			</div>

			<div className="relative max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
						<p className="text-slate-400">Manage your projects and view applications</p>
					</div>
					<Link 
						to="/projects/new" 
						className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
					>
						<Plus className="w-4 h-4" />
						Create New Project
					</Link>
				</div>

				{/* Projects List */}
				{projects.length === 0 ? (
					<div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center">
						<div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Plus className="w-10 h-10 text-teal-400" />
						</div>
						<h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
						<p className="text-slate-400 mb-6">Create your first project to start collaborating with developers!</p>
						<Link 
							to="/projects/new" 
							className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
						>
							<Plus className="w-4 h-4" />
							Create Your First Project
						</Link>
					</div>
				) : (
					<div className="grid gap-6">
						{projects.map(project => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function ProjectCard({ project }) {
	const { api } = useAuth();
	const [applications, setApplications] = useState([]);
	const [loadingApps, setLoadingApps] = useState(false);

	useEffect(() => {
		// Use placeholder applications for demo
		const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
		const projectApps = demoApps.filter(app => app.project_id == project.id);
		
		// Add some sample applications for demo
		const sampleApps = [
			{
				id: 101,
				project_id: project.id,
				applicant_id: 2,
				applicant_name: 'John Developer',
				applicant_email: 'john@example.com',
				message: 'I have 5 years of experience with React and would love to contribute!',
				status: 'pending',
				created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
			},
			{
				id: 102,
				project_id: project.id,
				applicant_id: 3,
				applicant_name: 'Sarah Designer',
				applicant_email: 'sarah@example.com',
				message: 'Experienced UI/UX designer with strong portfolio.',
				status: 'accepted',
				created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
			}
		];
		
		setApplications([...projectApps, ...sampleApps]);
		setLoadingApps(false);
	}, [project.id]);

	const pendingCount = applications.filter(app => app.status === 'pending').length;
	const acceptedCount = applications.filter(app => app.status === 'accepted').length;

	return (
		<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1 min-w-0">
					<Link 
						to={`/projects/${project.id}`}
						className="text-xl font-semibold text-white hover:text-teal-400 transition-colors block mb-2"
					>
						{project.title}
					</Link>
					<p className="text-sm text-slate-300 line-clamp-2 mb-3">{project.description}</p>
					<div className="flex items-center gap-4 text-xs text-slate-500">
						<div className="flex items-center gap-1">
							<Calendar className="w-3 h-3" />
							<span>Created {new Date(project.created_at).toLocaleDateString()}</span>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 ml-4">
					<Link 
						to={`/projects/${project.id}`}
						className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-400 hover:text-white transition-colors"
						title="View Project"
					>
						<Eye className="w-4 h-4" />
					</Link>
					<button 
						className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-400 hover:text-white transition-colors"
						title="Edit Project"
					>
						<Edit className="w-4 h-4" />
					</button>
					<button 
						className="p-2 rounded-lg bg-zinc-800 hover:bg-red-700 text-slate-400 hover:text-white transition-colors"
						title="Delete Project"
					>
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Technologies */}
			<div className="mb-4 flex flex-wrap gap-1.5">
				{(() => {
					let techs = [];
					if (Array.isArray(project.technologies)) techs = project.technologies;
					else if (typeof project.technologies === 'string') {
						try { techs = JSON.parse(project.technologies); } catch {}
					}
					return (techs || []).slice(0, 6).map(t => (
						<span key={t} className="rounded-full border border-slate-700/70 bg-slate-900/60 px-2.5 py-0.5 text-xs text-slate-300">
							{t}
						</span>
					));
				})()}
			</div>

			{/* Applications Summary */}
			<div className="border-t border-zinc-800 pt-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Users className="w-4 h-4 text-slate-400" />
						<span className="text-sm text-slate-400">Applications</span>
					</div>
					<div className="flex items-center gap-4 text-sm">
						{loadingApps ? (
							<span className="text-slate-500">Loading...</span>
						) : (
							<>
								<span className="text-amber-400">{pendingCount} pending</span>
								<span className="text-emerald-400">{acceptedCount} accepted</span>
								<span className="text-slate-500">{applications.length} total</span>
							</>
						)}
					</div>
				</div>

				{/* Recent Applications Preview */}
				{applications.length > 0 && (
					<div className="mt-3 space-y-2">
						{applications.slice(0, 3).map(app => (
							<div key={app.id} className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
										<User className="w-4 h-4 text-teal-400" />
									</div>
									<div>
										<div className="text-sm font-medium text-white">{app.applicant_name}</div>
										<div className="text-xs text-slate-400 flex items-center gap-1">
											<Mail className="w-3 h-3" />
											{app.applicant_email}
										</div>
									</div>
								</div>
								<div className={`text-xs px-2 py-1 rounded-full ${
									app.status === 'pending' ? 'bg-amber-900/20 text-amber-300' :
									app.status === 'accepted' ? 'bg-emerald-900/20 text-emerald-300' :
									'bg-rose-900/20 text-rose-300'
								}`}>
									{app.status}
								</div>
							</div>
						))}
						{applications.length > 3 && (
							<div className="text-center">
								<Link 
									to={`/projects/${project.id}`}
									className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
								>
									View all {applications.length} applications →
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
