import { createTestCaseWithAsserts } from './common.js';

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

  createTestCaseWithAsserts({
    description: "GitLab: Pipeline status for specific MR",
    query: "Wie ist der Status dieser gitlab pipeline? https://gitlab.nxs360.com/team-dtag/spryker/-/merge_requests/3175",
    messageId: "gitlab-test-002",
    requirements: `Response should:
      1. Show pipeline status (passed/failed/running)
      2. Include pipeline URL or reference
      3. Include duration or timing information
      4. List some job names or results
      5. Be in German language`,
    additionalAsserts: [
      { type: 'contains', value: 'Pipeline' },
      { type: 'contains', value: 'gitlab.nxs360.com' }
    ]
  })
];

export default gitlabTests;
