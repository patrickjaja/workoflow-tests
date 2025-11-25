const { createTestCaseWithAsserts } = require('./common');

const sapC4cTests = [
  createTestCaseWithAsserts({
    description: "SAP C4C: Search leads",
    query: "Suche nach Leads im SAP C4C System",
    messageId: "sap-c4c-test-001",
    requirements: `Response should:
      1. Search and list leads from SAP C4C
      2. Include lead names and/or status
      3. Be in German language
      4. Be informative about the leads found`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' }
    ]
  })
];

module.exports = sapC4cTests;
