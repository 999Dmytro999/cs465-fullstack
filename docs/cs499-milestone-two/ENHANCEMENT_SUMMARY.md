# CS 499 Milestone Two Enhancement Summary

## 1. Artifact

CS 465 Travlr Getaways

## 2. Original Functionality

Travlr Getaways is a full-stack travel application developed across the CS 465 course. It includes an Express and Handlebars customer-facing website, a MongoDB and Mongoose data layer, REST endpoints for trip data, and an Angular administrator client. The administrator client authenticates with a JSON Web Token (JWT) and uses protected API operations to add, update, and delete trips.

## 3. Files Changed

- `.env.example`: Documents safe JWT, client-origin, and database-host configuration.
- `app.js`: Uses a configured CORS allowlist and the API error middleware.
- `app_api/config/environment.js`: Resolves allowed client origins by environment.
- `app_api/config/jwt.js`: Removes the predictable fallback and validates production JWT configuration.
- `app_api/middleware/trip-validation.js`: Defines required trip fields once and validates add/update request bodies.
- `app_api/utils/api-errors.js`: Provides reusable logging and safe client error responses.
- `app_api/controllers/trips.js`: Uses shared validation data, payload construction, and safe error responses.
- `app_api/controllers/authentication.js`: Uses safe shared error handling for registration failures.
- `app_api/routes/index.js`: Applies shared trip validation middleware to protected add and update routes.
- `package.json`: Adds the backend `npm test` command.
- `test-support/response.js`: Supplies a small response mock used by backend unit tests.
- `test/api-errors.test.js`: Tests that internal details are logged but not returned in a 500 response.
- `test/authentication-middleware.test.js`: Tests unauthenticated rejection for protected operations.
- `test/configuration.test.js`: Tests production JWT and CORS configuration requirements.
- `test/trip-validation.test.js`: Tests missing-field rejection and successful validation.
- `docs/cs499-milestone-two/original-commit.txt`: Records the pre-enhancement commit.
- `docs/cs499-milestone-two/enhancement-plan.md`: Records the original state and planned scope.

## 4. Enhancements Implemented

### Validation Refactoring

Trip field names, missing-field detection, payload construction, and request validation now live in one small middleware module. Both POST and PUT routes use the same validation middleware, while both controllers use the same payload builder. This removes duplicated validation code and gives future trip-field changes one maintainable location.

### Safer Error Handling

API controller failures now use shared helpers. Detailed exception objects are logged on the server, while clients receive stable messages without database connection strings, stack traces, or raw exception text. Existing 400, 404, and 409 responses remain meaningful. Unexpected API errors passed through Express also receive a safe JSON response.

### Configuration Improvements

The CORS allowlist now reads `CLIENT_ORIGIN`, including comma-separated origins. Development defaults to `http://localhost:4200`; production fails during startup if no client origin is configured. The existing `DB_HOST` behavior was preserved and documented rather than redesigned.

### JWT Security Improvement

The predictable source-controlled JWT fallback was removed. A configured `JWT_SECRET` is used when present. Production requires a secret of at least 32 characters and fails clearly when the value is absent or too short. Development remains practical by generating a random, process-local secret when none is configured, which means tokens intentionally become invalid after that development process restarts.

### Automated Testing

The project now uses Node's built-in test runner, so no additional backend testing dependencies were required. Nine backend tests cover shared trip validation, unauthenticated access, safe server errors, production JWT requirements, development secret generation, and client-origin configuration.

## 5. Software Design and Engineering Benefits

- Centralized validation reduces duplication and makes the controller functions more focused.
- Configuration helpers clearly separate deployment concerns from application behavior.
- Shared error handling gives API clients consistent responses and keeps diagnostic detail on the server.
- Route-level validation keeps invalid requests out of database-oriented controller logic.
- Focused automated tests make security and validation behavior repeatable and easier to maintain.

## 6. Security Improvements

- No predictable JWT secret remains in source code.
- Production startup rejects missing or weak JWT configuration.
- Production startup rejects a missing client-origin configuration instead of silently allowing localhost assumptions.
- CORS responses are limited to explicitly allowed origins.
- Raw internal exception messages are no longer included in 500 API responses.
- No password, token, or real environment secret was added by this enhancement.

## 7. Testing Performed and Results

- `npm test` in the project root: 9 tests passed, 0 failed.
- `node --check` on all changed backend JavaScript files: all syntax checks passed.
- `npm test -- --watch=false --browsers=ChromeHeadless` in `app_admin`: 2 tests passed, 0 failed.
- `npm run build` in `app_admin`: build completed successfully. The existing initial-bundle budget warning remains.
- `npm start` smoke test with local MongoDB: the home page and travel page returned HTTP 200, the trips API returned four records, the configured localhost CORS preflight returned 204, an untrusted origin returned 403, and an unauthenticated trip write returned 401.

## 8. Limitations and Future Improvements

- This milestone does not redesign the Angular API URL configuration, database connection architecture, authentication workflow, or user interface.
- The backend tests focus on the enhanced units and middleware rather than creating a full isolated MongoDB integration-test environment.
- The existing Angular bundle-size warning is outside this enhancement's focused scope.
- A deployed environment must provide persistent `JWT_SECRET` and `CLIENT_ORIGIN` values through its configuration platform.
