import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsListPage from './pages/ProjectsListPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import CreateProjectPage from './pages/CreateProjectPage.jsx';
import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
import MyProjectsPage from './pages/MyProjectsPage.jsx';

function ProtectedRoute({ children }) {
	const { user } = useAuth();
	const location = useLocation();
	
	if (!user) {
		// Save the attempted location
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}
	return children;
}

function Layout({ children }) {
	const { user, logout } = useAuth();
	
	const handleLogout = () => {
		if (window.confirm('Are you sure you want to log out?')) {
			logout();
			alert('You have been successfully logged out');
		}
	};

	return (
		<div className="min-h-screen bg-black text-slate-100 relative overflow-hidden">
			<div className="hero-grid opacity-10"></div>
			<div className="hero-glow opacity-30"></div>
			<div className="relative">
				<header className="border-b border-slate-800/60 backdrop-blur supports-[backdrop-filter]:bg-black/50 sticky top-0 z-20" style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace" }}>
					<div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
						<Link to="/" className="text-2xl font-semibold tracking-tight">
							<span className="text-teal-300 text-3xl">{'</>'}</span> DevHive
						</Link>
					<nav className="flex items-center gap-8 text-lg">
						<Link to="/projects" className="hover:text-teal-300">Projects</Link>
						{user ? (
							<>
								<Link to="/projects/new" className="hover:text-teal-300">New Project</Link>
								<Link to="/my-projects" className="hover:text-teal-300">My Projects</Link>
								<Link to="/applications" className="hover:text-teal-300">My Applications</Link>
								<button onClick={handleLogout} className="ml-2 rounded border border-slate-700 px-5 py-2.5 hover:border-teal-400 text-lg">Logout</button>
							</>
						) : (
							<>
								<Link to="/login" className="rounded-md border border-slate-700 px-4 py-2 hover:border-indigo-500 text-lg">Sign In</Link>
								<Link to="/register" className="rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-white hover:from-indigo-500 hover:to-fuchsia-500 text-lg">Get Started</Link>
							</>
						)}
					</nav>
					</div>
				</header>
				<main className="max-w-5xl mx-auto px-4 py-6 relative z-10">
					{children}
				</main>
			</div>
		</div>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/projects" element={<ProjectsListPage />} />
					<Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} />
					<Route path="/projects/new" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} />
					<Route path="/my-projects" element={<ProtectedRoute><MyProjectsPage /></ProtectedRoute>} />
					<Route path="/applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
				</Routes>
			</Layout>
		</AuthProvider>
	);
}
