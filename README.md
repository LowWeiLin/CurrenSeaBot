# CurrenSeaBot

Dead simple serverless telegram bot to send currency rates on a schedule.

- https://api.exchangerate.fun/latest for exchange rate API
- Telegram Bot API for message delivery
- GitHub Actions to trigger messages on a cron schedule

## Running locally

- Use Node.js 22 or newer
- Create a telegram bot and get the API token
- Get the chat id you want to send updates to
- Copy `.env.example` to `.env` and set the values
- The bot requests all rates for `CURRENSEA_BASE` from FreeExchangeRateApi and selects `CURRENSEA_SYMBOL` locally
- Run `npm start` to fetch exchange rates and send a telegram message

## Deploying via Github Actions

- Update cron schedule in `.github/workflows/action.yml` as desired
- Add/update GitHub Actions secrets `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID`
- Add/update GitHub Actions variables `CURRENSEA_BASE` and `CURRENSEA_SYMBOL`
- Push, trigger the workflow manually, or wait for cron to run
