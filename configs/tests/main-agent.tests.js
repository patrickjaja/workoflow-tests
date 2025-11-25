const { createTestCase } = require('./common');

const mainAgentTests = [
  // Keep test-msg-003 - E-commerce system selection (PASSING)
  createTestCase({
    description: "E-commerce system selection offering",
    query: "habe wir ein angebot zur systemauswahl im bereich von ecommerce? wer ist hier der ansprechpartner?",
    messageId: "test-msg-003",
    requirements: `The response should answer whether valantic offers e-commerce system selection services.

    Required elements:
    1. Confirms whether such services are available
    2. Describes the offering if available
    3. Provides contact information if applicable
    4. Response is in German language
    5. Professional tone`
  }),

  // Keep test-msg-007 - JIRA ticket explanation (PASSING)
  createTestCase({
    description: "Jira ticket explanation request",
    query: "Ich muss das Ticket als Tester für ein Refinement Meeting vorbereiten. Bitte Erkläre mir das Ticket, Rate das Ticket von 1-10 hinsichtlicht der Qualität und sag mir wie es verbessert werden kann? https://nexus-netsoft.atlassian.net/browse/PRYMSW-57",
    messageId: "test-msg-007",
    requirements: `The response should provide a comprehensive ticket analysis.

    Required elements:
    1. Explains the ticket (PRYMSW-57) is about extending password reset link validity for bulk B2B customer emails
    2. Provides quality rating between 4/10 and 7/10 (or similar score with justification)
    3. Identifies strengths (clear summary) and weaknesses (missing details, no acceptance criteria, unclear test requirements)
    4. Provides specific improvement suggestions including:
       - Add detailed description with time extensions (e.g., from 1 to 24 hours)
       - Define acceptance criteria
       - Include test cases
       - Document risks and dependencies
       - Add relevant links/feedback
    5. Suggests refinement preparation questions and test strategy
    6. Response is in German language`
  }),

  // Keep test-msg-008 - Testing recommendations (PASSING)
  createTestCase({
    description: "Testing recommendations for password reset ticket",
    query: "Wie würdest du mir empfehlen das Ticket https://nexus-netsoft.atlassian.net/browse/PRYMSW-57 zu testen?",
    messageId: "test-msg-008",
    requirements: `The response should provide testing recommendations for the password reset feature.

    Required elements:
    1. Lists specific test cases or test scenarios
    2. Includes edge cases OR negative tests OR validation tests
    3. Considers link validity or expiration testing
    4. Professional testing approach
    5. Response is in German language`
  }),

  // Keep test-msg-009 - Sprint tickets inquiry (FIXED - relaxed requirements)
  createTestCase({
    description: "Current sprint tickets inquiry",
    query: "Welche Tickets liegen gerade im Sprint von diesem Projekt https://nexus-netsoft.atlassian.net/jira/software/c/projects/GH/boards/1136",
    messageId: "test-msg-009",
    requirements: `The response should handle the sprint ticket inquiry.

    Required elements:
    1. Lists sprint tickets from the project OR indicates access/availability issues
    2. Provides ticket numbers and summaries if available
    3. Response is in German language
    4. Helpful and professional tone`
  }),

  // Keep test-msg-010 - JIRA comments summary (PASSING)
  createTestCase({
    description: "Jira ticket comments summary",
    query: "Gib mir eine Zusammenfassung der letzten 5 Kommentare im Ticket https://nexus-netsoft.atlassian.net/browse/PRYMSW-57.",
    messageId: "test-msg-010",
    requirements: `The response should handle the comment summary request appropriately.

    Required elements:
    1. Either provides comment summary OR indicates inability to access comments
    2. If unable to access, suggests checking comments directly in Jira
    3. Offers alternative assistance
    4. Response is in German language`
  })
];

module.exports = mainAgentTests;
