const express = require('express');
const { pool } = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT 1 AS ok');
		res.json({ api: 'ok', db: rows[0]?.ok === 1 ? 'ok' : 'unknown' });
	} catch (err) {
		res.status(500).json({ api: 'ok', db: 'error', error: 'DB connection failed' });
	}
});

module.exports = router;


