const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const endpoint = process.env.GQL_ENDPOINT;
const key = process.env.GQL_API_KEY;

app.use(bodyParser.json());
// ensure responses have headers that allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.route("/events").post(async (req, res) => {
  console.log(req.body);
  const { session_code, event, event_description, event_timestamp } = req.body;
  try {
    // get session first
    const session = await GQLPoster(FetchEventsToUpdateQuery, { session_code });
    console.log(session);
    const response = await GQLPoster(UpdateEventQuery, {
      input: {
        session_code,
        events: [
          ...session.data.getExtensionSession.events,
          {
            event: event,
            event_description: event_description,
            event_timestamp: new Date(event_timestamp).toISOString(),
          },
        ],
      },
    });

    console.log(response);
    res.status(200).json({ message: "Event added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.route("/init").get((req, res) => {
  if (!req.query.session_code) {
    return res.status(400).json({ error: "session_code is required" });
  }

  const session_code = req.query.session_code;

  GQLPoster(GetSessionQuery, { session_code })
    .then((response) => {
      console.log(response);
      res.status(200).json(response.data.getExtensionSession);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.route("/status").get((req, res) => {
  if (!req.query.session_code) {
    return res.status(400).json({ error: "session_code is required" });
  }
  const session_code = req.query.session_code;

  GQLPoster(GetSessionQuery, { session_code })
    .then((response) => {
      console.log(response);
      res.status(200).json(response.data.getExtensionSession);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports.handler = serverless(app);

async function GQLPoster(query, variables) {
  const headers = {
    "x-api-key": key,
  };

  let funcResponse;

  await axios
    .post(endpoint, JSON.stringify({ query, variables }), { headers })
    .then((res) => {
      console.log(res.data);
      funcResponse = res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return funcResponse;
}

const UpdateEventQuery = `
  mutation UpdateExtensionSession($input: UpdateExtensionSessionInput!) {
    updateExtensionSession(input: $input) {
      session_code
      events {
        event
        event_description
        event_timestamp
        }
      status
      type
    }
  }
`;

const GetSessionQuery = `
  query GetExtensionSession($session_code: ID!) {
    getExtensionSession(session_code: $session_code) {
      session_code
      status
      type
      exam_url
      max_tabs
      keep_alive_interval
    }
  }
`;

const FetchEventsToUpdateQuery = `
  query GetExtensionSession($session_code: ID!) {
    getExtensionSession(session_code: $session_code) {
      session_code
      status
      type
      events {
        event
        event_description
        event_timestamp
      }
    }
  }
`;
