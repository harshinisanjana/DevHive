const { pool } = require('../config/db');

async function listProjects(req, res) {
	try {
		const [rows] = await pool.query(
			`SELECT p.*, u.name AS owner_name, u.email AS owner_email
			 FROM projects p JOIN users u ON u.id = p.owner_id
			 ORDER BY p.created_at DESC`
		);
		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ error: 'Failed to list projects' });
	}
}

async function getProject(req, res) {
	const { id } = req.params;
	try {
		const [rows] = await pool.query(
			`SELECT p.*, u.name AS owner_name, u.email AS owner_email
			 FROM projects p JOIN users u ON u.id = p.owner_id
			 WHERE p.id = ?`,
			[id]
		);
		if (!rows.length) return res.status(404).json({ error: 'Not found' });
		return res.json(rows[0]);
	} catch (err) {
		return res.status(500).json({ error: 'Failed to get project' });
	}
}

async function createProject(req, res) {
	const { title, description, roles, technologies } = req.body || {};
	if (!title || !description) return res.status(400).json({ error: 'title and description required' });
	try {
		const rolesJson = roles ? JSON.stringify(roles) : null;
		const techJson = technologies ? JSON.stringify(technologies) : null;
		const [result] = await pool.query(
			'INSERT INTO projects (owner_id, title, description, roles, technologies) VALUES (?, ?, ?, CAST(? AS JSON), CAST(? AS JSON))',
			[req.user.id, title, description, rolesJson, techJson]
		);
		return res.status(201).json({ id: result.insertId });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to create project' });
	}
}

async function updateProject(req, res) {
	const { id } = req.params;
	const { title, description, roles, technologies } = req.body || {};
	try {
		const [rows] = await pool.query('SELECT owner_id FROM projects WHERE id = ?', [id]);
		if (!rows.length) return res.status(404).json({ error: 'Not found' });
		if (rows[0].owner_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
		const rolesJson = roles !== undefined ? JSON.stringify(roles) : null;
		const techJson = technologies !== undefined ? JSON.stringify(technologies) : null;
		await pool.query(
			`UPDATE projects SET 
			 title = COALESCE(?, title),
			 description = COALESCE(?, description),
			 roles = CASE WHEN ? IS NULL THEN roles ELSE CAST(? AS JSON) END,
			 technologies = CASE WHEN ? IS NULL THEN technologies ELSE CAST(? AS JSON) END
			WHERE id = ?`,
			[title ?? null, description ?? null, roles === undefined ? null : rolesJson, rolesJson, technologies === undefined ? null : techJson, techJson, id]
		);
		return res.json({ ok: true });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to update project' });
	}
}

async function deleteProject(req, res) {
	const { id } = req.params;
	try {
		const [rows] = await pool.query('SELECT owner_id FROM projects WHERE id = ?', [id]);
		if (!rows.length) return res.status(404).json({ error: 'Not found' });
		if (rows[0].owner_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
		await pool.query('DELETE FROM projects WHERE id = ?', [id]);
		return res.json({ ok: true });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to delete project' });
	}
}

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };



