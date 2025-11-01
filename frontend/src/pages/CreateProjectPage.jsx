import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Rocket, Code2, Users, Zap } from 'lucide-react';

export default function CreateProjectPage() {
	const navigate = useNavigate();
	const { api } = useAuth();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const roleCatalog = useMemo(() => [
		'Full Stack Developer',
		'Frontend Developer',
		'Backend Developer',
		'ML Engineer',
		'Data Scientist',
		'Data Engineer',
		'MLOps Engineer',
		'DevOps Engineer',
		'UI/UX Designer',
		'Mobile Developer',
		'QA Engineer',
		'Product Manager'
	], []);
	const [selectedRoles, setSelectedRoles] = useState([]);
	const [roles, setRoles] = useState('');
	const [technologies, setTechnologies] = useState('React, Node, MySQL');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!title || !description || !technologies) {
			setError('Please fill in all required fields');
			return;
		}
		
		setLoading(true);
		setError('');
		
		try {
			const combinedRoles = Array.from(new Set([
				...selectedRoles,
				...roles.split(',').map(s => s.trim()).filter(Boolean)
			]));
			
			const projectData = {
				title,
				description,
				roles: combinedRoles,
				technologies: technologies.split(',').map(s => s.trim()).filter(Boolean)
			};
			
			const response = await api.post('/projects', projectData);
			
			if (response.data && response.data.id) {
				alert('Project created successfully!');
				navigate('/projects');
			} else {
				setError('Failed to create project. Please try again.');
			}
		} catch (err) {
			console.error('Error creating project:', err);
			setError(err.response?.data?.error || 'Failed to create project. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black text-slate-100" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
			{/* Background - Fixed */}
			<div className="pointer-events-none fixed inset-0">
				<div className="absolute inset-0" style={{
					backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.05) 1px, transparent 0)',
					backgroundSize: '40px 40px'
				}} />
				<div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-purple-500/5" />
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
			</div>

			{/* Content */}
			<div className="relative z-10">
				{/* Hero Section */}
				<div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm mb-6">
						<Rocket className="w-4 h-4" />
						<span>Connect. Collaborate. Create.</span>
					</div>
					
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						<span className="text-white">Launch Your Next</span>
						<br />
						<span className="bg-gradient-to-r from-purple-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
							Amazing Project
						</span>
					</h1>
					
					<p className="text-lg md:text-xl text-slate-400 max-w-2xl">
						Build real-world projects with talented developers. Find your team, gain experience, and create something extraordinary together.
					</p>
				</div>

				{/* Form Section */}
				<div className="max-w-4xl mx-auto px-6 pb-20">
					<div className="space-y-6">
						{/* Project Details */}
						<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-lg">
									<Code2 className="w-5 h-5 text-teal-400" />
								</div>
								<h2 className="text-xl font-semibold text-white">Project Details</h2>
							</div>
							
							<div className="space-y-5">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Project Title
									</label>
									<input 
										type="text"
										className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors" 
										placeholder="Enter your project name..." 
										value={title} 
										onChange={e=>setTitle(e.target.value)}
										style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}
									/>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Description
									</label>
									<textarea 
										className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors resize-none" 
										rows={6} 
										placeholder="Describe your project vision, goals, and what you're building..." 
										value={description} 
										onChange={e=>setDescription(e.target.value)}
										style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}
									/>
								</div>
							</div>
						</div>

						{/* Team Roles */}
						<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-lg">
									<Users className="w-5 h-5 text-purple-400" />
								</div>
								<h2 className="text-xl font-semibold text-white">Team Requirements</h2>
							</div>
							
							<div className="space-y-5">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-3">
										Select Required Roles
									</label>
									<div className="flex flex-wrap gap-2">
										{roleCatalog.map(r => {
											const active = selectedRoles.includes(r);
											return (
												<button 
													type="button" 
													key={r} 
													onClick={() => setSelectedRoles(prev => active ? prev.filter(x=>x!==r) : [...prev, r])} 
													className={`
														text-sm rounded-lg px-4 py-2 border font-medium transition-all duration-200
														${active 
															? 'border-teal-500/50 bg-teal-500/20 text-teal-300' 
															: 'border-zinc-700 bg-zinc-900/50 text-slate-400 hover:border-teal-500/50 hover:text-teal-400'
														}
													`}
												>
													{r}
												</button>
											);
										})}
									</div>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Additional Roles (Optional)
									</label>
									<input 
										type="text"
										className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors" 
										placeholder="e.g., Technical Writer, Cloud Architect (comma separated)" 
										value={roles} 
										onChange={e=>setRoles(e.target.value)}
										style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}
									/>
								</div>
							</div>
						</div>

						{/* Technologies */}
						<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-lg">
									<Zap className="w-5 h-5 text-cyan-400" />
								</div>
								<h2 className="text-xl font-semibold text-white">Tech Stack</h2>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-slate-300 mb-2">
									Technologies
								</label>
								<input 
									type="text"
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors" 
									placeholder="e.g., React, Node.js, PostgreSQL, AWS (comma separated)" 
									value={technologies} 
									onChange={e=>setTechnologies(e.target.value)}
									style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}
								/>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-950/50 border border-red-800/50 rounded-xl p-4">
								<p className="text-red-300 text-sm">{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<button 
							type="button"
							onClick={handleSubmit}
							disabled={loading} 
							className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-8 py-4 text-white font-semibold hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
						>
							{loading ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
									Creating Project...
								</span>
							) : (
								<span className="flex items-center justify-center gap-2">
									<Rocket className="w-5 h-5" />
									Launch Project
								</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}