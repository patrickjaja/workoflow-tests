const { createTestCase, createTestCaseWithAsserts } = require('./common');

const gitlabTests = [
  createTestCaseWithAsserts({
    description: "GitLab: List repositories",
    query: "Zeige mir meine GitLab Repositories",
    messageId: "gitlab-test-001",
    requirements: `Response should:
      1. List available GitLab repositories
      2. Include repo names (descriptions optional)
      3. Be in German language
      4. Be helpful and informative`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' }
    ]
  }),

  createTestCase({
    description: "GitLab: Pipeline status",
    query: "Was ist der Status der letzten CI/CD Pipeline?",
    messageId: "gitlab-test-002",
    requirements: `Response should:
      1. Show pipeline status OR ask for project clarification OR indicate no pipelines available
      2. Be helpful (provide guidance, list options, or ask clarifying questions)
      3. Be in German language
      4. Engage with the user's request constructively`
  })
];

module.exports = gitlabTests;
