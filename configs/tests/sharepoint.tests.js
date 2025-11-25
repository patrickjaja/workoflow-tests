const { createTestCase, createTestCaseWithAsserts } = require('./common');

const sharepointTests = [
  createTestCaseWithAsserts({
    description: "SharePoint: Search documents with KQL",
    query: "Suche im SharePoint nach 'town hall' Meeting Aufnahmen",
    messageId: "sharepoint-test-001",
    requirements: `Response should:
      1. Search SharePoint for meeting recordings
      2. Present results with file names and/or links
      3. Be in German language
      4. Be helpful and informative`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' },
      { type: 'not-contains', value: 'nicht verfügbar' }
    ]
  }),

  createTestCase({
    description: "SharePoint: Search for documentation",
    query: "Finde API Dokumentation im SharePoint",
    messageId: "sharepoint-test-002",
    requirements: `Response should:
      1. Search for API documentation files
      2. List found documents with clickable links
      3. Preserve markdown link formatting [text](url)
      4. Be in German language`
  })
];

module.exports = sharepointTests;
