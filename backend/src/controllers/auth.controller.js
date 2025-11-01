const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { signToken } = require('../utils/jwt');

async function register(req, res) {
	const { name, email, password } = req.body || {};
	if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
	try {
		const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
		if (existing.length) return res.status(409).json({ error: 'Email already registered' });
		const passwordHash = await bcrypt.hash(password, 10);
		const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash]);
		const user = { id: result.insertId, name, email };
		const token = signToken({ id: user.id, name: user.name, email: user.email });
		return res.status(201).json({ user, token });
	} catch (err) {
		return res.status(500).json({ error: 'Registration failed' });
	}
}

async function login(req, res) {
	const { email, password } = req.body || {};
	if (!email || !password) return res.status(400).json({ error: 'email, password required' });
	try {
		const [rows] = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email]);
		if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
		const userRow = rows[0];
		const ok = await bcrypt.compare(password, userRow.password_hash);
		if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
		const user = { id: userRow.id, name: userRow.name, email: userRow.email };
		const token = signToken(user);
		return res.json({ user, token });
	} catch (err) {
		return res.status(500).json({ error: 'Login failed' });
	}
}

module.exports = { register, login };



