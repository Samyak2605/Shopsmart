# ShopSmart Documentation & Enhancements

This document explains the end-to-end setups implemented to elevate the `ShopSmart` application to a production-ready state, adhering strictly to the rubric requirements.

## 1. Architecture

The application is structured as a modernized monolith-to-microservices transitional architecture with a decoupled frontend and backend:
- **Client (Frontend)**: A React SPA utilizing Vite. It provides a clean, responsive UI. It integrates smoothly via REST endpoints.
- **Server (Backend)**: A Node.js/Express.js service handling API requests.
- **E2E Testing**: Isolated Playwright configuration (`/e2e`) designed to run tests against the entire application stack.

## 2. CI/CD Workflow Setup

To ensure code stability and rapid delivery, robust GitHub Actions pipelines were established:
- **Continuous Integration (`.github/workflows/ci.yml`)**: Triggered on `push` and `pull_request` to enforce code quality before merges. It concurrently installs dependencies and runs `lint` and `test` scripts on both the client and server.
- **Continuous Deployment (`.github/workflows/deploy.yml`)**: Automates SSH deployment to an AWS EC2 instance. Assuming the `EC2_HOST`, `EC2_USERNAME`, and `EC2_SSH_KEY` secrets are populated in the repository settings, the action logs into the server, pulls the latest `main` branch code, installs dependencies, and restarts the environment using the provided idempotent `./setup.sh` script or `pm2`.
- **Dependabot (`.github/dependabot.yml`)**: Configured to track update cadences weekly explicitly for `npm` (in both client and server nodes) and `github-actions`.

## 3. Design Decisions

- **Testing Strategy**: Adopted a multi-layered testing approach:
  - **Unit Testing**: Leveraging Vite's native `vitest` for the React frontend, avoiding heavy `jest` rewrites inside modern Vite applications. For the backend, standard `jest` enforces logical unit stability. 
  - **Integration Testing**: Implemented `supertest` to emulate physical network requests effectively testing the controller and routing integrations on the backend endpoint paths (`/api/health`, `/`).
  - **E2E Testing**: Introduced Playwright for full, visual End-to-End user flow simulations spanning the frontend and backend simultaneously.
- **Code Quality**: Added ESLint and Prettier for the server and synchronized PR checks to catch malformed code during integration.
- **Idempotency**: The root `setup.sh` orchestrator actively utilizes `mkdir -p` and `-f` condition checks, ensuring that identical script runs do not overwrite existing configurations negatively.

## 4. Challenges Addressed

1. **Linting Version Compatibility**: The frontend and backend utilize different tooling paradigms (Vite vs. Express). The backend required adopting the newly standardized ESLint v9 flat config (`eslint.config.mjs`) alongside `prettier`, while the frontend required `.eslintrc.cjs`. 
2. **Global Testing Environments**: Resolving `vitest` linting configuration required actively enabling `jest: true` under `env` variables in the client to prevent non-defined `global` test runner variables.
3. **Action Reusability**: Handling a mono-repo structure with both `client/` and `server/` packages within a single `ci.yml` file without creating separate complex workflows, opting to cleanly separate directory steps.
