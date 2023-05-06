require("dotenv").config();
const axios = require("axios");
const telegram = require("node-telegram-bot-api");

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, CURRENSEA_BASE, CURRENSEA_SYMBOL } =
  process.env;
if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("TELEGRAM_TOKEN or TELEGRAM_CHAT_ID not set");
  process.exit(1);
}
if (!CURRENSEA_BASE || !CURRENSEA_SYMBOL) {
  console.error("CURRENSEA_BASE or CURRENSEA_SYMBOL not set");
  process.exit(1);
}

const fetchCurrencyRates = async () => {
  const url = `https://api.exchangerate.host/latest?base=${CURRENSEA_BASE}&symbols=${CURRENSEA_SYMBOL}`;
  const { data } = await axios.get(url);
  return data;
};

const main = async () => {
  const { rates } = await fetchCurrencyRates();
  const bot = new telegram(process.env.TELEGRAM_TOKEN);
  const msg = `${CURRENSEA_BASE}/${CURRENSEA_SYMBOL} = ${rates[CURRENSEA_SYMBOL]}`;
  console.log(`Sending to [${TELEGRAM_CHAT_ID}] msg [${msg}]`);
  bot.sendMessage(TELEGRAM_CHAT_ID, msg);
};

try {
  main();
} catch (error) {
  console.error(error);
}
