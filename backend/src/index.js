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
const corsOptions = {
	origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
	credentials: true,
};
app.use(cors(corsOptions));

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

// Global Error Handler
app.use((err, req, res, next) => {
	console.error('Unhandled Error:', err);
	const status = err.status || 500;
	res.status(status).json({
		error: err.message || 'Internal Server Error',
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	});
});

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


