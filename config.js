// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    DB_URL:process.env.DB_URL,
    PORT:process.env.PORT,
    API_SECRET_KEY:process.env.API_SECRET_KEY
};