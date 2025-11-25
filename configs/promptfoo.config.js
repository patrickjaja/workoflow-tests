// Promptfoo configuration in JavaScript format
// Multi-agent testing suite - tests split per agent

// Import test cases from separate files
import mainAgentTests from './tests/main-agent.tests.js';
import systemToolsTests from './tests/system-tools.tests.js';
import jiraTests from './tests/jira.tests.js';
import sharepointTests from './tests/sharepoint.tests.js';
import confluenceTests from './tests/confluence.tests.js';
import gitlabTests from './tests/gitlab.tests.js';
import trelloTests from './tests/trello.tests.js';
import sapC4cTests from './tests/sap-c4c.tests.js';

// Re-export common helpers for backward compatibility
import { createLLMRubric, createTestCase, createTestCaseWithAsserts } from './tests/common.js';

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
export default {
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
export { createTestCase, createLLMRubric, createTestCaseWithAsserts };

// Export individual test arrays for selective running
export {
  mainAgentTests,
  systemToolsTests,
  jiraTests,
  sharepointTests,
  confluenceTests,
  gitlabTests,
  trelloTests,
  sapC4cTests
};
