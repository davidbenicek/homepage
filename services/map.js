const db = require('./database');

const getMap = async (mapName) => {
    try {
        const data = {};
        const { rows: todo } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'TODO'`, [mapName])
        const { rows: planned } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Planned'`, [mapName])
        const { rows: visited } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Visited';`, [mapName])
        const { rows: lived } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Lived'`, [mapName])
        todo.map(x => x.country_code).forEach(country => data[country] = 'TODO');
        planned.map(x => x.country_code).forEach(country => data[country] = 'Planned');
        visited.map(x => x.country_code).forEach(country => data[country] = 'Visited');
        lived.map(x => x.country_code).forEach(country => data[country] = 'Lived');
        return {
            stats: {
                Visited: visited.length,
                Lived: lived.length,
                Planned: planned.length,
                TODO: 213 - visited.length - lived.length,
            },
            data
        };
    } catch (err) {
        console.log(err);
        throw new Error('Error while getting map');
    }
}

const insertIntoMap = async (mapName, countryCode, status) => {
    try {
        await db.query(`INSERT INTO locations (map_name, country_code, status)  VALUES ($1, $2, $3) ON CONFLICT (map_name, country_code) DO UPDATE SET status = EXCLUDED.status`, [mapName, countryCode, status])
        return getMap(mapName);
    } catch (err) {
        console.log(err);
        throw new Error('Error while getting map');
    }
}

module.exports = {
    getMap,
    insertIntoMap,
};

