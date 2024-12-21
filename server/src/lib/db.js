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
        dialectOptions: {
            ssl: {
            require: true,
            rejectUnauthorized: false,
            },
        },
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database (PostgreSQL)');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

testConnection();

module.exports = sequelize;