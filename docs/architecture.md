# Architecture plan (summary)

Not legal advice. A health privacy lawyer must confirm the custodian structure before any real data.

## Phases
- Phase 0 (portfolio): synthetic data only. Next.js and TypeScript, Supabase free, Stripe test mode, mock lab partner, FHIR-shaped result tables, everything behind owned adapter interfaces.
- Phase 1 (pilot): all health data in Canada (ca-central-1 and ca-west-1), including database, backups, logs, files and AI inference. Custodian structure decided first.
- Phase 2 (assurance): a GRC platform plus a SOC 2 Type II observation window (3 to 12 months).
- Phase 3 (scale): a separate analytics and ML account fed only by a consent-gated de-identification gate; Quebec; imaging.

## Design principles
1. Identity data and clinical data in separate stores, linked by a random ID.
2. Vendors get the minimum: no results in email, SMS or payment descriptors.
3. One versioned consent ledger with purposes (care, ML research, marketing).
4. Append-only audit log of every health-data read, in a separate account.
5. AI drafts only; a licensed clinician signs off.
6. Python only in the ML zone; TypeScript everywhere else.

## Ports (interfaces we will own, written when first used)
auth, billing, lab partner, mailer, AI drafts. One interface in `packages/core`, one implementation each in `packages/adapters`. Apps wire them together in one composition file.

## Regimes to cover
- PIPEDA: vendor accountability, breach reporting on real risk of significant harm, transparency about foreign processing.
- Provincial health acts (NL PHIA, Ontario PHIPA, Manitoba PHIA, Alberta HIA): apply to custodians; the company is likely an information manager or agent unless it runs its own clinic entity.
- Quebec Law 25: keep Quebec out until Phase 3.

## Open items (not verified)
- Whether Supabase's free plan offers the Canada region.
- Which Bedrock inference profile keeps the chosen model inside Canada.
- Provincial rules on who may order private-pay tests.
- Whether Health Canada medical-device rules apply to result-interpreting software.
- Product name and colour palette are not final.
