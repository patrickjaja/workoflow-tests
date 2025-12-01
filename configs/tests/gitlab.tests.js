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
      1. Provide information about the pipeline or merge request
      2. Include pipeline ID or reference
      3. Be in German language
      4. Be helpful and informative about the CI/CD status`,
    additionalAsserts: [
      { type: 'icontains', value: 'pipeline' }
    ]
  })
];

export default gitlabTests;
