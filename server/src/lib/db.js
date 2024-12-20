const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        port: process.env.DB_PORT,
        logging: false,
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database (PostgreSQL)');
    } catch {
        console.error('Error connecting to database');
    }
}

testConnection();

module.exports = sequelize;