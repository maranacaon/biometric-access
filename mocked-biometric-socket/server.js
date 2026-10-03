const express = require("express");
const WebSocket = require("ws");

const app = express();
const port = 5677;

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const mockedSocketConnection = [
  {
    data: null,
    message: "credentials.fingerprint.pressSecondTime",
    step: 1,
    modelo: "BIOT",
  },
  {
    data: null,
    message: "credentials.fingerprint.pressThirdTime",
    step: 2,
    modelo: "BIOT",
  },
  {
    data: {
      codigo_digital: "c5335f008d8a1ab50fc3",
    },
    message: "credentials.fingerprint.person",
    step: 3,
    modelo: "BIOT",
  },
];

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  setTimeout(() => {
    ws.send(JSON.stringify(mockedSocketConnection[0]));
  }, 3000);

  setTimeout(() => {
    ws.send(JSON.stringify(mockedSocketConnection[1]));
  }, 6000);

  setTimeout(() => {
    ws.send(JSON.stringify(mockedSocketConnection[2]));
  }, 9000);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
