const express = require('express');
const { authRequired } = require('../middleware/auth');
const { listProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/project.controller');

const router = express.Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', authRequired, createProject);
router.put('/:id', authRequired, updateProject);
router.delete('/:id', authRequired, deleteProject);

module.exports = router;



