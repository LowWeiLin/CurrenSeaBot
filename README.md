# CurrenSeaBot

Dead simple serverless telegram bot to send currency rates on a schedule.

- https://exchangerate.host for exchange rate API
- Github Actions to trigger messages on a cron schedule

## Running locally

- Create a telegram bot and get the API token
- Get the chat id you want to send updates to
- Decide and set `.env` variables
- Run `npm start` to fetch exchange rates and send a telegram message

## Deploying via Github Actions

- Update cron schedule in `.github/workflows/action.yml` as desired
- Add/update Github actions secrets and variables
- Push/wait for cron to trigger
