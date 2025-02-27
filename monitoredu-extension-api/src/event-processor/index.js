const { default: axios } = require("axios");

const endpoint = process.env.GQL_ENDPOINT;
const key = process.env.GQL_API_KEY;

exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      const {
        session_code,
        event: eventName,
        event_description,
        event_timestamp,
      } = messageBody;

      // Get current session events
      const session = await GQLPoster(FetchEventsToUpdateQuery, {
        session_code,
      });

      // Update events
      await GQLPoster(UpdateEventQuery, {
        input: {
          session_code,
          events: [
            ...session.data.getExtensionSession.events,
            {
              event: eventName,
              event_description,
              event_timestamp: new Date(event_timestamp).toISOString(),
            },
          ],
        },
      });
    }
    return { statusCode: 200, body: "Events processed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function GQLPoster(query, variables) {
  const headers = {
    "x-api-key": key,
  };

  const response = await axios.post(
    endpoint,
    JSON.stringify({ query, variables }),
    { headers }
  );
  return response.data;
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
