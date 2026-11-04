# Jannah Path

A free, mobile-friendly Islamic daily companion, built as a static site for GitHub Pages and designed to work inside a future Telegram Mini App.

## Features

- Quran surah directory, search, Arabic text, and English translation (loaded from [AlQuran Cloud](https://alquran.cloud/) when online; the surah directory is available offline).
- Daily duas with Arabic, transliteration, meaning, references, category filters, and copy action.
- Digital tasbih with multiple dhikr options, undo/reset, and locally saved count.
- Islamic reminders, a five-question knowledge quiz, and a daily good-deeds checklist.
- Responsive mobile layout, optional dark theme, keyboard-friendly controls, and local-device persistence.
- Optional Telegram Web App SDK integration; all core UI also works in a regular browser.

## Run locally

Open `index.html` in a browser, or serve this folder with any static web server. The Quran text and translation require an internet connection; the rest of the app is static.

## Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)`, then save.
4. Open the Pages URL shown in Settings after the deployment completes.

No build step, backend, secrets, or paid hosting is required. GitHub Pages may take a few minutes to publish a change.

## Telegram Mini App

After publishing over HTTPS, configure the site URL as your Telegram bot's Mini App URL using BotFather. The app includes the official Telegram Web App SDK and safely calls `ready()` / `expand()` when opened in Telegram. A bot and Telegram-side configuration are not included; no bot token should be added to this static repository.

Tasbih counts, theme selection, and the deeds checklist are stored in the user's browser local storage. This static app does not sync data across devices or send push notifications.
