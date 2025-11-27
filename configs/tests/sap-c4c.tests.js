import { createTestCaseWithAsserts } from './common.js';

const sapC4cTests = [
  createTestCaseWithAsserts({
    description: "SAP C4C: List last 3 leads",
    query: "zeige mir die letzten 3 leads aus sap c4c",
    messageId: "sap-c4c-test-001",
    requirements: `Response should:
      1. Return exactly 3 leads from SAP C4C
      2. Include lead details: LeadID, ObjectID, Name/Betreff, Account/Firma, Lead-Status
      3. Include creation date (Erstellungsdatum)
      4. Include contact information fields (E-Mail, Telefon)
      5. Include Detail-URL for each lead
      6. Mention sorting by CreationDateTime (descending)
      7. Be in German language
      8. Indicate pagination status (has_more, next_skip)`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' },
      { type: 'contains', value: 'LeadID' },
      { type: 'contains', value: 'ObjectID' },
      { type: 'contains', value: 'Lead-Status' },
      { type: 'contains', value: 'Erstellungsdatum' },
      { type: 'contains', value: 'Detail-URL' },
      { type: 'contains', value: 'Kontakt' },
      { type: 'javascript', value: '(output) => output.match(/LeadID.*?\\d+/g)?.length === 3' }
    ]
  })
];

export default sapC4cTests;
