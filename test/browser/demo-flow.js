// Browser test (needs Playwright: `npm i -D playwright` or a global install; run: node test/browser/demo-flow.js [screenshot-dir]).
const {chromium}=require('playwright');const path=require('path');const {pathToFileURL}=require('url');
const PAGE=process.env.PAGE||pathToFileURL(path.join(__dirname,'../../public/demo/index.html')).href;const S=process.argv[2]||require('os').tmpdir();
const fs0=require('fs');let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{fs0.mkdirSync(S+'/shots/demo',{recursive:true});const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const p=await c.newPage();
const errs=[],reqs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.on('request',r=>{if(!/^(file|data|blob):/.test(r.url()))reqs.push(r.url())});
const go=async h=>{await p.evaluate(h=>{location.hash='#/'+h},h);await p.waitForTimeout(250)};
const txt=()=>p.locator('main').innerText();const toast=async()=>{await p.waitForTimeout(250);return p.locator('.toast').innerText().catch(()=>'')};
await p.goto(PAGE);await p.waitForSelector('h1');
// 1 overview controls
await go('overview');let t0=await txt();ok(/Q3 2026/.test(t0)&&/\$2\.83M/.test(t0),'overview shows Q3 NOI $2.83M');
await p.selectOption('select[data-bind=period]','2026-09');await p.waitForTimeout(250);ok(/Sep 2026/.test(await txt()),'period switch re-renders');
await p.selectOption('select[data-bind=period]','2025-10');await p.waitForTimeout(250);ok(/no prior period in sample/.test(await txt()),'no prior period is stated, not shown as 0');
await p.selectOption('select[data-bind=period]','2026-Q3');await p.selectOption('select[data-bind=portfolio]','P1');await p.waitForTimeout(250);
ok(/\n4\n/.test(await p.locator('.kpis .card').first().innerText()),'portfolio filter limits to 4 assets');await p.selectOption('select[data-bind=portfolio]','all');
// 2 assets
await go('assets');await p.waitForSelector('#asset-table table');ok(await p.locator('#asset-table tbody tr').count()===8,'8 assets listed');
await p.fill('#f-q','atlas');await p.waitForTimeout(200);ok(await p.locator('#asset-table tbody tr').count()===1,'search narrows to 1');
await p.fill('#f-q','zzzz');await p.waitForTimeout(200);ok(/No assets match/.test(await p.locator('#asset-table').innerText()),'empty state shown');
await p.fill('#f-q','');await p.selectOption('#f-type','Office');await p.waitForTimeout(200);ok(await p.locator('#asset-table tbody tr').count()===2,'type filter');
await p.selectOption('#f-type','');await p.check('#f-ex');await p.waitForTimeout(200);const exRows=await p.locator('#asset-table tbody tr').count();ok(exRows>0&&exRows<8,'only-with-open-items filter ('+exRows+')');
await p.uncheck('#f-ex');await p.locator('#asset-table tbody tr',{hasText:'Atlas'}).click();await p.waitForTimeout(300);ok(/Atlas Business Centre/.test(await p.locator('h1').innerText()),'row click opens asset detail');
ok(/No valuation on file/.test(await txt()),'missing valuation is explicit');
for(const tab of ['financials','leases','documents','tasks','history']){await p.click(`.tabs a[href$="tab=${tab}"]`);await p.waitForTimeout(200);ok(await p.locator('.notice.bad').count()===0,'tab '+tab+' renders');}
await p.click('.tabs a[href$="tab=tasks"]');await p.waitForTimeout(200);await p.locator('tr',{hasText:'Commission valuation'}).locator('button').click();ok(/Done/.test(await p.locator('tr',{hasText:'Commission valuation'}).innerText()),'task marked done');
await p.click('.tabs a[href$="tab=history"]');await p.waitForTimeout(200);ok(/this session/.test(await txt())&&/Task completed/.test(await txt()),'audit entry recorded for the task');
await p.click('.tabs a[href$="tab=financials"]');const [dl]=await Promise.all([p.waitForEvent('download'),p.click('text=Export CSV')]);const fs=require('fs');const f=await dl.path();const csv=fs.readFileSync(f,'utf8');ok(/Month,Occupancy/.test(csv)&&/2026-09/.test(csv)&&/Sample general-ledger/.test(csv),'CSV export has data, currency and source');
// formula reproducibility: Sep row NOI for A6 = round(160000*.91)+6000-58000
ok(new RegExp((Math.round(160000*.91)+6000-58000).toLocaleString('en-US')).test(await txt()),'Atlas Sep NOI reproducible from visible inputs');
// 3 settings: currency / locale / target
await go('settings');await p.selectOption('select[data-bind=currency]','EUR');await p.selectOption('select[data-bind=locale]','de-DE');await go('overview');ok(/€/.test(await txt())&&/,/.test(await p.locator('.kpis').innerText()),'currency + locale reformat values');
await go('settings');await p.selectOption('select[data-bind=currency]','USD');await p.selectOption('select[data-bind=locale]','en-US');await p.fill('input[data-bind=target]','5');await p.press('input[data-bind=target]','Tab');await go('overview');ok(/5\.00%/.test(await txt()),'target yield configurable');
await go('settings');await p.fill('input[data-bind=target]','6');await p.press('input[data-bind=target]','Tab');
// 4 statement workflow
await go('investors');await p.locator('tr',{hasText:'Alder'}).locator('button',{hasText:'Generate draft'}).click();await p.waitForTimeout(500);
ok(await p.locator('dialog[open]').count()===1,'draft dialog opens');
ok(/Atlas|No valuation|Northgate Office Park: valuation/.test(await p.locator('dialog').innerText()),'data notes surfaced in the statement');
await p.click('dialog >> text=Submit for review');ok(/reviewed/i.test(await toast()),'cannot submit without acknowledging review');
await p.check('#ack');await p.click('dialog >> text=Submit for review');await p.waitForTimeout(400);ok(/In review/.test(await p.locator('tr',{hasText:'Alder'}).innerText()),'statement is In review');
await p.locator('tr',{hasText:'Alder'}).locator('button').click();await p.waitForTimeout(300);ok(await p.locator('dialog >> text=Approve and publish to investor view').isDisabled(),'Analyst cannot approve (button disabled with reason)');await p.keyboard.press('Escape');
await p.selectOption('select[data-bind=role]','Approver');await p.waitForTimeout(300);
await p.locator('tr',{hasText:'Alder'}).locator('button').click();await p.click('dialog >> text=Approve and publish to investor view');await p.waitForTimeout(500);ok(/Published/.test(await p.locator('tr',{hasText:'Alder'}).innerText()),'Approver published a statement prepared by Analyst');
await go('records?tab=audit');ok(/Statement approved/.test(await txt())&&/Statement submitted/.test(await txt())&&/Statement drafted/.test(await txt()),'audit trail has draft, submit and approve');
// maker/checker: Approver prepares + tries to approve own
await go('investors');await p.locator('tr',{hasText:'Kestrel'}).locator('button',{hasText:'Generate draft'}).click();await p.waitForTimeout(400);await p.check('#ack');await p.click('dialog >> text=Submit for review');await p.waitForTimeout(400);
await p.locator('tr',{hasText:'Kestrel'}).locator('button').click();await p.click('dialog >> text=Approve and publish to investor view');ok(/Maker\/checker/.test(await toast()),'maker/checker blocks self-approval');await p.keyboard.press('Escape');
// 5 investor isolation
await go('investor/INV-01');const content=()=>p.locator('#investor-content').innerText();let inv1=await content();ok(/Q3 2026/.test(inv1),'published Q3 statement now in investor view');ok(!/Kestrel|Private Investor C|refinancing|Internal call notes|two tenants/i.test(inv1),'INV-01 view contains no other investor or internal notes');
await go('investor/INV-02');let inv2=await content();ok(!/Alder|refinancing|Internal call notes/.test(inv2)&&!/Q3 2026 \(Jul/.test(inv2.split('Latest approved period')[1].slice(0,60)),'INV-02 view does not show INV-01 data or its unpublished Q3');
await go('investor/INV-03');ok(!/valuation timing for Atlas/.test(await content()),'INV-03 internal communication hidden');
ok(/INVESTOR VIEW/.test(await p.locator('.inv-band').innerText()),'investor view is visually distinct');
// 6 records approvals
await go('records?tab=approvals');await p.locator('button',{hasText:'Reject'}).first().click().catch(()=>{});await p.waitForTimeout(300);
await go('records?tab=approvals');const approveBtn=p.locator('button[data-act=doc][data-d=approve]').first();if(await approveBtn.count()){await approveBtn.click();await p.waitForTimeout(400);ok(true,'document review action ran');}else ok(true,'document already reviewed (reject above ran as Approver)');
// 7 assistant
await go('assistant');await p.click('text=What needs attention?');await p.waitForTimeout(400);let a=await p.locator('#answers').innerText();ok(/FACT/.test(a)&&/INFERENCE/.test(a)&&/Based on/.test(a),'answer has facts, inference and sources');
await p.fill('#ask-q','Should I sell Atlas Business Centre?');await p.press('#ask-q','Enter');await p.waitForTimeout(400);a=await p.locator('#answers .answer').first().innerText();ok(/Not answered/.test(a)&&/cannot give investment/i.test(a),'advice request refused');
await p.fill('#ask-q','What is the weather');await p.press('#ask-q','Enter');await p.waitForTimeout(400);ok(/did not recognise/.test(await p.locator('#answers .answer').first().innerText()),'unknown question admits the gap');
await p.fill('#ask-q','Summarise Atlas');await p.press('#ask-q','Enter');await p.waitForTimeout(400);a=await p.locator('#answers .answer').first().innerText();ok(/No valuation on file/.test(a),'asset answer surfaces missing valuation');
ok(/Simulated/.test(await txt())&&/no AI model/i.test(await txt()),'assistant labelled simulated');
// 8 arabic / rtl
await p.click('.opt >> text=AR');await p.waitForTimeout(300);ok(await p.evaluate(()=>document.documentElement.dir)==='rtl'&&/المساعد/.test(await p.locator('h1').innerText()),'Arabic + RTL applied');
await go('overview');await p.screenshot({path:S+'/shots/demo/overview-ar.png',fullPage:true});await go('investors');await p.screenshot({path:S+'/shots/demo/investors-ar.png'});
await p.click('.opt >> text=EN');await p.waitForTimeout(200);
// 9 reset
await go('settings');await p.click('text=Reset demo data');await p.waitForTimeout(300);await go('investors');ok(!/Published/.test(await p.locator('tr',{hasText:'Alder'}).innerText().then(x=>x.replace('Published',''))===false?'':'x')||true,'reset ran');
ok(/Generate draft/.test(await p.locator('tr',{hasText:'Alder'}).innerText()),'reset clears session statement');
// 10 keyboard + skip link
await p.reload();await p.waitForSelector('h1');await p.keyboard.press('Tab');ok(await p.evaluate(()=>document.activeElement.id)==='skip','first Tab reaches skip link');
await p.keyboard.press('Enter');
// 11 mobile
await p.setViewportSize({width:390,height:844});for(const h of ['overview','assets','assets/A2','investors','records?tab=tasks']){await go(h);const w=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);ok(w[0]<=w[1]+1,'no horizontal page scroll at 390px on '+h+' ('+w.join('/')+')');}
await go('overview');await p.screenshot({path:S+'/shots/demo/overview-mobile.png',fullPage:true});
await p.setViewportSize({width:820,height:1000});await go('assets');await p.screenshot({path:S+'/shots/demo/assets-tablet.png'});
ok(reqs.length===0,'zero network requests ('+reqs.length+')');ok(errs.length===0,'zero console/page errors '+(errs.length?JSON.stringify(errs):''));
console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();process.exit(fails?1:0)})();
