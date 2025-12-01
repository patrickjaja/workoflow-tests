import { createTestCaseWithAsserts } from './common.js';

const sapC4cTests = [
  createTestCaseWithAsserts({
    description: "SAP C4C: List last 3 leads",
    query: "zeige mir die letzten 3 leads aus sap c4c",
    messageId: "sap-c4c-test-001",
    requirements: `Response should:
      1. Return exactly 3 leads from SAP C4C
      2. Include lead details: Lead-Name, Lead-Nummer, Status, Firma
      3. Include creation date (Erstellungsdatum)
      4. Include contact information: Ansprechpartner, E-Mail, Telefon, Adresse
      5. Include creator (Erstellt von)
      6. Be in German language`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' },
      { type: 'contains', value: 'Lead-Name' },
      { type: 'contains', value: 'Lead-Nummer' },
      { type: 'contains', value: 'Status' },
      { type: 'contains', value: 'Erstellungsdatum' },
      { type: 'contains', value: 'Firma' },
      { type: 'contains', value: 'E-Mail' },
      { type: 'contains', value: 'Telefon' },
      { type: 'javascript', value: '(output) => output.match(/Lead-Nummer.*?\\d+/g)?.length === 3' }
    ]
  })
];

export default sapC4cTests;
