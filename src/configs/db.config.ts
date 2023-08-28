const DB_USER = process.env['DB_USER'];
const DB_NAME = process.env['DB_NAME'];
const DB_PASSWORD = process.env['DB_PASSWORD'];

const dbConnectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.8q0ju1p.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export default dbConnectionString;