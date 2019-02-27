const axios = require('axios');

const getForecast = async (lat, lang) => {
    const { data } = await axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lang}?units=si`);
    console.log(data);
    return data;
}

module.exports = {
    getForecast,
};