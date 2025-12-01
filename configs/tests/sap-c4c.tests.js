import { createTestCaseWithAsserts } from './common.js';

const sapC4cTests = [
  createTestCaseWithAsserts({
    description: "SAP C4C: List last 3 leads",
    query: "zeige mir die letzten 3 leads aus sap c4c",
    messageId: "sap-c4c-test-001",
    requirements: `Response should:
      1. Return 3 leads from SAP C4C
      2. Include lead names and company (Firma)
      3. Include status
      4. Be in German language`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' },
      { type: 'icontains', value: 'lead' },
      { type: 'icontains', value: 'status' }
    ]
  })
];

export default sapC4cTests;
