const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'devhive'
  });
  
  const correctHash = '$2a$10$h6RUCaetdGr6YdZE1Bvcj.kdptzKtE91ok5j7SIKgHgjwsDVmCcXy';
  const [r] = await conn.execute(
    'UPDATE users SET password_hash = ? WHERE email IN (?, ?)',
    [correctHash, 'alice@example.com', 'bob@example.com']
  );
  
  console.log('Updated rows:', r.affectedRows);
  
  const [rows] = await conn.execute(
    'SELECT email, password_hash FROM users WHERE email IN (?, ?)',
    ['alice@example.com', 'bob@example.com']
  );
  
  rows.forEach(u => console.log(u.email + ' => ' + u.password_hash));
  await conn.end();
})().catch(console.error);
