// Promptfoo configuration in JavaScript format
// Multi-agent testing suite - tests split per agent

// Import test cases from separate files
const mainAgentTests = require('./tests/main-agent.tests');
const systemToolsTests = require('./tests/system-tools.tests');
const jiraTests = require('./tests/jira.tests');
const sharepointTests = require('./tests/sharepoint.tests');
const confluenceTests = require('./tests/confluence.tests');
const gitlabTests = require('./tests/gitlab.tests');
const trelloTests = require('./tests/trello.tests');
const sapC4cTests = require('./tests/sap-c4c.tests');

// Re-export common helpers for backward compatibility
const { createLLMRubric, createTestCase, createTestCaseWithAsserts } = require('./tests/common');

// Aggregate all tests
const allTests = [
  ...mainAgentTests,
  ...systemToolsTests,
  ...jiraTests,
  ...sharepointTests,
  ...confluenceTests,
  ...gitlabTests,
  ...trelloTests,
  ...sapC4cTests
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
            aadObjectId: '45908692-019e-4436-810c-b417f58f5f4f',
            id: `user-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`
          },
          conversation: {
            conversationType: 'personal',
            tenantId: 'ae6f26a3-6f27-4ed6-a3a8-800c3226fb79',
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

  tests: allTests
};

// Export helpers for external use
module.exports.createTestCase = createTestCase;
module.exports.createLLMRubric = createLLMRubric;
module.exports.createTestCaseWithAsserts = createTestCaseWithAsserts;

// Export individual test arrays for selective running
module.exports.mainAgentTests = mainAgentTests;
module.exports.systemToolsTests = systemToolsTests;
module.exports.jiraTests = jiraTests;
module.exports.sharepointTests = sharepointTests;
module.exports.confluenceTests = confluenceTests;
module.exports.gitlabTests = gitlabTests;
module.exports.trelloTests = trelloTests;
module.exports.sapC4cTests = sapC4cTests;
