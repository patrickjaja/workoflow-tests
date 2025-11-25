# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [2025-11-25]

### Added
- Modular test structure with separate test files per agent
  - `configs/tests/common.js` - Shared helper functions
  - `configs/tests/main-agent.tests.js` - Main agent test cases
  - `configs/tests/system-tools.tests.js` - System tools tests
  - `configs/tests/jira.tests.js` - Jira integration tests
  - `configs/tests/sharepoint.tests.js` - SharePoint tests
  - `configs/tests/confluence.tests.js` - Confluence tests
  - `configs/tests/gitlab.tests.js` - GitLab tests
  - `configs/tests/trello.tests.js` - Trello tests
  - `configs/tests/sap-c4c.tests.js` - SAP C4C tests
- CHANGELOG.md to document project changes

### Changed
- Upgraded Node.js base image from 18-alpine to 20-alpine in Dockerfile.test
- Refactored `configs/promptfoo.config.js` to use modular test imports
- Updated test user identifiers to use proper AAD Object IDs and Tenant IDs
