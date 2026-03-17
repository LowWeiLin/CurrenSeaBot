require("dotenv").config();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, CURRENSEA_BASE, CURRENSEA_SYMBOL } =
  process.env;
const missingEnvVars = [
  "TELEGRAM_TOKEN",
  "TELEGRAM_CHAT_ID",
  "CURRENSEA_BASE",
  "CURRENSEA_SYMBOL",
].filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  process.exit(1);
}

const baseCurrency = CURRENSEA_BASE.toUpperCase();
const quoteCurrency = CURRENSEA_SYMBOL.toUpperCase();

const EXCHANGE_RATE_URL = "https://api.exchangerate.fun/latest";
const TELEGRAM_SEND_MESSAGE_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

const fetchCurrencyRate = async () => {
  const url = new URL(EXCHANGE_RATE_URL);

  url.searchParams.set("base", baseCurrency);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Exchange rate request failed with status ${response.status}`,
    );
  }

  const data = await response.json();
  const rate = data?.rates?.[quoteCurrency];

  if (typeof rate !== "number") {
    throw new Error(
      `Exchange rate API did not return a numeric rate for ${quoteCurrency}`,
    );
  }

  return rate;
};

const sendTelegramMessage = async (message) => {
  const response = await fetch(TELEGRAM_SEND_MESSAGE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    const description = data?.description ? `: ${data.description}` : "";
    throw new Error(
      `Telegram sendMessage failed with status ${response.status}${description}`,
    );
  }
};

const main = async () => {
  const rate = await fetchCurrencyRate();
  const msg = `${baseCurrency}/${quoteCurrency} = ${rate}`;

  console.log(`Sending to [${TELEGRAM_CHAT_ID}] msg [${msg}]`);
  await sendTelegramMessage(msg);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
