# CS 499 Milestone Two Enhancement Plan

## Original State

The baseline is the completed CS 465 Travlr Getaways Module Seven application at commit `23c6bee0e5514bf92b157594383bce330d835323`. It includes an Express and Handlebars customer site, a REST API backed by MongoDB and Mongoose, an Angular administrator client, and JWT-protected trip management operations.

The review found a predictable development JWT fallback, a hard-coded CORS client origin, repeated trip validation in add and update controllers, raw internal exception messages in some API responses, and no backend test command.

## Planned Changes

1. Require configured JWT and client-origin values in production while retaining practical, explicitly development-only defaults.
2. Document `JWT_SECRET`, `CLIENT_ORIGIN`, and the existing database host setting in `.env.example`.
3. Centralize the canonical trip fields and request-body validation in small reusable middleware.
4. Add reusable API error helpers that log details server-side and return safe client messages.
5. Apply the safe error handling consistently to trip and authentication controllers and unexpected API errors.
6. Add focused backend tests with Node's built-in test runner for validation, authentication rejection, safe server errors, and security configuration.
7. Run backend tests and the existing Angular test/build commands, then document the verified results in `ENHANCEMENT_SUMMARY.md`.

No application rewrite, unrelated UI changes, database redesign, or future feature work is planned.
