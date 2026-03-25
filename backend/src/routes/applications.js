const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authRequired } = require('../middleware/auth');
const { applyToProject, listApplicationsForProject, listApplicationsForUser, updateApplicationStatus } = require('../controllers/application.controller');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.post('/', authRequired, upload.single('resume'), applyToProject);
router.get('/me', authRequired, listApplicationsForUser);
router.get('/project/:projectId', authRequired, listApplicationsForProject);
router.patch('/:id', authRequired, updateApplicationStatus);

module.exports = router;


