# Claude AI Assistant Guide

This document provides context and workflows for AI assistants working on this project.

## Project Context

For comprehensive project understanding, read:
1. **[README.md](README.md)** - Quick start guide and available commands
2. **[configs/promptfoo.yaml](configs/promptfoo.yaml)** - Test configuration and cases

## Project Summary
This is an E2E testing framework for an n8n webhook agent that uses semantic validation to ensure AI responses remain consistent even after RAG (vector store) updates. We use Promptfoo with Azure OpenAI for semantic testing.

## Key Technologies
- **Promptfoo**: LLM testing framework
- **Azure OpenAI**: Semantic validation (gpt-4o-mini)
- **Docker**: Containerization
- **n8n**: Webhook agent being tested
- **ESLint**: Static code analysis (v9 flat config)

## Linting (REQUIRED before commits)

**RULE: Always run linting before committing code changes.**

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors where possible
npm run lint:fix
```

The project uses ESLint 9 with:
- Node.js environment globals
- Security plugin (eslint-plugin-security) for vulnerability detection
- Flat config format (eslint.config.js)

## Testing Workflow After Adding Features

### 1. When Adding New Test Cases

After adding a new test case to `configs/promptfoo.yaml`:

```bash
# 1. Rebuild Docker image if dependencies changed
npm run docker:build

# 2. Run the new tests
npm run test:e2e

# 3. Check specific test by name
npm run test:filter "your test name"

# 4. View results
npm run test:view
# Opens http://localhost:8080
```

### 2. When Modifying Test Logic

After changing evaluation logic or assertions:

```bash
# 1. Validate YAML syntax
npm run test:dry-run

# 2. Run tests with verbose output
npm run test:verbose

# 3. Export results for analysis
npm run test:export
```

### 3. When Updating Dependencies

After modifying `package.json`:

```bash
# 1. Rebuild container with new dependencies
npm run docker:clean
npm run docker:build

# 2. Verify installation
docker-compose run promptfoo-shell npm list

# 3. Run full test suite
npm run test:e2e
```

### 4. When Adding New Features

Complete workflow for new features:

```bash
# 1. Update test configuration
# Edit: configs/promptfoo.yaml

# 2. Test locally first
npm run test:e2e

# 3. Run full test suite
docker-compose up

# 4. Commit changes
git add .
git commit -m "Add [feature]: [description]"

# 5. CI/CD will run automatically on push
```

## Common Tasks

### Debugging Failed Tests
```bash
# View detailed logs
docker-compose logs -f promptfoo-shell

# Run single test interactively
npm run docker:shell
> promptfoo eval -c configs/promptfoo.yaml --filter "test name" -v

# Check n8n webhook connectivity
curl -X POST $N8N_WEBHOOK_URL -H "Content-Type: application/json" -d '{"text":"test"}'
```

### Performance Testing
```bash
# Run tests with timing information
npm run test:repeat 3

# Check latency assertions
grep -n "latency" configs/promptfoo.yaml
```

### Semantic Threshold Tuning
```bash
# Test with different thresholds
SEMANTIC_THRESHOLD=0.7 docker-compose run promptfoo-shell
SEMANTIC_THRESHOLD=0.9 docker-compose run promptfoo-shell

# Compare results to find optimal threshold
```

## Important Conventions

1. **Test Naming**: Use descriptive names that explain what is being tested
2. **Language**: Support both German and English in tests
3. **Assertions**: Always include both exact and semantic validations
4. **Documentation**: Update implementation checklist when adding features
5. **Security**: Never commit `.env` file or expose API keys
6. **Linting**: Always run `npm run lint` before committing - fix all errors

## Environment Variables

Key environment variables to be aware of:
- `N8N_WEBHOOK_URL`: Target webhook endpoint
- `AZURE_API_KEY`: Azure OpenAI authentication
- `SEMANTIC_THRESHOLD`: Similarity threshold (0-1)
- `TEST_TIMEOUT`: Maximum test duration in ms

## Troubleshooting

### Common Issues and Solutions

1. **Docker build fails**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild: `npm run docker:clean && npm run docker:build`

2. **Tests timeout**
   - Increase timeout: `TEST_TIMEOUT=60000`
   - Check n8n webhook is accessible

3. **Semantic validation fails**
   - Lower threshold temporarily
   - Review LLM rubric criteria
   - Check Azure API key validity

4. **Permission errors**
   - Fix permissions: `chmod -R 777 test-results/`
   - Run as correct user in Docker

## Quick Reference

```bash
# Setup
cp .env.example .env
npm run docker:build

# Lint (ALWAYS before commit)
npm run lint
npm run lint:fix

# Run tests
npm run test:e2e

# View logs
npm run docker:logs

# Shell access
npm run docker:shell

# Clean up
npm run docker:clean
```

---
*This file helps AI assistants understand and work with this project effectively.*