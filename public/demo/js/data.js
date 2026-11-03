/* Sample data for the concept prototype. ALL VALUES ARE FICTIONAL.
   Nothing here is real, live, or from any client system. Replace this file (via store.js) with a backend later.
   Monetary values are whole units of config.currency; there is no FX conversion anywhere in the demo. */
(function (root) {
  const MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];
  const q = (id, label, from, to, prior) => ({ id, label, months: MONTHS.slice(from, to + 1), prior });
  const DemoData = {
    config: {
      // Sample configuration, not assumptions about any real organisation.
      currency: 'USD', locale: 'en-US',
      demoToday: '2026-10-05',        // fixed so the demo is deterministic (not the real current date)
      dataThrough: '2026-09-30',      // last closed financial month in the sample
      financialsSource: 'Sample general-ledger extract (fictional)',
      targetYield: 0.06,              // target NOI yield on cost, annualised; per-asset override: asset.targetYield
      thresholds: { valuationMaxAgeDays: 365, leaseExpiryDays: 90, occupancyMin: 0.9, docExpiryDays: 60, yieldShortfall: 0.005 },
    },
    months: MONTHS,
    periods: [
      q('2026-Q3', 'Q3 2026 (Jul–Sep)', 9, 11, '2026-Q2'), q('2026-Q2', 'Q2 2026 (Apr–Jun)', 6, 8, '2026-Q1'),
      q('2026-Q1', 'Q1 2026 (Jan–Mar)', 3, 5, '2025-Q4'), q('2025-Q4', 'Q4 2025 (Oct–Dec)', 0, 2, null),
      q('2026-09', 'Sep 2026', 11, 11, '2026-08'), q('2026-08', 'Aug 2026', 10, 10, '2026-07'), q('2026-07', 'Jul 2026', 9, 9, '2026-06'),
      q('2026-06', 'Jun 2026', 8, 8, '2026-05'), q('2026-05', 'May 2026', 7, 7, '2026-04'), q('2026-04', 'Apr 2026', 6, 6, '2026-03'),
      q('2026-03', 'Mar 2026', 5, 5, '2026-02'), q('2026-02', 'Feb 2026', 4, 4, '2026-01'), q('2026-01', 'Jan 2026', 3, 3, '2025-12'),
      q('2025-12', 'Dec 2025', 2, 2, '2025-11'), q('2025-11', 'Nov 2025', 1, 1, '2025-10'), q('2025-10', 'Oct 2025', 0, 0, null),
      q('T12M', 'Trailing 12 months', 0, 11, null),
    ],
    portfolios: [
      { id: 'P1', name: 'Meridian Income Portfolio', strategy: 'Income-focused (sample)' },
      { id: 'P2', name: 'Cedar Growth Portfolio', strategy: 'Value-add and lease-up (sample)' },
    ],
    // monthly = gross potential rent; occ = occupancy per month (Oct 2025 .. Sep 2026); opex lines are monthly; oneOff = extra cost by month index
    assets: [
      { id: 'A1', name: 'Harbor Point Residences', type: 'Multifamily', portfolio: 'P1', location: 'Harborview District', status: 'Stabilised', capacity: 120, unit: 'units', acquired: '2021-04-15', cost: 31000000,
        valuation: { value: 34500000, date: '2026-03-31', source: 'Independent appraisal (sample)' }, gpr: 260000, other: 8000, opex: { maintenance: 30000, utilities: 18000, management: 12000, taxInsurance: 34000 },
        occ: [.94, .95, .95, .96, .95, .95, .96, .96, .95, .95, .94, .93], oneOff: {},
        internalNote: 'Sample internal note: refinancing discussion pending (not visible to investors).' },
      { id: 'A2', name: 'Northgate Office Park', type: 'Office', portfolio: 'P1', location: 'Northgate Business Zone', status: 'Stabilised', capacity: 18000, unit: 'sqm', acquired: '2020-09-01', cost: 42000000,
        valuation: { value: 43200000, date: '2025-06-30', source: 'Internal estimate (sample)' }, gpr: 330000, other: 15000, opex: { maintenance: 34000, utilities: 26000, management: 15000, taxInsurance: 42000 },
        occ: [.91, .91, .9, .9, .89, .89, .88, .88, .87, .86, .86, .85], oneOff: {},
        internalNote: 'Sample internal note: two tenants have signalled they may not renew.' },
      { id: 'A3', name: 'Linden Retail Court', type: 'Retail', portfolio: 'P1', location: 'Linden Quarter', status: 'Stabilised', capacity: 6500, unit: 'sqm', acquired: '2022-02-10', cost: 18000000,
        valuation: { value: 17400000, date: '2026-06-30', source: 'Independent appraisal (sample)' }, gpr: 135000, other: 5000, opex: { maintenance: 14000, utilities: 9000, management: 7000, taxInsurance: 20000 },
        occ: [.97, .97, .97, .97, .97, .97, .97, .97, .97, .97, .97, .97], oneOff: {}, internalNote: '' },
      { id: 'A4', name: 'Riverside Logistics Hub', type: 'Industrial', portfolio: 'P1', location: 'Riverside Industrial Estate', status: 'Stabilised', capacity: 32000, unit: 'sqm', acquired: '2019-11-20', cost: 26500000,
        valuation: { value: 29800000, date: '2026-04-30', source: 'Independent appraisal (sample)' }, gpr: 190000, other: 2000, opex: { maintenance: 10000, utilities: 8000, management: 8000, taxInsurance: 18000 },
        occ: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], oneOff: {}, internalNote: '' },
      { id: 'A5', name: 'Cedar Row Townhomes', type: 'Residential', portfolio: 'P2', location: 'Cedar Park', status: 'Refurbishment', capacity: 36, unit: 'units', acquired: '2023-05-05', cost: 14200000,
        valuation: { value: 15000000, date: '2026-01-31', source: 'Internal estimate (sample)' }, gpr: 125000, other: 3000, opex: { maintenance: 18000, utilities: 8000, management: 6000, taxInsurance: 15000 },
        occ: [.78, .78, .78, .78, .78, .78, .72, .72, .72, .8, .86, .89], oneOff: { 6: 22000 },
        internalNote: 'Sample internal note: refurbishment phase 2 scope under review.' },
      { id: 'A6', name: 'Atlas Business Centre', type: 'Office', portfolio: 'P2', location: 'Atlas Commercial Row', status: 'Stabilised', capacity: 9200, unit: 'sqm', acquired: '2022-08-18', cost: 21000000,
        valuation: null, gpr: 160000, other: 6000, opex: { maintenance: 17000, utilities: 12000, management: 8000, taxInsurance: 21000 },
        occ: [.93, .93, .94, .94, .94, .93, .93, .92, .92, .92, .91, .91], oneOff: {}, internalNote: '' },
      { id: 'A7', name: 'Marlow Street Mixed-Use', type: 'Mixed-use', portfolio: 'P2', location: 'Marlow Street', status: 'Lease-up', capacity: 60, unit: 'units', acquired: '2024-03-01', cost: 19500000,
        valuation: { value: 20400000, date: '2026-05-31', source: 'Independent appraisal (sample)' }, gpr: 170000, other: 4000, opex: { maintenance: 16000, utilities: 10000, management: 9000, taxInsurance: 24000 },
        occ: [.55, .6, .64, .68, .72, .75, .78, .8, .82, .85, .87, .88], oneOff: {}, internalNote: '' },
      { id: 'A8', name: 'Quayside Serviced Apartments', type: 'Serviced apartments', portfolio: 'P2', location: 'Quayside', status: 'Stabilised', capacity: 60, unit: 'units', acquired: '2021-10-12', cost: 23800000,
        valuation: { value: 26000000, date: '2026-06-30', source: 'Independent appraisal (sample)' }, gpr: 240000, other: 18000, opex: { maintenance: 38000, utilities: 24000, management: 22000, taxInsurance: 30000 },
        occ: [.86, .82, .8, .84, .88, .9, .92, .93, .92, .9, .91, .92], oneOff: {}, internalNote: '' },
    ],
    leases: [
      { assetId: 'A3', tenant: 'Anchor Grocer Co. (sample)', space: 'Unit A', end: '2026-12-15', note: 'Anchor tenant' },
      { assetId: 'A2', tenant: 'Helio Analytics Ltd. (sample)', space: 'Floor 3', end: '2026-11-30', note: '' },
      { assetId: 'A2', tenant: 'Northwind Legal LLP (sample)', space: 'Floors 4–5', end: '2027-01-31', note: '' },
      { assetId: 'A6', tenant: 'Orbit Software Inc. (sample)', space: 'Suite 200', end: '2026-12-31', note: '' },
      { assetId: 'A1', tenant: '9 residential leases (aggregate, sample)', space: 'Various units', end: '2026-11-30', note: 'Aggregate of expiries in the month' },
      { assetId: 'A7', tenant: 'Ground-floor café (sample)', space: 'Retail 1', end: '2028-03-31', note: '' },
    ],
    documents: [
      { id: 'D1', scope: 'asset', ref: 'A1', name: 'Valuation report — Mar 2026', type: 'Valuation report', status: 'Approved', date: '2026-03-31', expires: null, owner: 'Asset Manager A', due: null, visibility: 'internal' },
      { id: 'D2', scope: 'asset', ref: 'A2', name: 'Valuation memo — Jun 2025', type: 'Valuation report', status: 'Approved', date: '2025-06-30', expires: null, owner: 'Asset Manager A', due: null, visibility: 'internal' },
      { id: 'D3', scope: 'asset', ref: 'A6', name: 'Valuation report', type: 'Valuation report', status: 'Missing', date: null, expires: null, owner: 'Asset Manager B', due: '2026-10-20', visibility: 'internal' },
      { id: 'D4', scope: 'asset', ref: 'A6', name: 'Property insurance certificate', type: 'Insurance certificate', status: 'Expired', date: '2025-08-31', expires: '2026-08-31', owner: 'Operations Coordinator', due: '2026-10-12', visibility: 'internal' },
      { id: 'D5', scope: 'asset', ref: 'A5', name: 'Property insurance certificate', type: 'Insurance certificate', status: 'Approved', date: '2025-11-15', expires: '2026-11-15', owner: 'Operations Coordinator', due: '2026-11-01', visibility: 'internal' },
      { id: 'D6', scope: 'asset', ref: 'A3', name: 'Fire-safety compliance certificate', type: 'Compliance certificate', status: 'Pending review', date: '2026-09-18', expires: '2027-09-18', owner: 'Compliance Reviewer', due: '2026-10-10', visibility: 'internal' },
      { id: 'D7', scope: 'asset', ref: 'A4', name: 'Title / ownership record', type: 'Title record', status: 'Approved', date: '2019-11-20', expires: null, owner: 'Asset Manager A', due: null, visibility: 'internal' },
      { id: 'D8', scope: 'investor', ref: 'INV-01', name: 'Q2 2026 investor statement', type: 'Investor statement', status: 'Approved', date: '2026-07-22', expires: null, owner: 'Investor Relations', due: null, visibility: 'investor', period: '2026-Q2' },
      { id: 'D9', scope: 'investor', ref: 'INV-02', name: 'Q2 2026 investor statement', type: 'Investor statement', status: 'Approved', date: '2026-07-22', expires: null, owner: 'Investor Relations', due: null, visibility: 'investor', period: '2026-Q2' },
      { id: 'D10', scope: 'investor', ref: 'INV-03', name: 'Q2 2026 investor statement', type: 'Investor statement', status: 'Approved', date: '2026-07-23', expires: null, owner: 'Investor Relations', due: null, visibility: 'investor', period: '2026-Q2' },
      { id: 'D11', scope: 'investor', ref: 'INV-01', name: 'Internal call notes — refinancing', type: 'Internal note', status: 'Approved', date: '2026-09-02', expires: null, owner: 'Investor Relations', due: null, visibility: 'internal' },
      { id: 'D12', scope: 'investor', ref: 'INV-02', name: 'Annual information pack 2025', type: 'Investor report', status: 'Approved', date: '2026-02-10', expires: null, owner: 'Investor Relations', due: null, visibility: 'investor' },
    ],
    tasks: [
      { id: 'T1', assetId: 'A6', title: 'Commission valuation (none on file)', owner: 'Asset Manager B', due: '2026-10-20', priority: 'High', status: 'Open' },
      { id: 'T2', assetId: 'A6', title: 'Obtain renewed insurance certificate', owner: 'Operations Coordinator', due: '2026-10-12', priority: 'High', status: 'Open' },
      { id: 'T3', assetId: 'A2', title: 'Review occupancy decline and renewal plan', owner: 'Asset Manager A', due: '2026-10-25', priority: 'Medium', status: 'Open' },
      { id: 'T4', assetId: 'A3', title: 'Open anchor-lease renewal discussion', owner: 'Asset Manager A', due: '2026-10-30', priority: 'High', status: 'Open' },
      { id: 'T5', assetId: 'A5', title: 'Confirm refurbishment phase 2 budget', owner: 'Asset Manager B', due: '2026-11-05', priority: 'Medium', status: 'Open' },
      { id: 'T6', assetId: 'A1', title: 'File Q3 maintenance summary', owner: 'Operations Coordinator', due: '2026-09-28', priority: 'Low', status: 'Done' },
    ],
    investors: [
      { id: 'INV-01', name: 'Alder Family Office (sample)', type: 'Family office', contact: 'Sample contact 01', holdings: { A1: 0.4, A2: 0.25, A3: 0.5, A4: 0.3 } },
      { id: 'INV-02', name: 'Kestrel Capital Partners (sample)', type: 'Fund', contact: 'Sample contact 02', holdings: { A1: 0.35, A4: 0.45, A5: 0.6, A7: 0.5, A8: 0.4 } },
      { id: 'INV-03', name: 'Private Investor C (sample)', type: 'Individual', contact: 'Sample contact 03', holdings: { A5: 0.25, A6: 0.3, A7: 0.2, A8: 0.35 } },
    ],
    communications: [
      { id: 'C1', investorId: 'INV-01', at: '2026-07-22', direction: 'Sent', subject: 'Q2 2026 statement published', internal: false },
      { id: 'C2', investorId: 'INV-01', at: '2026-09-02', direction: 'Internal', subject: 'Call notes: refinancing options', internal: true },
      { id: 'C3', investorId: 'INV-01', at: '2026-09-10', direction: 'Received', subject: 'Question on Northgate occupancy', internal: false },
      { id: 'C4', investorId: 'INV-02', at: '2026-07-22', direction: 'Sent', subject: 'Q2 2026 statement published', internal: false },
      { id: 'C5', investorId: 'INV-02', at: '2026-08-14', direction: 'Received', subject: 'Request for Cedar Row refurbishment update', internal: false },
      { id: 'C6', investorId: 'INV-02', at: '2026-08-20', direction: 'Sent', subject: 'Cedar Row refurbishment update (sample)', internal: false },
      { id: 'C7', investorId: 'INV-03', at: '2026-07-23', direction: 'Sent', subject: 'Q2 2026 statement published', internal: false },
      { id: 'C8', investorId: 'INV-03', at: '2026-09-15', direction: 'Internal', subject: 'Note: investor asked about valuation timing for Atlas', internal: true },
    ],
    statements: [
      { id: 'S1', investorId: 'INV-01', period: '2026-Q2', status: 'Published', preparedBy: 'Analyst (sample)', approvedBy: 'Approver (sample)' },
      { id: 'S2', investorId: 'INV-02', period: '2026-Q2', status: 'Published', preparedBy: 'Analyst (sample)', approvedBy: 'Approver (sample)' },
      { id: 'S3', investorId: 'INV-03', period: '2026-Q2', status: 'Published', preparedBy: 'Analyst (sample)', approvedBy: 'Approver (sample)' },
    ],
    audit: [
      { id: 'L1', at: '2026-09-28T09:14:00Z', actor: 'Operations Coordinator (sample)', action: 'Task completed', entity: 'A1', detail: 'File Q3 maintenance summary' },
      { id: 'L2', at: '2026-09-18T14:02:00Z', actor: 'Compliance Reviewer (sample)', action: 'Document uploaded', entity: 'A3', detail: 'Fire-safety compliance certificate, pending review' },
      { id: 'L3', at: '2026-09-15T11:30:00Z', actor: 'Investor Relations (sample)', action: 'Note added', entity: 'INV-03', detail: 'Internal note on valuation timing' },
      { id: 'L4', at: '2026-09-02T10:05:00Z', actor: 'Investor Relations (sample)', action: 'Note added', entity: 'INV-01', detail: 'Internal call notes recorded' },
      { id: 'L5', at: '2026-08-31T00:00:00Z', actor: 'System (sample)', action: 'Document expired', entity: 'A6', detail: 'Property insurance certificate passed its expiry date' },
      { id: 'L6', at: '2026-07-31T16:40:00Z', actor: 'Asset Manager B (sample)', action: 'Field changed', entity: 'A5', detail: 'Status changed from "Stabilised" to "Refurbishment" (effective Apr 2026, recorded late)' },
      { id: 'L7', at: '2026-07-22T08:00:00Z', actor: 'Approver (sample)', action: 'Statement approved', entity: 'INV-01', detail: 'Q2 2026 statement approved and published' },
      { id: 'L8', at: '2026-06-30T12:00:00Z', actor: 'Asset Manager A (sample)', action: 'Valuation recorded', entity: 'A3', detail: 'Independent appraisal 17,400,000 (as at 2026-06-30)' },
      { id: 'L9', at: '2026-06-30T12:10:00Z', actor: 'Asset Manager B (sample)', action: 'Valuation recorded', entity: 'A8', detail: 'Independent appraisal 26,000,000 (as at 2026-06-30)' },
    ],
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = DemoData; else root.DemoData = DemoData;
})(typeof window !== 'undefined' ? window : globalThis);
