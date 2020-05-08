const skyscanner = require('skyscanner-promise-browse')
const crypto = require('crypto')
const db = require('./database');

const getMap = async (mapName, origin, outbound, inbound) => {
    try {
        const data = {};
        const { rows: todo } = await db.query(`SELECT * FROM locations WHERE map_name = $1 AND status = 'TODO';`, [mapName])
        const { rows: planned } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Planned';`, [mapName])
        const { rows: visited } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Visited';`, [mapName])
        const { rows: lived } = await db.query(`SELECT country_code FROM locations WHERE map_name = $1 AND status = 'Lived'`, [mapName])
        const todoCountrycCodes = todo.map(x => x.country_code);
        todoCountrycCodes.forEach(country => data[country] = 'TODO');
        planned.map(x => x.country_code).forEach(country => data[country] = 'Planned');
        visited.map(x => x.country_code).forEach(country => data[country] = 'Visited');
        lived.map(x => x.country_code).forEach(country => data[country] = 'Lived');
        const flights = origin ? await getSortedFlights(origin, outbound, inbound, todoCountrycCodes) : [];
        return {
            stats: {
                Visited: visited.length,
                Lived: lived.length,
                Planned: planned.length,
                TODO: 213 - visited.length - lived.length,
                Total: visited.length + lived.length,
            },
            flights,
            data
        };
    } catch (err) {
        console.log(err);
        throw new Error('Error while getting map');
    }
}

const getAllMaps = async () => {
    const { rows } = await db.query(`SELECT DISTINCT map_name FROM locations;`);

    return rows.map(({ map_name }) => crypto.createHash('sha1').update(map_name).digest('hex'));
}

const getSortedFlights = async (origin, outbound, inbound, countries) => {
    const fromSkyscannerCode = await skyscanner.getLocationCode(origin);
    const outboundQuerySanitized = sanitizeDateForQuery(outbound);
    const inboundQuerySanitized = sanitizeDateForQuery(inbound);
    const outboundUrlSanitized = sanitizeDateForUrl(outbound);
    const inboundUrlSanitized = sanitizeDateForUrl(inbound);
    const flightPrices = await skyscanner.browseRoutes(fromSkyscannerCode.PlaceId, 'anywhere', outboundQuerySanitized, inboundQuerySanitized, undefined, undefined, undefined, 100);
    return flightPrices.filter(option => !!option.price).map(option => {
        return countries.indexOf(option.destination.code) > -1 ?
            {
                been: false,
                url: generateUrl(option.destination.code, outboundUrlSanitized, inboundUrlSanitized),
                ...option
            }
            :
            {
                been: true,
                ...option
            }
    }).sort((optionA, optionB) => optionA.price - optionB.price);
}

const generateUrl = (code, outbound, inbound) => {
    if (outbound && inbound) {
        return `https://www.skyscanner.es/transport/flights/bcn/${code}/${outbound}/${inbound}`
    }
    return `https://www.skyscanner.es/transport/flights/bcn/${code}`;
}

const sanitizeDateForQuery = (date) => {
    if (!date) return 'anytime';
    try {
        return new Date(date).toISOString().substring(0, 10);;
    } catch (err) {
        console.log('Failed to sanitize date for query', err);
        return 'anytime';
    }
}

const sanitizeDateForUrl = (date) => {
    if (!date) return null;
    try {
        const dateObj = new Date(date);
        const d = dateObj.getDate();
        const m = dateObj.getMonth() + 1;
        const y = dateObj.getFullYear().toString().slice(-2);
        return `${y}${m}${d}`;
    } catch (err) {
        console.log('Failed to sanitize date for url', err);
        return '';
    }
}

const insertIntoMap = async (mapName, countryCode, status) => {
    try {
        await db.query(`INSERT INTO locations (map_name, country_code, status)  VALUES ($1, $2, $3) ON CONFLICT(map_name, country_code) DO UPDATE SET status = EXCLUDED.status`, [mapName, countryCode, status])
        return getMap(mapName);
    } catch (err) {
        console.log(err);
        throw new Error('Error while getting map');
    }
}

module.exports = {
    getMap,
    getAllMaps,
    insertIntoMap,
};

