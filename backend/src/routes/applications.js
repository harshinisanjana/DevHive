const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authRequired } = require('../middleware/auth');
const { applyToProject, listApplicationsForProject, listApplicationsForUser, updateApplicationStatus } = require('../controllers/application.controller');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadDir),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, '_');
		cb(null, `${Date.now()}_${base}${ext}`);
	}
});
const upload = multer({ storage });

router.post('/', authRequired, upload.single('resume'), applyToProject);
router.get('/me', authRequired, listApplicationsForUser);
router.get('/project/:projectId', authRequired, listApplicationsForProject);
router.patch('/:id', authRequired, updateApplicationStatus);

module.exports = router;


