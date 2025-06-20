import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
console.log('Pool de conexões MySQL criado!');
export async function connectDatabaseMySQL() {
    return pool;
}
