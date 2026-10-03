# Biometric Access

A Next.js portfolio dashboard for a biometric access-control flow. The reader integration is represented by a local WebSocket mock that emits three continuous scan events.

## Run locally

Install the application dependencies and start Next.js:

```bash
npm install
npm run dev
```

In a second terminal, start the biometric reader mock:

```bash
cd mocked-biometric-socket
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000).

The mock sends `step: 1`, `step: 2`, and `step: 3` automatically through `ws://localhost:5677`. The interface updates each reading without requiring another button click.

## Build

```bash
npm run build
npm run start
```

This project is a visual portfolio simulation and does not capture or store real biometric data.
