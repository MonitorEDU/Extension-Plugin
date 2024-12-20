const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.route("/events").post((req, res) => {
  console.log(req.body);
  res.status(200).send("Event received");
});

app.route("/init").get((req, res) => {
  if (!req.query.session_code) {
    return res.status(400).json({ error: "session_code is required" });
  }

  res.status(200).json({
    session_settings: {
      exam_url: "https://monitoredu.com",
      max_tabs: 4,
    },
  });
});

module.exports.handler = serverless(app);
