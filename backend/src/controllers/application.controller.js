const { pool } = require('../config/db');

async function applyToProject(req, res) {
	const { projectId, message, portfolioUrl } = req.body || {};
	console.log('Application request:', { 
		projectId, 
		message, 
		portfolioUrl, 
		userId: req.user?.id, 
		file: req.file?.filename,
		body: req.body,
		files: req.files
	});
	
	if (!projectId) return res.status(400).json({ error: 'projectId required' });
	if (!req.user?.id) return res.status(401).json({ error: 'User not authenticated' });
	
	// Handle file upload - make it optional
	let resumePath = null;
	if (req.file) {
		resumePath = `/uploads/${req.file.filename}`;
		console.log('File uploaded:', req.file);
	}
	
	try {
		const [result] = await pool.query(
			'INSERT INTO applications (project_id, applicant_id, message, resume_path, portfolio_url) VALUES (?, ?, ?, ?, ?)',
			[projectId, req.user.id, message || null, resumePath, portfolioUrl || null]
		);
		console.log('Application created successfully:', result.insertId);
		return res.status(201).json({ 
			ok: true, 
			resumePath, 
			id: result.insertId,
			message: 'Application submitted successfully'
		});
	} catch (err) {
		console.error('Application error:', err);
		if (err && err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Already applied' });
		return res.status(500).json({ error: 'Failed to apply: ' + err.message });
	}
}

async function listApplicationsForProject(req, res) {
	const { projectId } = req.params;
	try {
		// Only owner can view
		const [owners] = await pool.query('SELECT owner_id FROM projects WHERE id = ?', [projectId]);
		if (!owners.length) return res.status(404).json({ error: 'Project not found' });
		if (owners[0].owner_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
		const [rows] = await pool.query(
			`SELECT a.*, u.name AS applicant_name, u.email AS applicant_email
			 FROM applications a JOIN users u ON u.id = a.applicant_id
			 WHERE a.project_id = ? ORDER BY a.created_at DESC`,
			[projectId]
		);
		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ error: 'Failed to list applications' });
	}
}

async function listApplicationsForUser(req, res) {
	try {
		const [rows] = await pool.query(
			`SELECT a.*, p.title, p.owner_id
			 FROM applications a JOIN projects p ON p.id = a.project_id
			 WHERE a.applicant_id = ? ORDER BY a.created_at DESC`,
			[req.user.id]
		);
		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ error: 'Failed to list user applications' });
	}
}

async function updateApplicationStatus(req, res) {
	const { id } = req.params;
	const { status } = req.body || {};
	if (!['pending','accepted','rejected'].includes(status || '')) return res.status(400).json({ error: 'Invalid status' });
	try {
		// Only project owner can update
		const [rows] = await pool.query(
			`SELECT a.project_id, p.owner_id FROM applications a JOIN projects p ON p.id = a.project_id WHERE a.id = ?`,
			[id]
		);
		if (!rows.length) return res.status(404).json({ error: 'Not found' });
		if (rows[0].owner_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
		await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
		return res.json({ ok: true });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to update status' });
	}
}

module.exports = { applyToProject, listApplicationsForProject, listApplicationsForUser, updateApplicationStatus };


