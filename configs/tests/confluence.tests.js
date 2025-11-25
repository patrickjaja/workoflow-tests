const { createTestCase } = require('./common');

const confluenceTests = [
  createTestCase({
    description: "Confluence: Search pages",
    query: "Suche in Confluence nach Onboarding Dokumentation",
    messageId: "confluence-test-001",
    requirements: `Response should:
      1. Search Confluence for onboarding docs
      2. List found pages with titles
      3. Be in German language
      4. Be helpful and informative`
  })
];

module.exports = confluenceTests;
