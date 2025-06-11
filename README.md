# n8n Agent E2E Testing Suite

This repository contains an end-to-end testing suite for n8n webhook agents with semantic response validation using promptfoo.

## Quick Start

1. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Azure OpenAI credentials and n8n webhook URL
   ```

2. **Build Docker Container**
   ```bash
   npm run docker:build
   # or
   docker-compose build
   ```

3. **Run Tests**
   ```bash
   npm run test:e2e
   # or
   docker-compose up
   ```

## Features

- 🎯 Semantic response validation using Azure OpenAI
- 🐳 Docker containerization for consistent testing
- 🌐 Multi-language support (German/English)
- 📊 Web-based test result viewer
- 🔄 CI/CD ready with GitHub Actions support
- 📈 Performance monitoring and latency checks

## Project Structure

```
.
├── configs/              # Promptfoo configuration
│   └── promptfoo.yaml   # Test cases and assertions
├── scripts/             # Shell scripts
│   └── shell.sh        # Container shell access
├── test-results/        # Test output and reports
├── docker-compose.yml   # Docker configuration
├── Dockerfile.test      # Test container definition
└── CLAUDE.md           # AI assistant guide
```

## Available Commands

All commands execute inside Docker containers:

### Testing Commands
- `npm run test:e2e` - Run full test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:view` - Open test results viewer (port 8080)
- `npm run test:filter` - Run specific tests by name
- `npm run test:verbose` - Run tests with verbose output
- `npm run test:dry-run` - Validate configuration without running tests
- `npm run test:repeat` - Run tests multiple times
- `npm run test:export` - Export test results to HTML

### Docker Commands
- `npm run docker:build` - Build Docker containers
- `npm run docker:up` - Start containers in detached mode
- `npm run docker:test` - Run test container interactively
- `npm run docker:shell` - Access container shell
- `npm run docker:logs` - View container logs
- `npm run docker:down` - Stop containers
- `npm run docker:clean` - Clean up containers and test results

## Configuration

Edit `.env` file to configure:
- `N8N_WEBHOOK_URL` - Your n8n webhook endpoint
- `AZURE_API_KEY` - Azure OpenAI API key
- `SEMANTIC_THRESHOLD` - Similarity threshold (default: 0.85)
- `TEST_TIMEOUT` - Test timeout in milliseconds

## Viewing Results

After running tests, view results at http://localhost:8080:
```bash
npm run test:view  # Opens viewer on port 8080
```

## CI/CD Integration

The project includes GitHub Actions workflow for automated testing:
- Located at `.github/workflows/e2e-tests.yml`
- Runs on push and pull requests
- Executes full test suite in Docker

## Troubleshooting

### Common Issues

1. **Docker build fails**
   ```bash
   npm run docker:clean
   npm run docker:build
   ```

2. **Permission errors**
   ```bash
   chmod -R 777 test-results/
   ```

3. **Test timeouts**
   - Increase `TEST_TIMEOUT` in `.env`
   - Check n8n webhook connectivity

4. **View detailed logs**
   ```bash
   npm run docker:logs
   ```

For more detailed information, see [CLAUDE.md](CLAUDE.md) for AI assistant workflows and context.