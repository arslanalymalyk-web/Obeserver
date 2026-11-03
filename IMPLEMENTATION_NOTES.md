# Implementation notes: Portfolio & Investor Operations concept prototype

This is a **concept prototype and technical demonstration**, built to show how a real-estate portfolio and investor-operations product could look and behave. It is not a production platform, it is not connected to any ZMNHOOF (or other) system, and nothing in it is evidence that a similar platform has been delivered. All assets, people, figures and documents are fictional.

## How to open it

- **Portfolio prototype (primary):** open `public/demo/index.html` in a browser. It is plain HTML/CSS/JS, needs no server, no install and no network, and works from `file://`.
- **Lead-engagement module (optional, separate):** open `public/demo/voice.html` (also standalone), or use the link in the banner.
- **Tests:** `npm run test:demo` (calculations and data integrity, no dependencies). Browser checks (need Playwright): `node test/browser/demo-flow.js` (52 checks on the portfolio prototype) and `node test/browser/voice-sim.js` (the voice simulation's labelling and behaviour).
- The repository also contains an earlier brokerage lead-management app with a demo Node/Postgres backend (`server.js`, `lib/`, `api/`, `public/platform.html`). It is a separate track, kept intact and now honestly labelled. See "Repository layout".

## What the prototype demonstrates

1. **Portfolio overview:** assets by status, sample portfolio value with its coverage and valuation dates, income, operating costs, NOI, yield against a configurable target, rent-weighted occupancy, change versus the prior period, items needing attention, recent changes, and a data-freshness panel.
2. **Asset registry and detail:** search and filters; per-asset record (type, location, ownership, acquisition, valuation with date and source, occupancy and leases, documents, tasks and exceptions, change history).
3. **Performance and financial visibility:** period selector (month, quarter, trailing 12 months), comparison with the prior period and with target, "n/a" instead of zero when a valuation is missing, CSV export, and the methodology and formulas on screen.
4. **Investor workspace:** a visibly different investor view that shows only approved, published statements, investor-visible documents and non-internal communications.
5. **Documents, tasks, approvals, audit:** review and approval status, owners and due dates, expiring or missing records, and an audit trail that records the demo actions you take.
6. **Statement workflow (the first-slice idea, working in memory):** generate a draft from the sample data, acknowledge the data notes, submit, approve under a second demo role (maker/checker), publish to the investor view, and see an audit entry at each step.
7. **Simulated assistant:** rule-based answers over the sample records with sources, a facts/inference split, stated gaps, and a refusal path for advice and forecasts.
8. **Presentation configuration:** currency label, number/date locale and target yield are settings; English and Arabic (RTL) are supported for interface text.

## What is simulated, and what is real

| Area | Status |
|---|---|
| Asset, valuation, lease, document, investor and communication data | **Fictional sample data** in `public/demo/js/data.js`. Deterministic and local. |
| Financial figures | Computed in the browser by `calc.js` from visible monthly inputs; the formulas are shown in the UI and re-checked by `test/demo-calc.test.js`. The methodology is a sample, not an accounting standard. |
| Exceptions ("needs attention") | Transparent threshold rules (valuation age, lease expiry, occupancy, yield shortfall, document status). No scoring model. Each item shows its rule. |
| Roles (Analyst / Approver, investor view) | **Visual demonstration only.** Nothing is enforced; filtering happens in the browser. |
| Approvals, tasks, statements, documents | Interactive, **in memory only**. Lost on reload. Nothing is stored or secured. "This session" entries mark what you created. |
| "Documents" | Records only. No files exist or are stored. |
| Assistant | **Simulated.** Keyword rules over the sample data. No AI model, no network call. |
| Data connections (ledger, valuations, documents, identity) | **Not connected.** The UI says so. |
| Currency | The currency setting relabels the sample unit. **No FX conversion** is performed. |
| Dates | The demo uses a fixed reference date (2026-10-05) so that results are deterministic; it is not "today". |
| Language | Arabic covers interface text only. Sample record names, assistant answers and exception sentences are English. A native-speaker review is needed before external use. |
| Voice module | A **scripted simulation**. No calls are placed, recorded or transcribed; no messages are sent; nothing syncs to a CRM. Buttons only change the on-screen transcript. |

## What is not implemented

Authentication and authorization; any database or persistence; document storage, versioning and retention; real approvals; tamper-evident audit logging; accounting, banking, valuation, CRM or telephony integrations; investor onboarding and KYC; tax, fee and waterfall calculations; multi-currency and FX; multi-entity and ownership structures beyond a flat percentage; reporting packs and PDF generation; notifications; localisation beyond the interface strings; accessibility testing with assistive technology; cross-browser testing beyond headless Chromium.

## Production components that would need backend services

- Identity, session management and a permission model.
- A relational data store for assets, ownership, valuations, leases, ledger-derived financials, documents' metadata, tasks, approvals, statements and audit events.
- Object storage and malware scanning for documents.
- A financial data pipeline from the source ledger, with period close, restatement handling and lineage.
- A statement/report service with versioning and approval state.
- An append-only, tamper-evident audit service.
- Background jobs (imports, expiry reminders, report generation) and notification delivery.
- Observability, backups and environment promotion.
- If an AI assistant is wanted: a server-side service with retrieval restricted to the caller's permitted data, citation of records, refusal rules, logging, and human review of consequential output. No model key or direct model call belongs in browser code (none exists in this prototype's portfolio pages).

