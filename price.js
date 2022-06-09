//simple ethereum and bitcoin price monitor
"use strict";
const axios = require("axios").default;

let getAnalytics = async (cryptoID) => {
  try {
    const config = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoID}`,
    };
    const { data } = await axios(config);
    const name = data[0].name;
    const imgUrl = data[0].image;
    const price = data[0].current_price;
    const hourHigh = data[0].high_24h;
    const hourLow = data[0].low_24h;
    const allTime = data[0].ath;
    const allTimeChange = data[0].ath_change_percentage;

    return {
      name,
      imgUrl,
      price,
      allTime,
      allTimeChange,
      hourHigh,
      hourLow,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAnalytics,
};
