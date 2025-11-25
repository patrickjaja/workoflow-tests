// Shared test helpers for promptfoo multi-agent testing

const createLLMRubric = (requirements) => ({
  type: 'llm-rubric',
  provider: {
    id: 'azure:chat:gpt-4o-mini'
  },
  value: requirements
});

const createTestCase = ({ description, query, locale = 'de-DE', messageId, requirements }) => ({
  description,
  vars: {
    query,
    timestamp: new Date().toISOString(),
    messageId,
    locale
  },
  assert: [createLLMRubric(requirements)]
});

// Helper for tests with additional deterministic assertions
const createTestCaseWithAsserts = ({ description, query, locale = 'de-DE', messageId, requirements, additionalAsserts = [] }) => ({
  description,
  vars: {
    query,
    timestamp: new Date().toISOString(),
    messageId,
    locale
  },
  assert: [createLLMRubric(requirements), ...additionalAsserts]
});

module.exports = {
  createLLMRubric,
  createTestCase,
  createTestCaseWithAsserts
};
