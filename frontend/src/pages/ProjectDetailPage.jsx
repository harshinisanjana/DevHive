import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { ArrowLeft, Upload, ExternalLink, User, Mail, Calendar, Check, X } from 'lucide-react';

export default function ProjectDetailPage() {
	const { id } = useParams();
	const { api, user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [message, setMessage] = useState('');
	const [applied, setApplied] = useState(false);
	const [ownerApps, setOwnerApps] = useState([]);
	const [resumeFile, setResumeFile] = useState(null);
	const [portfolioUrl, setPortfolioUrl] = useState('');
	const [loading, setLoading] = useState(true);
	const [updatingApp, setUpdatingApp] = useState(null);
	const [userApplication, setUserApplication] = useState(null);

	useEffect(() => {
		let active = true;
		api.get(`/projects/${id}`).then(({ data }) => { if (active) setProject(data); }).finally(() => setLoading(false));
		return () => { active = false; };
	}, [api, id]);

	useEffect(() => {
		if (user && project && user.id === project.owner_id) {
			// Use placeholder applications for demo
			const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
			const projectApps = demoApps.filter(app => app.project_id == project.id);
			
			// Add some sample applications for demo
			const sampleApps = [
				{
					id: 201,
					project_id: project.id,
					applicant_id: 2,
					applicant_name: 'John Developer',
					applicant_email: 'john@example.com',
					message: 'I have 5 years of experience with React and would love to contribute!',
					status: 'pending',
					created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
				},
				{
					id: 202,
					project_id: project.id,
					applicant_id: 3,
					applicant_name: 'Sarah Designer',
					applicant_email: 'sarah@example.com',
					message: 'Experienced UI/UX designer with strong portfolio.',
					status: 'accepted',
					created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
				}
			];
			
			setOwnerApps([...projectApps, ...sampleApps]);
		}
	}, [user, project]);

	// Check if current user has already applied to this project
	useEffect(() => {
		if (user && project && user.id !== project.owner_id) {
			// Check placeholder applications
			const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
			const userApp = demoApps.find(app => app.project_id == project.id && app.applicant_id == user.id);
			setUserApplication(userApp);
			setApplied(!!userApp);
		}
	}, [user, project]);

	async function updateApplicationStatus(appId, status) {
		setUpdatingApp(appId);
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// Update placeholder data
			const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
			const updatedApps = demoApps.map(app => 
				app.id === appId ? { ...app, status } : app
			);
			localStorage.setItem('demo_applications', JSON.stringify(updatedApps));
			
			// Update local state
			setOwnerApps(prev => prev.map(app => 
				app.id === appId ? { ...app, status } : app
			));
			
			alert(`Application ${status} successfully!`);
		} catch (err) {
			console.error('Error updating application:', err);
			alert('Failed to update application status');
		} finally {
			setUpdatingApp(null);
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
				<div className="text-slate-400">Loading...</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
				<div className="text-slate-400">Project not found</div>
			</div>
		);
	}

	async function apply() {
		if (!user) {
			navigate(`/login?next=${encodeURIComponent(location.pathname)}`);
			return;
		}
		
		// Simulate application submission with placeholder data
		try {
			console.log('Submitting application (placeholder mode):', {
				projectId: project.id,
				message,
				portfolioUrl,
				hasResume: !!resumeFile,
				resumeFileName: resumeFile?.name,
				userId: user.id
			});
			
			// Simulate network delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Create placeholder application data
			const placeholderApplication = {
				id: Date.now(),
				project_id: project.id,
				applicant_id: user.id,
				message: message || 'No message provided',
				resume_path: resumeFile ? `/uploads/${resumeFile.name}` : null,
				portfolio_url: portfolioUrl || null,
				status: 'pending',
				created_at: new Date().toISOString(),
				applicant_name: user.name,
				applicant_email: user.email
			};
			
			// Store in localStorage for demo purposes
			const existingApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
			existingApps.push(placeholderApplication);
			localStorage.setItem('demo_applications', JSON.stringify(existingApps));
			
			setApplied(true);
			setUserApplication(placeholderApplication);
			alert('Application submitted successfully! (Demo mode)');
			
		} catch (err) {
			console.error('Error submitting application:', err);
			alert('Failed to submit application. Please try again.');
		}
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

			<div className="relative z-10 mx-auto max-w-4xl px-4 py-8">
				<button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors mb-6">
					<ArrowLeft className="w-4 h-4" />
					Back
				</button>

				{/* Project Header */}
				<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 mb-6">
					<h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
					<p className="text-slate-400 text-sm">by {project.owner_name}</p>
				</div>

				{/* Project Description */}
				<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 mb-6">
					<h3 className="text-lg font-semibold text-white mb-3">Description</h3>
					<p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{project.description}</p>
				</div>

				{/* Roles */}
				<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 mb-6">
					<h3 className="text-lg font-semibold text-white mb-3">Looking for</h3>
					<div className="flex flex-wrap gap-2">
						{(() => {
							let roles = [];
							if (Array.isArray(project.roles)) roles = project.roles;
							else if (typeof project.roles === 'string') {
								try { roles = JSON.parse(project.roles); } catch {}
							}
							return (roles || []).map(r => (
								<span key={r} className="rounded-full border border-teal-700/40 bg-teal-900/30 px-3 py-1.5 text-sm text-teal-300">
									{r}
								</span>
							));
						})()}
					</div>
				</div>

				{/* Apply Section */}
				{(!user || user.id !== project.owner_id) && (
					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
						<h3 className="text-lg font-semibold text-white mb-4">Apply to this project</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm text-slate-400 mb-2">Message</label>
								<textarea 
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none px-4 py-3 text-slate-200 placeholder-slate-500 transition-colors" 
									rows={5} 
									placeholder="Tell the owner how you can contribute to this project..."
									value={message} 
									onChange={e=>setMessage(e.target.value)} 
								/>
							</div>
							<div>
								<label className="block text-sm text-slate-400 mb-2">Resume (PDF, DOC, DOCX) - Optional</label>
								<div className="relative">
									<input 
										type="file" 
										accept=".pdf,.doc,.docx" 
										onChange={e=>setResumeFile(e.target.files?.[0] || null)} 
										className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none px-4 py-3 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-900/30 file:text-teal-300 file:text-sm hover:file:bg-teal-900/50 transition-colors" 
									/>
								</div>
								{resumeFile && (
									<div className="mt-2 p-2 bg-teal-900/20 border border-teal-700/30 rounded-lg">
										<p className="text-xs text-teal-300">✓ Selected: {resumeFile.name}</p>
										<p className="text-xs text-slate-400">Size: {(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
									</div>
								)}
							</div>
							<div>
								<label className="block text-sm text-slate-400 mb-2">Portfolio URL (optional)</label>
								<input 
									type="url" 
									placeholder="https://yourportfolio.com"
									value={portfolioUrl} 
									onChange={e=>setPortfolioUrl(e.target.value)} 
									className="w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none px-4 py-3 text-slate-200 placeholder-slate-500 transition-colors" 
								/>
							</div>
							{applied ? (
								<div className="space-y-3">
									<div className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-6 py-3 text-center">
										<div className="text-white font-semibold mb-1">Application Submitted</div>
										{userApplication && (
											<div className="text-sm text-slate-400">
												Status: <span className={`font-medium ${
													userApplication.status === 'pending' ? 'text-amber-400' :
													userApplication.status === 'accepted' ? 'text-emerald-400' :
													'text-rose-400'
												}`}>
													{userApplication.status}
												</span>
											</div>
										)}
									</div>
									<div className="text-xs text-slate-500 text-center">
										Applied on {userApplication ? new Date(userApplication.created_at).toLocaleDateString() : 'recently'}
									</div>
								</div>
							) : (
								<button 
									onClick={apply} 
									className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 px-6 py-3 font-semibold text-white transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
								>
									Submit Application
								</button>
							)}
						</div>
					</div>
				)}

				{/* Applicants Section (Owner View) */}
				{user && user.id === project.owner_id && (
					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
						<h3 className="text-lg font-semibold text-white mb-4">Applicants</h3>
						{ownerApps.length === 0 ? (
							<div className="text-center py-8 text-slate-400">No applications yet.</div>
						) : (
							<div className="space-y-4">
								{ownerApps.map(a => (
									<div key={a.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
										<div className="flex items-start justify-between mb-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
													<User className="w-5 h-5 text-teal-400" />
												</div>
												<div>
													<div className="font-semibold text-white">{a.applicant_name}</div>
													<div className="text-xs text-slate-400 flex items-center gap-1">
														<Mail className="w-3 h-3" />
														{a.applicant_email}
													</div>
												</div>
											</div>
											<div className="text-xs text-slate-500 flex items-center gap-1">
												<Calendar className="w-3 h-3" />
												{new Date(a.created_at).toLocaleDateString()}
											</div>
										</div>
										{a.message && (
											<div className="bg-zinc-950/50 rounded-lg p-3 mb-3">
												<p className="text-sm text-slate-300 whitespace-pre-wrap">{a.message}</p>
											</div>
										)}
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												{a.resume_path && (
													<a 
														className="inline-flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition-colors" 
														href={a.resume_path} 
														target="_blank" 
														rel="noreferrer"
													>
														<Upload className="w-4 h-4" />
														Resume
													</a>
												)}
												{a.portfolio_url && (
													<a 
														className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors" 
														href={a.portfolio_url} 
														target="_blank" 
														rel="noreferrer"
													>
														<ExternalLink className="w-4 h-4" />
														Portfolio
													</a>
												)}
											</div>
											
											{/* Application Status and Actions */}
											<div className="flex items-center gap-2">
												<span className={`text-xs px-2 py-1 rounded-full ${
													a.status === 'pending' ? 'bg-amber-900/20 text-amber-300' :
													a.status === 'accepted' ? 'bg-emerald-900/20 text-emerald-300' :
													'bg-rose-900/20 text-rose-300'
												}`}>
													{a.status}
												</span>
												
												{a.status === 'pending' && (
													<div className="flex items-center gap-1">
														<button
															onClick={() => updateApplicationStatus(a.id, 'accepted')}
															disabled={updatingApp === a.id}
															className="p-1.5 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
															title="Accept Application"
														>
															<Check className="w-4 h-4" />
														</button>
														<button
															onClick={() => updateApplicationStatus(a.id, 'rejected')}
															disabled={updatingApp === a.id}
															className="p-1.5 rounded-lg bg-rose-900/20 hover:bg-rose-900/30 text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-50"
															title="Reject Application"
														>
															<X className="w-4 h-4" />
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}