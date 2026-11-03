// Browser test (needs Playwright: `npm i -D playwright` or a global install; run: node test/browser/voice-sim.js [screenshot-dir]).
const {chromium}=require('playwright');const path=require('path');const {pathToFileURL}=require('url');
const PAGE=pathToFileURL(path.join(__dirname,'../../public/demo/voice.html')).href;let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
const errs=[],reqs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('request',r=>{if(!/^(file|data|blob):/.test(r.url()))reqs.push(r.url())});
await p.goto(PAGE);await p.waitForTimeout(800);
const body=()=>p.locator('body').innerText();let t=await body();
ok(/Concept prototype — sample data/.test(t)&&/scripted simulation/i.test(t)&&/no calls are placed/i.test(t),'banner states simulation and no calls');
ok(!/CALLING ENGINE ACTIVE|Voice AI Active|Synced from CRM|\bLive now\b/.test(t),'misleading live/CRM claims removed');
ok(!/\+971|Sarah Ahmed/.test(t),'no real-looking phone numbers or named agent');
ok(/\+000 555/.test(t),'sample numbers are obviously fictional');
await p.waitForTimeout(12000);t=await p.locator('#transcript-area').innerText();ok(/Marlow Street/.test(t),'transcript is the scripted leasing flow');
// handoff / quick actions are marked simulated
await p.click('button:has-text("Handoff")');await p.waitForTimeout(300);ok(/simulated/i.test(await p.locator('#transcript-area').innerText()),'handoff is marked simulated');
await p.click('#handoff-alert button');await p.waitForTimeout(200);ok(/nobody was notified/.test(await p.locator('#transcript-area').innerText()),'handoff confirm says nobody was notified');
// lead -> property link
const href=await p.locator('#call-asset-link').getAttribute('href');ok(href==='index.html#/assets/A7','active lead links to demo asset A7 ('+href+')');
await p.evaluate(()=>showView('queue'));await p.waitForTimeout(300);ok(/Harbor Point Residences/.test(await p.locator('#view-queue').innerText()),'queue shows linked properties');
await p.evaluate(()=>{showView('live');selectQueueItem(6)});ok(await p.locator('#call-asset-link').isHidden(),'investor enquiry has no asset link');
await p.evaluate(()=>showView('settings'));await p.waitForTimeout(300);t=await p.locator('#view-settings').innerText();ok(/Not implemented/.test(t)&&/consent/i.test(t)&&/regulations/i.test(t),'settings lists compliance requirements as not implemented');
ok(!/Auto-send on no answer|Enabled/.test(t),'no claim of automatic messaging');
for(const v of ['queue','campaigns','scripts','objections','analytics','calllog','notifications']){await p.evaluate(v=>showView(v),v);await p.waitForTimeout(200)}
await p.evaluate(()=>showView('notifications'));ok(/example event|Sample|not implemented/i.test(await p.locator('#view-notifications').innerText()),'notifications are labelled example events');
await p.evaluate(()=>toggleLang());await p.waitForTimeout(300);ok(await p.evaluate(()=>document.documentElement.dir)==='rtl'&&/محاكاة/.test(await p.locator('.logo-voice').innerText()),'Arabic/RTL still works and keeps the simulation label');
ok(reqs.length===0,'no network requests ('+JSON.stringify(reqs.slice(0,3))+')');ok(errs.length===0,'no errors '+JSON.stringify(errs));
console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();process.exit(fails?1:0)})();
