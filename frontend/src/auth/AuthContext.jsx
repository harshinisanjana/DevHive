import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

function getApi() {
	const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000' });
	api.interceptors.request.use((config) => {
		const token = localStorage.getItem('token');
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	return api;
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const saved = localStorage.getItem('user');
		if (saved) setUser(JSON.parse(saved));
	}, []);

	const api = useMemo(() => getApi(), []);

	async function login(email, password) {
		try {
			const { data } = await api.post('/auth/login', { email, password });
			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user));
			setUser(data.user);
			return { user: data.user, token: data.token };
		} catch (error) {
			console.error('Login error:', error);
			throw new Error(error.response?.data?.error || 'Failed to login');
		}
	}

	async function register(name, email, password) {
		const { data } = await api.post('/auth/register', { name, email, password });
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', JSON.stringify(data.user));
		setUser(data.user);
	}

	function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
	}

	const value = { user, login, register, logout, api };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}







