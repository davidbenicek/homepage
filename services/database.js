const { Client } = require('pg')

config = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
}
const client = new Client(config)

client.connect((err) => {
    if (err) {
        console.error('Connection error w/ database...', err.stack)
    } else {
        console.log('Connected to database...')
    }
})

const query = async (query, queryParams) => {
    try {
        console.log(query, queryParams);
        return await client.query(query, queryParams);
    } catch (err) {
        console.log(err);
        throw new Error('Database query error', err);
    }
}

module.exports = {
    query,
};
