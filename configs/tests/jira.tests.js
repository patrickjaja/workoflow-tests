import { createTestCase, createTestCaseWithAsserts } from './common.js';

const jiraTests = [
  createTestCaseWithAsserts({
    description: "JIRA: Get issue details from URL",
    query: "Erkläre mir das Jira Ticket https://nexus-netsoft.atlassian.net/browse/GH-1",
    messageId: "jira-test-001",
    requirements: `The response should:
      1. Reference the issue key GH-1
      2. Provide the issue summary/title
      3. Include the current status
      4. Be in German language
      5. Be helpful and professional`,
    additionalAsserts: [
      { type: 'contains', value: 'GH-1' },
      { type: 'not-contains', value: 'ich werde' },
      { type: 'not-contains', value: 'I will' }
    ]
  }),

  createTestCaseWithAsserts({
    description: "JIRA: Search open issues in project",
    query: "Zeige mir offene Tickets im Projekt GH",
    messageId: "jira-test-002",
    requirements: `The response should:
      1. List tickets from the GH project
      2. Include ticket numbers (GH-*) and brief summaries
      3. Be in German language
      4. Be informative about ticket status`,
    additionalAsserts: [
      { type: 'contains', value: 'GH-' }
    ]
  }),

  createTestCase({
    description: "JIRA: Get sprint information",
    query: "Welche Tickets sind im aktuellen Sprint des Projekts GH?",
    messageId: "jira-test-003",
    requirements: `The response should:
      1. Provide sprint tickets OR indicate no active sprint OR explain temporary issues
      2. Be in German language
      3. Be helpful (provide data, explain status, or suggest retry)`
  })
];

export default jiraTests;
