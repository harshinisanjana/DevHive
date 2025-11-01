import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { FileText, Filter, Clock, CheckCircle, XCircle, Inbox } from 'lucide-react';

export default function MyApplicationsPage() {
	const { api } = useAuth();
	const [apps, setApps] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		// Use placeholder data from localStorage
		const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
		
		// Add some sample applications for demo
		const sampleApps = [
			{
				id: 1,
				project_id: 1,
				title: 'DevHive Landing Revamp',
				status: 'pending',
				created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
				message: 'I have 3 years of experience with React and Node.js. Would love to contribute to this project!'
			},
			{
				id: 2,
				project_id: 2,
				title: 'API Gateway Service',
				status: 'accepted',
				created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
				message: 'Experienced backend developer with strong API design background.'
			},
			{
				id: 3,
				project_id: 3,
				title: 'Auth Templates',
				status: 'rejected',
				created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
				message: 'Skilled in authentication systems and security best practices.'
			}
		];
		
		const allApps = [...demoApps, ...sampleApps];
		setApps(allApps);
		setLoading(false);
	}, []);

	const filtered = useMemo(() => (
		filter === 'all' ? apps : apps.filter(a => a.status === filter)
	), [apps, filter]);

	const stats = useMemo(() => ({
		total: apps.length,
		pending: apps.filter(a => a.status === 'pending').length,
		accepted: apps.filter(a => a.status === 'accepted').length,
		rejected: apps.filter(a => a.status === 'rejected').length
	}), [apps]);

	if (loading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-slate-400">Loading applications...</p>
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
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-xl">
							<FileText className="w-6 h-6 text-teal-400" />
						</div>
						<h1 className="text-3xl font-bold text-white">My Applications</h1>
					</div>
					<p className="text-slate-400 ml-14">Track the status of your project applications</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
						<div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
						<div className="text-sm text-slate-400">Total Applications</div>
					</div>
					<div className="bg-zinc-950 border border-amber-900/50 rounded-xl p-4">
						<div className="text-2xl font-bold text-amber-400 mb-1">{stats.pending}</div>
						<div className="text-sm text-slate-400">Pending</div>
					</div>
					<div className="bg-zinc-950 border border-emerald-900/50 rounded-xl p-4">
						<div className="text-2xl font-bold text-emerald-400 mb-1">{stats.accepted}</div>
						<div className="text-sm text-slate-400">Accepted</div>
					</div>
					<div className="bg-zinc-950 border border-rose-900/50 rounded-xl p-4">
						<div className="text-2xl font-bold text-rose-400 mb-1">{stats.rejected}</div>
						<div className="text-sm text-slate-400">Rejected</div>
					</div>
				</div>

				{/* Filter Section */}
				<div className="mb-6 flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
					<div className="flex items-center gap-2">
						<Filter className="w-5 h-5 text-slate-400" />
						<span className="text-slate-300 font-medium">Filter Applications</span>
					</div>
					<select 
						value={filter} 
						onChange={e=>setFilter(e.target.value)} 
						className="rounded-lg bg-black border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
						style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}
					>
						<option value="all">All Status</option>
						<option value="pending">Pending</option>
						<option value="accepted">Accepted</option>
						<option value="rejected">Rejected</option>
					</select>
				</div>

				{/* Applications List */}
				{filtered.length === 0 ? (
					<div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center">
						<Inbox className="w-16 h-16 text-slate-600 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-slate-300 mb-2">No applications found</h3>
						<p className="text-slate-500">
							{filter === 'all' 
								? "You haven't applied to any projects yet. Browse projects and apply to get started!" 
								: `No ${filter} applications at the moment.`}
						</p>
					</div>
				) : (
					<div className="grid gap-4 md:grid-cols-2">
						{filtered.map(a => (
							<ApplicationCard key={a.id} application={a} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function ApplicationCard({ application }) {
	const { id, project_id, title, status, created_at, message } = application;
	
	const statusConfig = {
		accepted: {
			icon: CheckCircle,
			bgClass: 'bg-emerald-900/20 border-emerald-700',
			textClass: 'text-emerald-300',
			label: 'Accepted'
		},
		rejected: {
			icon: XCircle,
			bgClass: 'bg-rose-900/20 border-rose-700',
			textClass: 'text-rose-300',
			label: 'Rejected'
		},
		pending: {
			icon: Clock,
			bgClass: 'bg-amber-900/20 border-amber-700',
			textClass: 'text-amber-300',
			label: 'Pending'
		}
	};

	const config = statusConfig[status] || statusConfig.pending;
	const StatusIcon = config.icon;

	return (
		<div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
			<div className="flex items-start justify-between gap-4 mb-4">
				<div className="min-w-0 flex-1">
					<button 
						onClick={() => alert(`Navigate to project ${project_id}`)}
						className="text-lg font-semibold text-white hover:text-teal-400 transition-colors truncate block mb-2"
					>
						{title}
					</button>
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<Clock className="w-3 h-3" />
						<span>Applied {new Date(created_at).toLocaleDateString('en-US', { 
							month: 'short', 
							day: 'numeric',
							year: 'numeric'
						})}</span>
					</div>
				</div>
				<div className={`flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 border ${config.bgClass} ${config.textClass} font-medium`}>
					<StatusIcon className="w-3.5 h-3.5" />
					{config.label}
				</div>
			</div>
			
			{message && (
				<div className="bg-black/50 border border-zinc-800 rounded-xl p-4">
					<div className="text-sm text-slate-300 whitespace-pre-wrap">{message}</div>
				</div>
			)}
		</div>
	);
}