#!/bin/bash
# Interactive shell for manual promptfoo testing

echo "Starting interactive promptfoo testing shell..."
echo "================================================"
echo "Available commands:"
echo "  promptfoo eval -c configs/promptfoo.yaml    # Run all tests"
echo "  promptfoo eval -c configs/promptfoo.yaml --filter \"test name\"    # Run specific test"
echo "  promptfoo eval -c configs/promptfoo.yaml -v    # Verbose output"
echo "  promptfoo view    # View test results"
echo "  npm run test:e2e    # Run full test suite"
echo "  curl -X POST \$N8N_WEBHOOK_URL -H \"Content-Type: application/json\" -d '{\"text\":\"test\"}'    # Test webhook"
echo "================================================"

docker-compose run --rm promptfoo-shell