## Security controls that require server-side enforcement

Everything the UI hints at but cannot enforce: who can see which asset, investor or document; investor isolation; internal-only notes; maker/checker on approvals; immutability of published statements and the audit trail; document access and download controls; rate limiting and abuse protection; secrets management; input validation; export controls. The prototype's investor filtering and role switch are explicitly **not** security boundaries.

## Integration details that depend on ZMNHOOF's architecture

Nothing here assumes ZMNHOOF's stack. These need to come from their architecture and backlog: asset classes and hierarchy; ownership and investor structure (direct, fund, SPV, co-investment); the accounting system and chart of accounts; valuation providers and cadence; document and identity systems; currencies and reporting calendars; jurisdictions and regulatory duties; cloud provider and deployment model; existing API conventions; data residency; any reporting obligations to investors or regulators.

## Proposed first delivery slice (subject to ZMNHOOF's architecture, priorities and acceptance criteria; not a timeline commitment)

An end-to-end operational workflow, on real services rather than sample data:

1. **Create or import an asset record** (single create plus CSV/API import).
2. **Validate** required asset and financial fields (types, required fields, valuation date and source, currency) with clear error messages.
3. **View the asset in a portfolio** with ownership.
4. **Review its performance** for a defined period from loaded financial data, showing source and as-of date.
5. **Flag a missing record or exception** (for example, no valuation, expired document) as a tracked task with an owner and due date.
6. **Prepare an investor-visible summary** for one investor and period.
7. **Record operator approval** (second user) and an **auditable change** for every step.

Draft acceptance criteria:

- A user with the right role can create/import an asset, and invalid input is rejected with specific messages.
- Financial figures shown for a period reconcile to the source records and can be reproduced from the displayed inputs; the as-of date, currency and source are visible.
- Missing or stale required data is surfaced and cannot be silently ignored in a summary.
- An investor can only retrieve their own approved summary; a request for another investor's data is refused by the server (tested).
- The preparer cannot approve their own summary; approval is enforced server-side.
- Every create, edit, submit, approve and publish action produces an audit event with actor, time and before/after values, and events cannot be edited.
- Automated tests cover validation, calculation reconciliation, authorization, and the approval flow.

## Risks and open questions to resolve from Mohamed's architecture or backlog

- What is the system of record for financials and ownership, and how clean and timely is that data?
- Which asset classes, entity structures and investor types must the first release support?
- What are the reporting calendar, approval policy, and regulatory duties per jurisdiction?
- Which currencies and languages are in scope, and is Arabic a launch requirement?
- What existing services, identity provider, hosting and CI/CD must the work fit into?
- What is the data-migration scope and who owns data quality?
- Is an AI assistant in scope for the first release, and under what review and data-handling rules?
- What are the non-functional targets (availability, audit retention, performance, accessibility standard)?
- Who are the first real users, and how will they judge success?

## Repository layout

```
public/demo/            Portfolio & Investor Operations prototype (primary), standalone, no network
  index.html            Shell
  js/data.js            Fictional sample data (replace via store.js)
  js/calc.js            Pure calculations (tested)
  js/store.js           Data-access boundary: the only file the UI uses for data
  js/assistant.js       Simulated, rule-based assistant
  js/i18n.js, i18n-ar.js  English source text, Arabic interface strings
  js/app.js             Router and views
  css/demo.css          Styles (system fonts, light/dark, RTL-safe)
  voice.html            Optional lead-engagement simulation (standalone)
public/platform.html, voice.html, login.html, js/, css/, server.js, lib/, api/, db/
                        Earlier brokerage lead-management app with a demo Node/Postgres backend
test/demo-calc.test.js  Calculation and data-integrity tests for the prototype
test/api.test.js        Backend API tests (needs a Postgres via DATABASE_URL)
```

**Why a new prototype rather than editing the existing page:** the existing `platform.html` is a brokerage CRM whose screens (lead scoring, funnel, SMS/WhatsApp sequences, channel ROI) share almost nothing with the required information architecture (assets, valuations, NOI, investors, approvals). Reworking it in place would have destroyed working lead-management features. The CRM app is left functional and now carries a persistent "Concept prototype: sample data" banner, with unsupported claims removed (for example the "91.3% accuracy" model figure, "412% ROI", "Enterprise", "Live"/"AI Active" badges). The shared voice script was edited in place so both voice pages are honest.

## Known limitations of this deliverable

- Verified in headless Chromium only (52 scripted browser checks on the portfolio prototype, a separate suite for the voice simulation, and the calculation tests). Not tested in Safari or Firefox, on real devices, or with a screen reader. Contrast of the prototype palette was computed (all text and status colours at or above 4.5:1 in light and dark themes), but that is not a full accessibility audit.
- `public/platform.html` (the CRM page) still loads Google Fonts and Unsplash images, unlike the portfolio prototype, which makes no network requests. The CRM app also calls its own demo backend for leads, teams and integrations.
- The CRM app's HubSpot connector and Claude copilot/voice-demo features were tested against mock servers only; they have not been run against HubSpot or a real model.
- The Arabic strings were not reviewed by a native speaker.
- Sample numbers were chosen to tell a coherent story (for example one asset with no valuation, one with a stale valuation, an anchor lease expiring). They are illustrative, not benchmarks.
