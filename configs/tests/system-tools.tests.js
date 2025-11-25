import { createTestCase } from './common.js';

const systemToolsTests = [
  // Removed system-test-001 (vacation policy) - KB content doesn't exist

  createTestCase({
    description: "System Tools: Employee search by skills",
    query: "Wer bei valantic hat Python Skills?",
    messageId: "system-test-002",
    requirements: `Response should:
      1. List employees with Python skills
      2. Include names and relevant details (roles, departments, or contact info)
      3. Be in German language
      4. Be helpful and professional`
  }),

  createTestCase({
    description: "System Tools: Company events",
    query: "Welche valantic Events finden diesen Monat statt?",
    messageId: "system-test-003",
    requirements: `Response should:
      1. List upcoming events OR indicate no events found
      2. Include event dates and descriptions if available
      3. Be in German language
      4. Be helpful and informative`
  }),

  createTestCase({
    description: "System Tools: Web search",
    query: "Suche nach den neuesten Next.js 15 Features",
    locale: "de-DE",
    messageId: "system-test-004",
    requirements: `Response should:
      1. Provide search results about Next.js 15
      2. Include relevant features or information found
      3. Be in German language
      4. Cite sources if available`
  })
];

export default systemToolsTests;
