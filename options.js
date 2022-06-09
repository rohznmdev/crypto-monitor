"use strict";
const axios = require("axios").default;

const getOptions = async () => {
  try {
    const config = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins",
    };
    const { data } = await axios(config);
    let id = data.map((el) => el.id);
    console.log(id)
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getOptions,
};
