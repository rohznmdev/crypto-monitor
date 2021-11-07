//simple ethereum and bitcoin price monitor

const axios = require('axios');
const cheerio = require('cheerio');

const getETH = async () => {
	try {
		const { data } = await axios.get(
			"https://ethereumprice.org/"
		);
		const $ = cheerio.load(data);
		const ethPrice = [];

		$('#coin-price > span.value').each((_idx, el) => {
			const elETH = $(el).text()
			ethPrice.push(elETH)
		});

		return ethPrice;
	} catch (error) {
		throw error;
	}
};

const getBTC = async() => {
	try {
		const { data } = await axios.get(
			"https://coinmarketcap.com/currencies/bitcoin/"
		);
		const $ = cheerio.load(data);
		const btcPrice = [];

		$('#__next > div > div > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div').each((idx,el) => {
			const elBTC = $(el).text()
			btcPrice.push(elBTC)
		});

		return btcPrice;
	} catch (error) {
		throw error;
	}
};

const today = new Date();
const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const callFunc = async() => {
	
	console.log(`The current date is ${date} and the current time is ${time}`)
	getBTC()
	.then((btcPrice) => console.log(`The current price of Bitcoin is ${btcPrice}.`))
	getETH()
	.then((ethPrice) => console.log(`The current price of Ethereum is $${ethPrice}.`))
};

callFunc()