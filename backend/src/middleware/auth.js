const { verifyToken } = require('../utils/jwt');

function authRequired(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return res.status(401).json({ error: 'Missing token' });
	try {
		const decoded = verifyToken(token);
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
}

module.exports = { authRequired };



