const { createTestCase } = require('./common');

const trelloTests = [
  createTestCase({
    description: "Trello: List boards",
    query: "Zeige mir meine Trello Boards",
    messageId: "trello-test-001",
    requirements: `Response should:
      1. List Trello boards OR explain integration status OR indicate temporary issues
      2. Be helpful (show data, provide setup guidance, or suggest retry)
      3. Be in German language
      4. Respond appropriately to the user's request`
  })
];

module.exports = trelloTests;
