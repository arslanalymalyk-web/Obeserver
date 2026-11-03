/* Data-access boundary. The UI talks ONLY to this file (all methods return Promises, like a future HTTP client would).
   Today it reads the local sample data in data.js and keeps changes in memory (lost on reload; nothing is persisted).
   To connect a real backend, replace the bodies here; views and calc.js do not need to change.
   Investor filtering below is a visual demonstration only: real access control must be enforced on a server. */
(function (root) {
  const D0 = root.DemoData, C = root.DemoCalc;
  const clone = x => JSON.parse(JSON.stringify(x));
  let D, nextId;
  const reset = () => {
    D = clone(D0); nextId = 1000;
    // Sample published statements get a snapshot generated from the sample data (a real system would store what was approved).
    D.statements.forEach(s => { if (s.status === 'Published' && !s.snapshot) { s.snapshot = C.investorPeriod(D, D.investors.find(i => i.id === s.investorId), s.period); s.notes = []; } });
  };
  reset();
  const ok = v => Promise.resolve(clone(v));
  const stamp = () => new Date().toISOString();
  const audit = (actor, action, entity, detail) => { D.audit.unshift({ id: 'L' + nextId++, at: stamp(), actor, action, entity, detail, session: true }); };
  const scope = pid => (!pid || pid === 'all') ? D.assets : D.assets.filter(a => a.portfolio === pid);
  const fail = msg => Promise.reject(new Error(msg));

  const Store = {
    reset: () => { reset(); return ok(true); },
    getConfig: () => ok(D.config),
    setConfig: patch => { // sample configuration only; no FX conversion is performed
      const allowed = ['currency', 'locale', 'targetYield']; allowed.forEach(k => { if (patch[k] !== undefined) D.config[k] = patch[k]; });
      return ok(D.config);
    },
    getPeriods: () => ok(D.periods.map(p => ({ id: p.id, label: p.label, prior: p.prior, months: p.months.length }))),
    getPortfolios: () => ok(D.portfolios),
    getAssets: (f = {}, periodId = '2026-Q3') => {
      const ex = C.exceptions(D, periodId);
      let list = scope(f.portfolio).filter(a => (!f.type || a.type === f.type) && (!f.status || a.status === f.status) &&
        (!f.q || (a.name + ' ' + a.location + ' ' + a.type).toLowerCase().includes(f.q.toLowerCase())) && (!f.exceptionsOnly || ex.some(e => e.assetId === a.id)));
      return ok(list.map(a => ({ ...a, period: C.assetPeriod(D, a, periodId), exceptionCount: ex.filter(e => e.assetId === a.id).length })));
    },
    getAsset: (id, periodId = '2026-Q3') => {
      const a = D.assets.find(x => x.id === id); if (!a) return fail('Asset not found');
      return ok({ asset: a, period: C.assetPeriod(D, a, periodId), prior: C.period(D, periodId).prior ? C.assetPeriod(D, a, C.period(D, periodId).prior) : null,
        portfolio: D.portfolios.find(p => p.id === a.portfolio), leases: D.leases.filter(l => l.assetId === id), documents: D.documents.filter(d => d.scope === 'asset' && d.ref === id),
        tasks: D.tasks.filter(t => t.assetId === id), exceptions: C.exceptions(D, periodId).filter(e => e.assetId === id), history: D.audit.filter(l => l.entity === id),
        periodMonths: C.period(D, periodId).months, monthly: D.months.map(m => C.assetMonth(D, a, m)), owners: D.investors.filter(i => i.holdings[id]).map(i => ({ id: i.id, name: i.name, share: i.holdings[id] })) });
    },
    getSummary: (pid, periodId) => { const as = scope(pid), p = C.period(D, periodId); return ok({ current: C.portfolioPeriod(D, as, periodId), vsPrior: C.vsPrior(D, as, periodId), prior: p.prior ? C.portfolioPeriod(D, as, p.prior) : null,
      series: C.monthlyNoiSeries(D, as), targetMonthlyNoi: as.reduce((s, a) => s + a.cost * C.targetFor(D, a) / 12, 0), periodMonths: p.months, statusCounts: as.reduce((m, a) => (m[a.status] = (m[a.status] || 0) + 1, m), {}),
      oldestValuation: as.filter(a => a.valuation).map(a => a.valuation.date).sort()[0] || null }); },
    getExceptions: (periodId, pid) => { const ids = new Set(scope(pid).map(a => a.id)); return ok(C.exceptions(D, periodId).filter(e => ids.has(e.assetId))); },
    getFacets: () => ok({ types: [...new Set(D.assets.map(a => a.type))].sort(), statuses: [...new Set(D.assets.map(a => a.status))].sort() }),
    getDocuments: (f = {}) => ok(D.documents.filter(d => (!f.status || d.status === f.status) && (!f.scope || d.scope === f.scope))),
    getTasks: (f = {}) => ok(D.tasks.filter(t => !f.status || t.status === f.status)),
    getAudit: (f = {}) => ok(D.audit.filter(l => !f.entity || l.entity === f.entity).sort((a, b) => b.at.localeCompare(a.at))),
    getAuditSince: iso => ok(D.audit.filter(l => l.at >= iso).sort((a, b) => b.at.localeCompare(a.at))),
    getInvestors: () => ok(D.investors.map(i => ({ ...i, statements: D.statements.filter(s => s.investorId === i.id) }))),
    // Internal (operator) view of every investor's pro-rata share for a period, with statement status.
    getInvestorSummaries: periodId => ok(D.investors.map(i => ({ ...i, statements: D.statements.filter(s => s.investorId === i.id).map(({ snapshot, ...s }) => s), snap: C.investorPeriod(D, i, periodId) }))),
    getStatements: () => ok(D.statements),
    getAllForAssistant: () => ok({ assets: D.assets, config: D.config }),

    toggleTask: (id, role) => { const t = D.tasks.find(x => x.id === id); if (!t) return fail('Task not found');
      t.status = t.status === 'Done' ? 'Open' : 'Done'; audit(role + ' (demo role)', t.status === 'Done' ? 'Task completed' : 'Task reopened', t.assetId, t.title); return ok(t); },
    reviewDocument: (id, decision, role) => { const d = D.documents.find(x => x.id === id); if (!d) return fail('Document not found');
      if (role !== 'Approver') return fail('Only the Approver demo role can review documents (visual demonstration; a real system must enforce this on the server).');
      if (d.status !== 'Pending review') return fail('Document is not pending review');
      d.status = decision === 'approve' ? 'Approved' : 'Rejected'; audit('Approver (demo role)', decision === 'approve' ? 'Document approved' : 'Document rejected', d.ref, d.name); return ok(d); },

    // Investor statements: Draft -> In review -> Published, with maker/checker and an audit entry at each step.
    prepareStatement: (investorId, periodId, role) => {
      const inv = D.investors.find(i => i.id === investorId); if (!inv) return fail('Investor not found');
      let s = D.statements.find(x => x.investorId === investorId && x.period === periodId);
      if (s && s.status === 'Published') return fail('A statement for this investor and period is already published.');
      const snap = C.investorPeriod(D, inv, periodId), notes = [];
      snap.missingValuation.forEach(n => notes.push(`No valuation on file for ${n}; its value share is excluded.`));
      inv.holdings && Object.keys(inv.holdings).forEach(id => C.exceptions(D, periodId).filter(e => e.assetId === id && (e.type === 'Stale data')).forEach(e => notes.push(e.title + '.')));
      if (!s) { s = { id: 'S' + nextId++, investorId, period: periodId, status: 'Draft', preparedBy: role, approvedBy: null }; D.statements.push(s); }
      s.snapshot = snap; s.notes = notes; s.status = 'Draft'; s.preparedBy = role; s.reviewed = false;
      audit(role + ' (demo role)', 'Statement drafted', investorId, `${periodId} statement generated from sample data`); return ok(s);
    },
    submitStatement: (id, role, acknowledged) => { const s = D.statements.find(x => x.id === id); if (!s || s.status !== 'Draft') return fail('Only a draft can be submitted');
      if (!acknowledged) return fail('Confirm that you have reviewed the data notes before submitting.');
      s.status = 'In review'; s.reviewed = true; audit(role + ' (demo role)', 'Statement submitted for review', s.investorId, `${s.period} statement`); return ok(s); },
    decideStatement: (id, decision, role) => { const s = D.statements.find(x => x.id === id); if (!s || s.status !== 'In review') return fail('Statement is not in review');
      if (role !== 'Approver') return fail('Only the Approver demo role can decide (visual demonstration; real enforcement must be server-side).');
      if (s.preparedBy === role) return fail('Maker/checker rule: the person who prepared a statement cannot approve it. Switch the demo role to Analyst to prepare, then Approver to approve.');
      if (decision === 'approve') { s.status = 'Published'; s.approvedBy = role; audit('Approver (demo role)', 'Statement approved', s.investorId, `${s.period} statement approved and published to the investor view`); }
      else { s.status = 'Draft'; audit('Approver (demo role)', 'Statement returned', s.investorId, `${s.period} statement returned to draft`); }
      return ok(s); },

    // Visual demonstration of role-appropriate visibility. NOT a security boundary.
    getInvestorWorkspace: (investorId) => {
      const inv = D.investors.find(i => i.id === investorId); if (!inv) return fail('Investor not found');
      const order = id => D.periods.findIndex(p => p.id === id);
      const mine = D.statements.filter(s => s.investorId === investorId && s.status === 'Published').sort((x, y) => order(x.period) - order(y.period));
      // Only approved (published) statement snapshots are exposed: no live figures for unapproved periods.
      return ok({ investor: { id: inv.id, name: inv.name, type: inv.type },
        statements: mine.map(s => ({ id: s.id, period: s.period, periodLabel: C.period(D, s.period).label, status: s.status, snapshot: s.snapshot, notes: s.notes || [] })),
        documents: D.documents.filter(d => d.scope === 'investor' && d.ref === investorId && d.visibility === 'investor' && d.status === 'Approved'),
        communications: D.communications.filter(c => c.investorId === investorId && !c.internal).sort((x, y) => y.at.localeCompare(x.at)),
        holdings: Object.entries(inv.holdings).map(([id, share]) => { const a = D.assets.find(x => x.id === id); return { id, name: a.name, type: a.type, location: a.location, share }; }) });
    },
  };
  root.DemoStore = Store;
})(window);
