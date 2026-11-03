// Connected-mode browser test: real sessions against a running Observer server + Postgres.
// Run: BASE=http://localhost:3000 node test/browser/demo-connected.js   (needs Playwright; server started with DATABASE_URL/SESSION_SECRET)
const {chromium}=require('playwright');const BASE=process.env.BASE||'http://localhost:3120';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{const b=await chromium.launch();const t=Date.now();const errs=[];
 const session=async()=>{const c=await b.newContext({viewport:{width:1360,height:900}});const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/status of 40[0134]|ERR_TUNNEL/.test(m.text()))errs.push(m.text())});p.on('dialog',d=>d.accept());return p};
 const hash=async(p,h)=>{await p.evaluate(h=>{location.hash='#/'+h},h);await p.waitForTimeout(350)};
 const main=p=>p.locator('main').innerText();const toast=async p=>{await p.waitForTimeout(350);return p.locator('.toast').innerText().catch(()=>'')};
 const api=(p,method,path,body)=>p.evaluate(async([m,u,b])=>{const r=await fetch(u,{method:m,headers:{'content-type':'application/json'},body:b?JSON.stringify(b):undefined});return {s:r.status,j:await r.json().catch(()=>null)}},[method,path,body]);

 // 1. anonymous visit to a served page: offers sign-in or the local sample
 const anon=await session();await anon.goto(BASE+'/demo/index.html');await anon.waitForSelector('h1');
 ok(/Sign in/.test(await main(anon))&&/local sample/.test(await main(anon)),'anonymous visitor is offered sign-in or the local sample');
 await anon.click('[data-act=standalone]');await anon.waitForTimeout(500);ok(/Portfolio overview/.test(await main(anon))&&/Nothing is saved/.test(await anon.locator('#banner').innerText()),'local sample works from a served page, banner says nothing is saved');
 await anon.context().close();
 // regression: an anonymous visitor to the lead workspace must be sent to the login page, not shown an error
 const anon2=await session();await anon2.goto(BASE+'/platform.html',{waitUntil:'domcontentloaded'});await anon2.waitForURL(/login/,{waitUntil:'commit'});ok(true,'anonymous visit to the lead workspace redirects to login');await anon2.context().close();

 // 2. admin signs up (with sample data) and lands in connected mode
 const A=await session();await A.goto(BASE+'/login.html?next=/demo/index.html');await A.click('#toggle');await A.fill('#agency','Connected Co');await A.fill('#email',`cadmin${t}@t.co`);await A.fill('#pw','correct-horse-9');await A.click('#go');
 await A.waitForURL(/\/demo\/index\.html/);await A.waitForSelector('.kpis');
 ok(/Connected mode/.test(await A.locator('#banner').innerText())&&/Connected: Connected Co/.test(await A.locator('#side').innerText()),'connected banner and agency chip');
 ok(/Approver/.test(await A.locator('#side').innerText())&&!(await A.locator('select[data-bind=role]').count()),'role comes from the account, no demo role switch');
 ok(/\$2\.83M/.test(await main(A)),'same figures as standalone ($2.83M NOI, computed from stored data)');
 ok(!(await A.locator('[data-act=reset]').count()),'no reset button in connected mode');

 // 3. persistence: task toggle survives reload; audit names the real user
 await hash(A,'records?tab=tasks');await A.locator('tr',{hasText:'Commission valuation'}).locator('button').click();await A.waitForTimeout(500);
 await A.reload();await A.waitForSelector('h1');await hash(A,'records?tab=tasks');ok(/Done/.test(await A.locator('tr',{hasText:'Commission valuation'}).innerText()),'task change persisted after reload');
 await hash(A,'records?tab=audit');ok(new RegExp(`Approver \\(cadmin${t}@t\\.co\\)`).test(await main(A)),'audit entry attributes the real account');

 // 4. add asset: server validation, then success; flagged for missing valuation; valuation clears it
 await hash(A,'assets');await A.click('text=Add asset');await A.fill('#na-name','');await A.click('dialog >> text=Create asset');ok(/name is required/.test(await toast(A)),'server validation message is shown');
 await A.fill('#na-name','Connected Court');await A.fill('#na-type','Retail');await A.fill('#na-loc','Test District');await A.fill('#na-acq','2026-02-01');await A.fill('#na-cost','8000000');await A.fill('#na-cap','2000');await A.fill('#na-gpr','60000');await A.fill('#na-opex','12000');await A.fill('#na-occ','90');
 await A.click('dialog >> text=Create asset');await A.waitForTimeout(700);await hash(A,'assets');ok(await A.locator('#asset-table tr',{hasText:'Connected Court'}).count()===1,'new asset appears in the registry');
 await A.fill('#f-q','Connected Court');await A.waitForTimeout(300);await A.locator('#asset-table tr',{hasText:'Connected Court'}).click();await A.waitForTimeout(400);ok(/No valuation on file/.test(await main(A)),'new asset shows its missing valuation');
 await A.click('text=Record valuation');await A.fill('#nv-val','8400000');await A.fill('#nv-date','2026-09-30');await A.fill('#nv-src','Independent appraisal (test)');await A.click('dialog >> text=Save valuation');await A.waitForTimeout(700);
 ok(/8,400,000/.test(await main(A))&&/Independent appraisal \(test\)/.test(await main(A)),'valuation recorded with date and source');

 // 5. settings persist for the agency
 await hash(A,'settings');await A.selectOption('select[data-bind=currency]','EUR');await A.waitForTimeout(500);await A.reload();await A.waitForSelector('h1');await hash(A,'overview');ok(/€/.test(await main(A)),'currency setting persisted after reload');
 await hash(A,'settings');await A.selectOption('select[data-bind=currency]','USD');await A.waitForTimeout(500);

 // 6. analyst: real second account, enforced by the server
 const inv1=(await api(A,'POST','/api/users/invite',{email:`canalyst${t}@t.co`,role:'agent'})).j;
 const N=await session();await N.goto(BASE+'/login.html?invite='+inv1.token);await N.fill('#pw','analyst-password-1');await N.click('#go');await N.waitForURL(/platform\.html/);
 await N.goto(BASE+'/demo/index.html');await N.waitForSelector('.kpis');ok(/Analyst/.test(await N.locator('#side').innerText()),'analyst account shows the Analyst role');
 await hash(N,'settings');ok(await N.locator('select[data-bind=currency]').isDisabled(),'analyst cannot change agency settings (control disabled)');
 await hash(N,'investors');await N.locator('tr',{hasText:'Private Investor C'}).locator('button',{hasText:'Generate draft'}).click();await N.waitForTimeout(800);
 await N.check('#ack');await N.click('dialog >> text=Submit for review');await N.waitForTimeout(700);ok(/In review/.test(await N.locator('tr',{hasText:'Private Investor C'}).innerText()),'analyst drafted and submitted a statement');
 await N.locator('tr',{hasText:'Private Investor C'}).locator('button').click();await N.waitForTimeout(400);ok(await N.locator('dialog >> text=Approve and publish to investor view').isDisabled(),'analyst cannot approve');await N.keyboard.press('Escape');
 const st=(await api(A,'GET','/api/portfolio/bootstrap')).j.statements.find(s=>s.investorId==='INV-03'&&s.period==='2026-Q3');
 ok((await api(N,'POST',`/api/portfolio/statements/${st.id}/decide`,{decision:'approve'})).s===403,'server refuses an analyst who bypasses the UI');
 await hash(A,'investors');await A.locator('tr',{hasText:'Private Investor C'}).locator('button').click();await A.waitForTimeout(500);await A.click('dialog >> text=Approve and publish to investor view');await A.waitForTimeout(800);
 ok(/Published/.test(await A.locator('tr',{hasText:'Private Investor C'}).innerText()),'a different person approved and published it');
 await A.locator('tr',{hasText:'Kestrel'}).locator('button',{hasText:'Generate draft'}).click();await A.waitForTimeout(700);await A.check('#ack');await A.click('dialog >> text=Submit for review');await A.waitForTimeout(600);
 await A.locator('tr',{hasText:'Kestrel'}).locator('button').click();await A.click('dialog >> text=Approve and publish to investor view');ok(/Maker\/checker/.test(await toast(A)),'server enforces maker/checker on the same person');await A.keyboard.press('Escape');

 // 7. investor account: server-enforced isolation
 const inv2=(await api(A,'POST','/api/users/invite',{email:`cinv${t}@t.co`,role:'investor',investor_id:'INV-03'})).j;
 const V=await session();await V.goto(BASE+'/login.html?invite='+inv2.token);await V.fill('#pw','investor-password-1');await V.click('#go');await V.waitForURL(/\/demo\/index\.html/);await V.waitForSelector('.inv-band');
 const vt=await V.locator('body').innerText();
 ok(/Investor access/.test(await V.locator('#banner').innerText())&&/Private Investor C/.test(vt),'investor lands on their own view');
 ok(!/Alder|Kestrel|Northgate|refinancing|valuation timing|Internal/.test(vt),'no other investor, asset internals or internal notes on the page');
 ok(/Q3 2026/.test(vt)&&/Q2 2026/.test(vt),'sees the statements that were approved and published');
 ok((await V.locator('#side nav a').count())===1&&!(await V.locator('select[data-demo-chrome]').count()),'no operator navigation or investor switcher');
 await hash(V,'overview');ok(/Private Investor C/.test(await V.locator('h1').first().innerText()),'operator routes redirect back to the investor view');
 for(const u of ['/api/leads','/api/portfolio/bootstrap','/api/users','/api/portfolio/investor-view?investorId=INV-01'])ok((await api(V,'GET',u)).s===403,'server refuses investor: GET '+u);
 const raw=JSON.stringify((await api(V,'GET','/api/portfolio/investor-view')).j);ok(!/INV-01|INV-02|Kestrel|Alder|internalNote/.test(raw),'API payload for the investor contains nothing about others');
 await V.goto(BASE+'/platform.html');await V.waitForURL(/\/demo\/index\.html/);ok(true,'investor is redirected away from the lead workspace');
 await hash(A,'investor/INV-03');await A.waitForSelector('.inv-band');ok(/Server-built preview/.test(await A.locator('.inv-band').innerText()),'admin previews the server-built investor view');
 const uid=(await api(A,'GET','/api/users')).j.users.find(u=>u.email===`cinv${t}@t.co`).id;await api(A,'DELETE','/api/users/'+uid);
 await V.goto(BASE+'/demo/index.html');await V.waitForTimeout(600);ok(/Sign in/.test(await V.locator('main').innerText()),'removed investor is signed out immediately');
 ok(errs.length===0,'no page or console errors '+(errs.length?JSON.stringify(errs.slice(0,3)):''));
 console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();process.exit(fails?1:0)})();
