USE devhive;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE applications;
TRUNCATE TABLE projects;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS=1;

-- Demo users: password is 'password123' for both
INSERT INTO users (id, name, email, password_hash)
VALUES
(1, 'Demo Owner', 'owner@example.com', '$2a$10$h6RUCaetdGr6YdZE1Bvcj.kdptzKtE91ok5j7SIKgHgjwsDVmCcXy'),
(2, 'Demo Applicant', 'applicant@example.com', '$2a$10$h6RUCaetdGr6YdZE1Bvcj.kdptzKtE91ok5j7SIKgHgjwsDVmCcXy');


INSERT INTO projects (owner_id, title, description, roles, technologies)
VALUES
(1, 'DevHive Landing Revamp', 'Modernize the landing page with Tailwind and animations.', JSON_ARRAY('Frontend'), JSON_ARRAY('React','Tailwind','Framer Motion')),
(1, 'API Gateway Service', 'Lightweight gateway for routing and auth.', JSON_ARRAY('Backend'), JSON_ARRAY('Node','Express','JWT')),
(1, 'Auth Templates', 'Reusable auth UI templates for projects.', JSON_ARRAY('Frontend','UI/UX'), JSON_ARRAY('React','Tailwind')),
(1, 'Metrics Dashboard', 'Charts for app metrics and health.', JSON_ARRAY('Frontend','Data Viz'), JSON_ARRAY('React','Chart.js')),
(2, 'MySQL Schema Toolkit', 'Utilities for migrations and seeding.', JSON_ARRAY('Backend','Database'), JSON_ARRAY('Node','MySQL')),
(2, 'CI Scripts', 'Simple CI scripts for lint/build/test.', JSON_ARRAY('DevOps'), JSON_ARRAY('Node','npm')),
(2, 'Form Builder', 'Composable form builder with validation.', JSON_ARRAY('Frontend'), JSON_ARRAY('React','Zod')),
(2, 'Notification Stub', 'Email/webhook notification stubs.', JSON_ARRAY('Backend'), JSON_ARRAY('Node','Express')),
(1, 'Design System', 'Base components and tokens.', JSON_ARRAY('Frontend','UI/UX'), JSON_ARRAY('React','Tailwind')),
(1, 'Docs Site', 'VitePress docs for developers.', JSON_ARRAY('Frontend'), JSON_ARRAY('Vite','Markdown')),
(2, 'Job Queue Worker', 'Queue-based async worker.', JSON_ARRAY('Backend'), JSON_ARRAY('Node','BullMQ','Redis')),
(2, 'Project Matcher', 'Match applicants to roles automatically.', JSON_ARRAY('Backend','Data'), JSON_ARRAY('Node','Express','MySQL'));

INSERT INTO applications (project_id, applicant_id, message, status)
VALUES
(1, 2, 'I can help with frontend components.', 'pending');


