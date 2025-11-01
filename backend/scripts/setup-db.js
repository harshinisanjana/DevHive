/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run() {
	const host = process.env.DB_HOST || 'localhost';
	const user = process.env.DB_USER || 'root';
	const password = process.env.DB_PASSWORD || '';
	const dbName = process.env.DB_NAME || 'devhive';

	const conn = await mysql.createConnection({ host, user, password, multipleStatements: true });
	try {
		await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
		await conn.query(`USE \`${dbName}\`;`);
		const schema = fs.readFileSync(path.join(__dirname, '..', 'sql', 'schema.sql'), 'utf8');
		await conn.query(schema);
		const seed = fs.readFileSync(path.join(__dirname, '..', 'sql', 'seed.sql'), 'utf8');
		await conn.query(seed);
		console.log('Database setup complete.');
	} finally {
		await conn.end();
	}
}

run().catch((err) => {
	console.error('DB setup failed:', err.message);
	process.exit(1);
});










