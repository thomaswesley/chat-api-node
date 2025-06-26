"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabaseMySQL = connectDatabaseMySQL;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
console.log('Pool de conexões MySQL criado!');
async function connectDatabaseMySQL() {
    return pool;
}
