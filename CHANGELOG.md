# Changelog

## Unreleased — Phase 0 stabilization, 2026-10-04

### Changed

- Pin the development/build runtime to Node 22.23.3 and align CI/hosting configuration.
- Upgrade Next.js/eslint-config-next to 16.3.8, React/React DOM to 19.3.0, axios to 1.20.0, and Jest tooling to 30.5.2; refresh compatible transitive dependency patches.
- Remove unused next-intl build integration and unused third-party/cookie/state/JWT dependencies; retain locale constants/messages for later reviewed localization.
- Regenerate route types before typecheck; enforce zero lint warnings; add a repeatable quality command.
- Enable standalone output and repair Docker workdir/static/public-asset/non-root runtime assumptions.
- Exclude generated verification/build artifacts from source lint/typecheck/test-module indexing.

### Security

- Withdraw public mock login, JWT issuance, listing, and order API routes.
- Remove embedded demo accounts and browser-storage authentication/token forwarding.
- Require a nonempty server-configured administration key for lead reads in every environment, using exact constant-time comparison.

### Verification

- Add regression tests for browser-controlled identity, legacy logout/storage failure, and unconfigured/incorrect admin keys.
- Add clean-snapshot and normal/standalone HTTP verification with saved dependency/runtime evidence.
- Record remaining development-only lint dependency findings and external CI/branch/container/hosting gates in the Phase 0 verification handoff.

No release tag, remote CI success, deployment, or production readiness is implied by this unreleased entry.
