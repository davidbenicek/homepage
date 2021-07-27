const { Client } = require('pg')

const USERNAME = 'xxiynskvnvejtu';
const PASSWORD = '3f4ecc30258fb23a8447607eb3d622f65f0ea3c195cc2dacffea0e85dc7b6c5b';
const HOST = 'ec2-54-246-117-62.eu-west-1.compute.amazonaws.com';
const PORT = '5432';
const DATABASE = 'de4263l3jgvr6o';

config = {
    connectionString: 'postgres://xxiynskvnvejtu:3f4ecc30258fb23a8447607eb3d622f65f0ea3c195cc2dacffea0e85dc7b6c5b@ec2-54-246-117-62.eu-west-1.compute.amazonaws.com:5432/de4263l3jgvr6o',
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
