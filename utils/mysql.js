const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const authenticateUser = async (id, password) => {
  const [rows] = await connection.execute('SELECT * FROM PROGRAM_USER WHERE USER_ID = ? AND PASSWORD = ?', [id, password]);
  return rows.length > 0;
};

module.exports = { authenticateUser };
