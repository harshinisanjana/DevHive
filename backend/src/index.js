require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');

const { pool } = require('./config/db');
const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const applicationsRouter = require('./routes/applications');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
	res.json({ name: 'DevHive API', status: 'ok' });
});

app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/projects', projectsRouter);
app.use('/applications', applicationsRouter);

const port = process.env.PORT || 4000;

async function start() {
	try {
		// Simple DB ping on boot
		await pool.query('SELECT 1');
		app.listen(port, () => {
			console.log(`DevHive API listening on http://localhost:${port}`);
		});
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

start();


