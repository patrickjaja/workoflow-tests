// Promptfoo configuration in JavaScript format
// This provides more flexibility and reusability compared to YAML

// Helper function to create LLM rubric assertions
const createLLMRubric = (requirements) => ({
  type: 'llm-rubric',
  provider: {
    id: 'azure:chat:gpt-4o-mini'
  },
  value: requirements
});

// Helper function to create test cases with common structure
const createTestCase = ({ description, query, locale = 'de-DE', messageId, requirements }) => ({
  description,
  vars: {
    query,
    timestamp: "2025-01-06T10:00:00.000Z",
    messageId,
    locale
  },
  assert: [createLLMRubric(requirements)]
});

// Test case definitions
const testCases = [
  createTestCase({
    description: "Test training inquiry in German",
    query: "is there a special training related to testing that valantic offers? Whats a person of contact and whats its price?",
    locale: "en-US",
    messageId: "test-msg-001",
    requirements: `The response should comprehensively answer the user's question about manual testing training.
    
    Required elements:
    1. Confirms that manual testing training is available
    2. Lists specific training topics/content (e.g., regression testing, functional testing, UI testing, exploratory testing)
    3. Provides the contact person's name (should be Michael Blum or another specific person)
    4. Includes contact details (email and/or phone number)
    5. States the exact price (should be around 7,500 Euro or provide pricing information)
    6. Response is in english language
    7. Professional and helpful tone`
  }),

  createTestCase({
    description: "Test e-commerce trends consulting inquiry in German",
    query: "gibt es ein spezielle Angebot innerhalb der valantic cec wo wir dem Kunden spezielle auf zukünftige trends im ecommerce beraten? wenn ja was kostet es und wer ist der ansprechpartner?",
    messageId: "test-msg-002",
    requirements: `The response should comprehensively answer the user's question about e-commerce trends consulting services.
    
    Required elements:
    1. Confirms that a special e-commerce trends consulting service exists ("Digital Trend Radar")
    2. Describes the service scope including:
       - Impulse presentation on latest trends in digital markets
       - Value-creating discussion on how to benefit from trends
       - Joint identification and evaluation of relevant trends
       - New market insights and opportunities in e-commerce
    3. Provides the contact person (Dr. Philipp Hoberg)
    4. Includes contact details (email: philipp.hoberg@cec.valantic.com and phone: +49 157 80698214)
    5. States the exact price (2,500 € fixed price)
    6. Mentions duration (approx. 2 hours presentation, 1-2 hours discussion plus preparation/follow-up)
    7. Response is in German language
    8. Professional and helpful tone`
  }),

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

  createTestCase({
    description: "Manual testing training inquiry in German",
    query: "Ein Kunden von mir möchte Manuelles testing erlernen oder Trainiert werden. Haben wir eine Möglichkeit das zu tun und wenn ja wer ist der ansprechpartner und was kostet das ganze?",
    messageId: "test-msg-004",
    requirements: `The response should confirm manual testing training availability and provide details.
    
    Required elements:
    1. Confirms that manual testing training is offered
    2. Describes training content (regression testing, functional testing, UI testing, exploratory testing, best practices)
    3. States target audience (testing teams, system administrators, project managers, management)
    4. Provides contact person: Michael Blum (Head of Quality Assurance)
    5. Includes contact details (michael.blum@cec.valantic.com, +49 172 7683 797)
    6. States price: 7,500 € (fixed price workshop)
    7. Response is in German language`
  }),

  createTestCase({
    description: "Test management consulting inquiry",
    query: "Können wir einen kunden bzgl Testmanagement beraten? Der Kunden wünscht eine Beratung hinsichtlich seine bisherigen Vorgehen? Haben wir das etwas was wir anbieten können?",
    messageId: "test-msg-005",
    requirements: `The response should confirm test management consulting availability.
    
    Required elements:
    1. Confirms test management consulting is available
    2. Describes services (analysis, optimization, review of test processes, master test plan creation)
    3. Lists deliverables (presentation of results, improvement recommendations)
    4. States target groups
    5. Provides contact: Michael Blum
    6. Includes contact details
    7. States price: 7,500 € fixed price workshop
    8. Response is in German language`
  }),

  createTestCase({
    description: "Load and performance testing support",
    query: "Ein Kunden möchte gerne Load & Performance Test durchführen vor seinem GoLive, können wir da unterstützen?",
    messageId: "test-msg-006",
    requirements: `The response should confirm load & performance testing support.
    
    Required elements:
    1. Confirms that valantic CEC can professionally support load & performance testing before GoLive
    2. Lists test types: Load-, Stress-, Spike- und Endurance/Soak-Tests
    3. Describes services including:
       - Identification and testing of relevant user stories and scenarios
       - Identification of application endpoints to test
       - Requirements alignment (user numbers, response times, thresholds)
       - Definition of key metrics for reporting
       - Results presentation with concrete recommendations
    4. States benefits:
       - Increased system security and stability before GoLive
       - Reduced downtime and costs through early error detection
       - Optimal performance and scalability under load
    5. Lists target groups: Testing-Teams, Systemadministratoren aus IT, Projektleiter, Programmmanager, Management
    6. States price: Workshop zum Festpreis von 7.500 €
    7. Provides contact: Michael Blum, Head of Quality Assurance
    8. Includes contact details: michael.blum@cec.valantic.com, +49 172 7683 797
    9. Response is in German language`
  }),

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

  createTestCase({
    description: "Testing recommendations for password reset ticket",
    query: "Wie würdest du mir empfehlen das Ticket https://nexus-netsoft.atlassian.net/browse/PRYMSW-57 zu testen?",
    messageId: "test-msg-008",
    requirements: `The response should provide comprehensive testing recommendations.
    
    Required elements:
    1. Lists specific test cases (validity testing, single vs bulk resets, multiple usage)
    2. Includes edge cases and negative tests
    3. Mentions regression testing
    4. Considers usability and user communication
    5. Professional testing approach
    6. Response is in German language`
  }),

  createTestCase({
    description: "Current sprint tickets inquiry",
    query: "Welche Tickets liegen gerade im Sprint von diesem Projekt https://nexus-netsoft.atlassian.net/jira/software/c/projects/GH/boards/1136",
    messageId: "test-msg-009",
    requirements: `The response should handle the sprint ticket inquiry appropriately.
    
    Required elements:
    1. Either lists current sprint tickets OR indicates technical difficulties accessing the board
    2. If unable to access, suggests direct login to Jira
    3. Offers alternative assistance
    4. Response is in German language`
  }),

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

// Main configuration export
module.exports = {
  providers: [
    {
      id: 'http',
      label: 'n8n-webhook',
      config: {
        url: '{{ env.N8N_WEBHOOK_URL }}',
        apiKey: '{{ env.AZURE_API_KEY }}',
        apiHost: '{{ env.AZURE_API_HOST }}',
        apiVersion: '{{ env.AZURE_API_VERSION }}',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic {{ env.N8N_BASIC_AUTH_ENCODED }}'
        },
        body: {
          text: '{{query}}',
          type: 'message',
          channelId: 'msteams',
          timestamp: '{{__currentDate__}}',
          localTimestamp: '{{__currentDate__}}',
          id: '{{messageId}}',
          from: {
            name: 'Test User',
            aadObjectId: 'test-user-id',
            id: `user-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`
          },
          conversation: {
            conversationType: 'personal',
            tenantId: 'test-tenant-id',
            id: '{{messageId}}'
          },
          locale: '{{locale}}',
          localTimezone: 'Europe/Berlin'
        },
        transformResponse: 'json.response || json.text || json'
      }
    }
  ],
  
  prompts: ['{{query}}'],
  
  tests: testCases
};

// Optional: Export individual components for testing or reuse
module.exports.createTestCase = createTestCase;
module.exports.createLLMRubric = createLLMRubric;