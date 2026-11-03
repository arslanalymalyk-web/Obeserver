// ══════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════
const T = {
  en: {
    brand:'Observer', brand_sub:'Autonomous Revenue Engine', ai_powered:'DEMO',
    org_sub:'Sample agency',
    nav_core:'Core', nav_dashboard:'Dashboard', nav_pipeline:'Pipeline', nav_leads:'All Leads',
    nav_ai:'AI Engine', nav_scoring:'Lead Scoring', nav_intent:'Intent Detection', nav_nba:'Next Best Action',
    nav_channels:'Channels', nav_wa:'WhatsApp', nav_sms:'SMS / Sequences', nav_social_auto:'FB & Instagram Automation',
    nav_analytics:'Analytics', nav_funnel:'Conversion Funnel', nav_roi:'Channel ROI', nav_agents:'Agent Performance',
    nav_enterprise:'Enterprise', nav_sla:'SLA Tracking', nav_compliance:'Compliance', nav_notif:'Notifications',
    live:'Demo', ai_active:'Sample data', add_lead:'Add Lead',
    m_total:'Total Leads', m_hot:'Hot Leads 🔥', m_calls:'Calls Booked', m_response:'Avg Response',
    m_ai_score:'AI Score Avg', m_wa:'WhatsApp Opens', m_revenue:'Revenue Pipeline', m_cpl:'Cost Per Lead',
    this_week:'this week', today:'today', scored:'scored', booking_rate:'booking rate',
    speed_to_lead:'↑ Speed to lead',
    hot_leads_panel:'Hot Leads — Act Now', col_lead:'Lead', col_score:'AI Score', col_intent:'Intent',
    col_time:'Time', col_source:'Source', col_temp:'Temp', col_budget:'Budget', col_agent:'Agent', col_last:'Last Contact',
    live_activity:'Live Activity Stream', realtime:'Real-time',
    nba_panel:'Next Best Actions', view_all:'View all →',
    temp_dist:'Lead Temperature Distribution', hot:'HOT', warm:'WARM', cold:'COLD',
    total_leads_ai:'247 total · AI-scored', daily_chart_label:'Daily new leads — last 14 days',
    agents_today:'Agents Today', pipeline_velocity:'Pipeline Velocity', channel_mix:'Channel Mix Today',
    new:'New', qualified:'Qualified', meeting_set:'Meeting Set', closed:'Closed Won',
    deal_pipeline:'Deal Pipeline — Kanban',
    filter_all:'All (0)', filter_hot:'Hot (0)', filter_warm:'Warm (0)', filter_cold:'Cold (0)',
    filter_buyers:'Buyers', filter_sellers:'Sellers',
    model:'Model', scored_today:'Scored Today', high_intent:'High Intent', avg_score:'Avg Score',
    feature_weights:'Model Feature Weights', live_queue:'Live Scoring Queue', processing:'Processing',
    buyers_detected:'Buyers Detected', sellers:'Sellers', high_urgency:'High Urgency', nlp_model:'NLP Model',
    urgent_actions:'Urgent Actions', scheduled:'Scheduled', completed_today:'Completed Today', ai_confidence:'AI Confidence',
    ai_actions:'AI-Recommended Actions', ranked_revenue:'Ranked by revenue impact',
    wa_head:'WhatsApp — 14 unread', buyer:'Buyer', serious:'Serious', call_now:'Call Now',
    lead_intel:'Lead Intelligence', ai_score_label:'AI Score', pref_area:'Preferred Area',
    timeframe:'Timeframe', financing:'Financing', cash_buyer:'Cash buyer',
    book_viewing:'Book Viewing', assign_crm:'Assign to CRM', send_shortlist:'Send Shortlist',
    use_suggestion:'Use ↑', type_message:'Type a message...', cop_ph:'Ask about leads, scores, actions...',
    sms_sequences:'SMS / WhatsApp Sequences', new_sequence:'+ New Sequence',
    top_funnel:'Top of Funnel', total_leads_label:'Total leads', qual_rate:'Qualified Rate',
    meeting_rate:'Meeting Rate', close_rate:'Close Rate', conv_funnel:'Conversion Funnel', dropoff:'Drop-off Analysis',
    do1:'Main reason: Slow response time (>15 min)', do2:'Main reason: No WhatsApp follow-up',
    do3:'Main reason: Property mismatch', do4:'Main reason: Financing delays',
    best_roi:'Best ROI Channel', ad_spend:'Total Ad Spend', rev_attributed:'Revenue Attributed',
    channel_perf:'Channel Performance & ROI',
    active_agents:'Active Agents', top_converter:'Top Converter', avg_response:'Avg Response',
    sla_breaches:'SLA Breaches', agent_leaderboard:'Agent Leaderboard',
    status:'Status', booked:'Booked', conv_rate:'Conv.', response_time_col:'Response',
    sla_compliance:'SLA Compliance', active_breaches:'Active Breaches', at_risk:'At Risk', resolved_today:'Resolved Today',
    sla_queue:'SLA Queue — Response Time Tracker',
    overall_status:'Overall Status', compliant:'Compliant', data_region:'Data Region',
    review:'Review', encryption:'Encryption', audit_log:'Audit Log — Last 24 Hours',
    time:'Time', event:'Event', user:'User',
    add_lead_title:'Add New Lead', full_name:'Full Name', wa_phone:'WhatsApp / Phone',
    budget_aed:'Budget (AED)', cancel:'Cancel', add_score:'Add & Score',
    copilot_name:'Observer AI Copilot', copilot_status:'● Online · Analyzing 247 leads',
    copilot_intro:"I'm your AI Copilot. Right now: Ahmed Al Khalidi (Score: 87) has been viewing listings for 40 mins. No contact yet.",
    tt_theme:'Light / Dark mode', tt_density:'Compact / Comfortable', tt_focus:'Focus Mode',
    search_ph:'Search leads, agents...',
  },
  ar: {
    brand:'أوبزرفر', brand_sub:'محرك الإيرادات الذاتي', ai_powered:'عرض',
    org_sub:'وكالة تجريبية',
    nav_core:'الأساسيات', nav_dashboard:'لوحة القيادة', nav_pipeline:'خط المبيعات', nav_leads:'جميع العملاء',
    nav_ai:'محرك الذكاء الاصطناعي', nav_scoring:'تقييم العملاء', nav_intent:'كشف النية', nav_nba:'أفضل إجراء قادم',
    nav_channels:'القنوات', nav_wa:'واتساب', nav_sms:'رسائل / تسلسلات', nav_social_auto:'أتمتة فيسبوك وإنستغرام',
    nav_analytics:'التحليلات', nav_funnel:'قمع التحويل', nav_roi:'عائد القنوات', nav_agents:'أداء الوكلاء',
    nav_enterprise:'المؤسسة', nav_sla:'تتبع مستوى الخدمة', nav_compliance:'الامتثال', nav_notif:'الإشعارات',
    live:'عرض', ai_active:'بيانات تجريبية', add_lead:'إضافة عميل',
    m_total:'إجمالي العملاء', m_hot:'العملاء الساخنون 🔥', m_calls:'المكالمات المحجوزة', m_response:'متوسط الاستجابة',
    m_ai_score:'متوسط نقاط الذكاء', m_wa:'فتح واتساب', m_revenue:'خط الإيرادات', m_cpl:'تكلفة العميل',
    this_week:'هذا الأسبوع', today:'اليوم', scored:'مُقيَّم', booking_rate:'معدل الحجز',
    speed_to_lead:'↑ سرعة الاستجابة',
    hot_leads_panel:'العملاء الساخنون — تصرف الآن', col_lead:'العميل', col_score:'نقاط الذكاء', col_intent:'النية',
    col_time:'الوقت', col_source:'المصدر', col_temp:'الحرارة', col_budget:'الميزانية', col_agent:'الوكيل', col_last:'آخر تواصل',
    live_activity:'تدفق النشاط المباشر', realtime:'لحظي',
    nba_panel:'أفضل الإجراءات القادمة', view_all:'عرض الكل ←',
    temp_dist:'توزيع درجة حرارة العملاء', hot:'ساخن', warm:'دافئ', cold:'بارد',
    total_leads_ai:'247 إجمالي · مُقيَّم بالذكاء', daily_chart_label:'العملاء الجدد يومياً — آخر 14 يوم',
    agents_today:'الوكلاء اليوم', pipeline_velocity:'سرعة خط المبيعات', channel_mix:'مزيج القنوات اليوم',
    new:'جديد', qualified:'مؤهل', meeting_set:'اجتماع محدد', closed:'صفقات مغلقة',
    deal_pipeline:'خط الصفقات — كانبان',
    filter_all:'الكل (0)', filter_hot:'ساخن (0)', filter_warm:'دافئ (0)', filter_cold:'بارد (0)',
    filter_buyers:'المشترون', filter_sellers:'البائعون',
    model:'النموذج', scored_today:'مُقيَّم اليوم', high_intent:'نية عالية', avg_score:'متوسط النقاط',
    feature_weights:'أوزان ميزات النموذج', live_queue:'قائمة التقييم المباشر', processing:'يعالج',
    buyers_detected:'المشترون المكتشفون', sellers:'البائعون', high_urgency:'إلحاح عالٍ', nlp_model:'نموذج NLP',
    urgent_actions:'إجراءات عاجلة', scheduled:'مجدولة', completed_today:'مكتملة اليوم', ai_confidence:'ثقة الذكاء',
    ai_actions:'إجراءات موصى بها بالذكاء', ranked_revenue:'مرتبة حسب تأثير الإيرادات',
    wa_head:'واتساب — 14 غير مقروء', buyer:'مشترٍ', serious:'جادّ', call_now:'اتصل الآن',
    lead_intel:'معلومات العميل', ai_score_label:'نقاط الذكاء', pref_area:'المنطقة المفضلة',
    timeframe:'الإطار الزمني', financing:'التمويل', cash_buyer:'مشترٍ نقداً',
    book_viewing:'حجز معاينة', assign_crm:'إرسال إلى CRM', send_shortlist:'إرسال القائمة',
    use_suggestion:'استخدام ↑', type_message:'اكتب رسالة...', cop_ph:'اسأل عن العملاء، النقاط، الإجراءات...',
    sms_sequences:'تسلسلات SMS / واتساب', new_sequence:'+ تسلسل جديد',
    top_funnel:'أعلى القمع', total_leads_label:'إجمالي العملاء', qual_rate:'معدل التأهيل',
    meeting_rate:'معدل الاجتماعات', close_rate:'معدل الإغلاق', conv_funnel:'قمع التحويل', dropoff:'تحليل التسرب',
    do1:'السبب الرئيسي: بطء الاستجابة (أكثر من 15 دقيقة)', do2:'السبب الرئيسي: لا متابعة على واتساب',
    do3:'السبب الرئيسي: عدم مطابقة العقار', do4:'السبب الرئيسي: تأخر التمويل',
    best_roi:'أفضل قناة عائداً', ad_spend:'إجمالي الإنفاق الإعلاني', rev_attributed:'الإيرادات المنسوبة',
    channel_perf:'أداء القنوات وعائد الاستثمار',
    active_agents:'الوكلاء النشطون', top_converter:'أعلى نسبة تحويل', avg_response:'متوسط الاستجابة',
    sla_breaches:'انتهاكات SLA', agent_leaderboard:'ترتيب الوكلاء',
    status:'الحالة', booked:'محجوز', conv_rate:'التحويل', response_time_col:'الاستجابة',
    sla_compliance:'امتثال SLA', active_breaches:'انتهاكات نشطة', at_risk:'في خطر', resolved_today:'محلولة اليوم',
    sla_queue:'قائمة SLA — تتبع وقت الاستجابة',
    overall_status:'الحالة العامة', compliant:'ملتزم', data_region:'منطقة البيانات',
    review:'مراجعة', encryption:'التشفير', audit_log:'سجل التدقيق — آخر 24 ساعة',
    time:'الوقت', event:'الحدث', user:'المستخدم',
    add_lead_title:'إضافة عميل جديد', full_name:'الاسم الكامل', wa_phone:'واتساب / الهاتف',
    budget_aed:'الميزانية (درهم)', cancel:'إلغاء', add_score:'إضافة وتقييم',
    copilot_name:'مساعد AI الذكي', copilot_status:'● متصل · يحلل 247 عميلاً',
    copilot_intro:'أنا مساعدك الذكي. الآن: أحمد الخالدي (نقاط: 87) يتصفح القوائم منذ 40 دقيقة. لم يتم التواصل بعد.',
    tt_theme:'الوضع الفاتح / الداكن', tt_density:'مضغوط / مريح', tt_focus:'وضع التركيز',
    search_ph:'بحث عن عملاء، وكلاء...',
  }
};
let currentLang = 'en';

function applyLang(lang) {
  const t = T[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) el.placeholder = t[key];
  });
  const root = document.getElementById('root');
  if (lang === 'ar') {
    root.setAttribute('lang', 'ar');
    root.setAttribute('dir', 'rtl');
    document.getElementById('langLabel').textContent = 'EN';
  } else {
    root.setAttribute('lang', 'en');
    root.setAttribute('dir', 'ltr');
    document.getElementById('langLabel').textContent = 'AR';
  }
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  applyLang(currentLang);
  const btn = document.getElementById('langBtn');
  btn.classList.toggle('active', currentLang === 'ar');
  if(typeof updateHeroGreeting==='function') updateHeroGreeting();
}

// ══════════════════════════════════════════════════
// THEME / MODE CONTROLS
// ══════════════════════════════════════════════════
function toggleTheme() {
  document.body.classList.toggle('light');
  const btn = document.getElementById('themeBtn');
  btn.classList.toggle('active', document.body.classList.contains('light'));
  btn.textContent = document.body.classList.contains('light') ? '🌙' : '🌗';
  btn.appendChild(Object.assign(document.createElement('span'),{className:'ctrl-tooltip',textContent:T[currentLang].tt_theme}));
}
function toggleDensity() {
  document.body.classList.toggle('compact');
  document.getElementById('densityBtn').classList.toggle('active', document.body.classList.contains('compact'));
}
function toggleFocus() {
  document.body.classList.toggle('focus');
  document.getElementById('focusBtn').classList.toggle('active', document.body.classList.contains('focus'));
}

// ══════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════
// Leads come from /api/leads (loaded by common.js before this script runs).
const leads=window.__leads||[];

// ── PROPERTY IMAGE LIBRARY — realistic GCC residential, mapped by area ──
// Uses photo IDs already proven to render in this app (developer hero set),
// matched to each area's character. Every use has a gradient fallback.
const PROPERTY_LIBRARY = {
  'Dubai Hills':    {img:'1600585154340-be6161a56a0c', type:'5BR Villa',  beds:5, label:'Dubai Hills Estate'},
  'Downtown':       {img:'1582672060674-bc2bd808a8f5', type:'2BR Apartment', beds:2, label:'Downtown Dubai'},
  'Palm Jumeirah':  {img:'1546412414-e1885259563a',     type:'4BR Signature Villa', beds:4, label:'Palm Jumeirah'},
  'Emirates Hills': {img:'1564013799919-ab600027ffc6', type:'7BR Mansion', beds:7, label:'Emirates Hills'},
  'Business Bay':   {img:'1583531352515-8884af319dc6', type:'2BR Apartment', beds:2, label:'Business Bay'},
  'JVC':            {img:'1583254023224-f1a87a04f4ce', type:'3BR Townhouse', beds:3, label:'Jumeirah Village Circle'},
  'MBR City':       {img:'1545324418-cc1a3fa10c00',     type:'4BR Villa',  beds:4, label:'MBR City'},
  'Sharjah':        {img:'1518684079-3c830dcef090',     type:'2BR Apartment', beds:2, label:'Al Majaz, Sharjah'},
  'Ajman':          {img:'1591604129939-f1efa4d9f7fa', type:'1BR Apartment', beds:1, label:'Ajman Corniche'},
  '_default':       {img:'1572883454114-1cf0031ede2a', type:'Apartment', beds:2, label:'Dubai'},
};
function propFor(area){ return PROPERTY_LIBRARY[area] || PROPERTY_LIBRARY['_default']; }
function propImg(area,w){ const p=propFor(area); return `https://images.unsplash.com/photo-${p.img}?w=${w||600}&q=80&auto=format&fit=crop`; }
// Build a realistic listing object for a lead (price near their budget)
function listingFor(lead){
  const p = propFor(lead.area);
  return {
    title: `${p.type} · ${p.label}`,
    img: propImg(lead.area, 600),
    imgSmall: propImg(lead.area, 280),
    price: lead.budget,
    meta: `${p.beds} Bed · ${esc(lead.area)} · ${lead.type==='Seller'?'For Valuation':'For Sale'}`,
    ref: 'OBS-' + (1000 + (lead.id||1)*7)
  };
}
const agents=[
  {initials:'SA',name:'Sarah Ahmed',status:'online',hot:12,booked:8,conv:32,resp:'3m',score:94,sla:'OK',photo:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'KM',name:'Khalid Mansouri',status:'online',hot:9,booked:5,conv:27,resp:'5m',score:87,sla:'OK',photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'LR',name:'Leila Rashid',status:'busy',hot:7,booked:3,conv:21,resp:'9m',score:71,sla:'WARN',photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'AT',name:'Ahmed Tariq',status:'online',hot:6,booked:4,conv:25,resp:'4m',score:82,sla:'OK',photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'NA',name:'Nadia Al Sayed',status:'offline',hot:3,booked:1,conv:17,resp:'18m',score:58,sla:'BREACH',photo:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
];
const kanbanData={
  'New':[{name:'Omar Al Farouq',type:'Buyer',time:'2m ago',temp:'cold',score:44},{name:'Sara Al Blooshi',type:'Buyer',time:'14m ago',temp:'cold',score:38}],
  'Qualified':[{name:'Rania Hassan',type:'Buyer',time:'1h ago',temp:'warm',score:69},{name:'Tariq Mahmoud',type:'Seller',time:'2h ago',temp:'warm',score:55}],
  'Meeting Set':[{name:'Fatima Al Zaabi',type:'Buyer',time:'3h ago',temp:'hot',score:81}],
  'Offer Stage':[{name:'Nour Al Mansouri',type:'Buyer',time:'Yesterday',temp:'hot',score:91}],
  'Closed Won':[{name:'Jaber Al Nuaimi',type:'Buyer',time:'2d ago',temp:'hot',score:88}],
};
const activityEvents=[
  {icon:'🔥',color:'var(--hot-bg)',text:'<strong>Ahmed Al Khalidi</strong> AI score upgraded to 87 — Cash buyer, 1-2 mo timeline'},
  {icon:'💬',color:'var(--wa-bg)',text:'<strong>Nour Al Mansouri</strong> replied on WhatsApp — "Yes, I want to proceed with the offer"'},
  {icon:'📞',color:'var(--green-bg)',text:'<strong>Sarah Ahmed</strong> booked a viewing with Fatima Al Zaabi for tomorrow 10am'},
  {icon:'⚡',color:'var(--purple-bg)',text:'AI Copilot flagged <strong>5 leads</strong> with no contact in 2+ hours — SLA risk'},
  {icon:'🏠',color:'var(--accent-bg)',text:'<strong>Jaber Al Nuaimi</strong> deal closed — AED 3.8M villa in Dubai Hills'},
  {icon:'📊',color:'var(--cold-bg)',text:'Sample event: scoring rules re-ran over <strong>184 leads</strong> (illustrative)'},
];
const nbaData=[
  {p:'p1',lead:'Ahmed Al Khalidi',action:'Send WhatsApp now',reason:'Score 87 · Cash buyer · Viewed 8 listings · No contact',channel:'💬 WhatsApp',btn:'Send'},
  {p:'p1',lead:'Nour Al Mansouri',action:'Call immediately',reason:'Score 91 · Offer pending · Reply 2h ago — revenue at risk',channel:'📞 Call',btn:'Call'},
  {p:'p2',lead:'Fatima Al Zaabi',action:'Confirm viewing',reason:'Meeting set · No confirmation · Viewing in 18 hours',channel:'💬 WhatsApp',btn:'Confirm'},
  {p:'p2',lead:'Rania Hassan',action:'Send property shortlist',reason:'Score 69 · Opened last message · Palm Jumeirah interest',channel:'📱 SMS',btn:'Send List'},
  {p:'p3',lead:'Mohammad Siddiqui',action:'Assign to agent',reason:'Score 73 · No agent · 6h wait',channel:'👤 Assign',btn:'Assign'},
];
const waContacts=[
  {initials:'AK',name:'Ahmed Al Khalidi',preview:'Yes I am interested in the villas...',time:'2m',unread:3,score:87,temp:'hot',active:true,c:'#1a3a2a',photo:'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'NM',name:'Nour Al Mansouri',preview:'When can we sign?',time:'2h',unread:1,score:91,temp:'hot',active:false,c:'#2a1a3a',photo:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'FA',name:'Fatima Al Zaabi',preview:'Can we meet tomorrow?',time:'3h',unread:0,score:81,temp:'hot',active:false,c:'#1a2a3a',photo:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'RH',name:'Rania Hassan',preview:'Send me the listings please',time:'5h',unread:1,score:69,temp:'warm',active:false,c:'#2a2a1a',photo:'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
  {initials:'TM',name:'Tariq Mahmoud',preview:'What is your commission?',time:'1d',unread:0,score:55,temp:'warm',active:false,c:'#1a2a2a',photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&q=80&auto=format&fit=crop&crop=faces'},
];
const waMsgs=[
  {dir:'in',text:'Hello, I saw your listing on Bayut for the villa in Dubai Hills. Very interested.',time:'10:24'},
  {dir:'out',text:"Hi Ahmed! I'm Sarah, your consultant at Emaar. The Dubai Hills villa is stunning — 5BR, pool, AED 4.2M. Are you looking for primary residence or investment?",time:'10:25'},
  {dir:'out',time:'10:25',prop:{title:'5BR Villa · Dubai Hills Estate',img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',meta:'5 Bed · Private Pool · Dubai Hills',price:'AED 4,200,000'}},
  {dir:'in',text:'Primary residence. Family of 5. What is the handover date?',time:'10:28'},
  {dir:'out',text:'Ready to move in immediately — it\'s a completed villa! I have 3 similar options in AED 3.5-4.5M. Viewing this week?',time:'10:29'},
  {dir:'in',text:'Yes please! I need to see at least 3 options. Are you free Thursday?',time:'10:31'},
  {dir:'out',text:'Thursday works! I\'ll prepare a comparative shortlist. See you at our office at 11am?',time:'10:32'},
  {dir:'in',text:'Yes I am interested. Please send me the details and price comparison.',time:'10:45'},
];
const smsSequences=[
  {name:'Bayut Hot Lead — WhatsApp',channel:'whatsapp',trigger:'Score > 70 from Bayut',active:true,enrolled:142,sent:892,openRate:91,steps:[
    {delay:'Immediate',type:'whatsapp',msg:'Hi {name}! Saw you were looking at properties on Bayut. I\'m your dedicated consultant — what\'s your budget and preferred area? 🏠'},
    {delay:'+2 hours',type:'whatsapp',msg:'Hi {name}, I have 5 exclusive listings matching your search that aren\'t on the portals yet. Interested in a preview?'},
    {delay:'+1 day',type:'whatsapp',msg:'Good morning {name}! New inventory in {area} this week. When\'s a good time for a quick 10-min call?'},
  ]},
  {name:'WhatsApp Re-engagement (48h)',channel:'whatsapp',trigger:'No reply in 48h',active:true,enrolled:89,sent:312,openRate:78,steps:[
    {delay:'48h after last message',type:'whatsapp',msg:'Hi {name}, the market is moving fast in {area}. A similar property to what you liked sold yesterday. Can I share an update?'},
    {delay:'+3 days',type:'whatsapp',msg:'Hi {name} — last check-in. I have something exclusive matching exactly what you\'re looking for. 5 min call this week?'},
  ]},
  {name:'Post-Viewing Follow-up',channel:'whatsapp',trigger:'Viewing completed',active:true,enrolled:34,sent:68,openRate:97,steps:[
    {delay:'2h after viewing',type:'whatsapp',msg:'Hi {name}! Great meeting you today. Which of the 3 properties resonated most? I can arrange a 2nd visit or start the paperwork 😊'},
    {delay:'+1 day',type:'whatsapp',msg:'{name}, wanted to check — any questions I can answer? Ready to prepare the LOI whenever you are.'},
  ]},
  {name:'Cold Lead SMS Reactivation',channel:'sms',trigger:'Cold lead, 7+ days no contact',active:true,enrolled:211,sent:634,openRate:68,steps:[
    {delay:'Day 7',type:'sms',msg:'Hi {name}, this is {agent} from Observer. Dubai property prices rose 8% last quarter. Worth a quick chat about your search? Reply YES.'},
    {delay:'+5 days',type:'sms',msg:'{name} — exclusive new listing in {area} just came in. Budget {budget}. Interested? Reply YES for details.'},
    {delay:'+7 days',type:'sms',msg:'Final update {name}: I\'m reserving one viewing slot this week. First come first served. Reply to book.'},
  ]},
  {name:'New Lead SMS Instant Touch',channel:'sms',trigger:'Any new lead, all sources',active:true,enrolled:247,sent:247,openRate:72,steps:[
    {delay:'Within 3 minutes',type:'sms',msg:'Hi {name}! I\'m {agent}, your dedicated property consultant. I saw your enquiry — quick question: are you looking to buy, sell or rent? Reply 1, 2 or 3.'},
  ]},
  {name:'Monthly Market Update — Email',channel:'email',trigger:'All leads, 1st of each month',active:true,enrolled:1840,sent:1840,openRate:31,steps:[
    {delay:'1st of month, 9am',type:'email',msg:'Subject: Dubai Property Market Update — {month}\n\nHi {name},\n\nHere\'s your personalised market summary for {area}...\n\n• Average prices: +{pct}% this month\n• New inventory: {count} units\n• Best value areas right now: {areas}\n\nBook a free consultation to review your portfolio.'},
  ]},
  {name:'🤖 AI Call — Unclosed Hot Leads',channel:'ai_call',trigger:'Hot lead, no close in 72h',active:true,enrolled:38,sent:38,openRate:84,steps:[
    {delay:'72h after hot score',type:'ai_call',msg:'AI dials lead. Script: "Hi {name}, this is the AI assistant for your property consultant. You recently showed interest in {area}. I\'d love to share 2 new listings that just became available. Do you have 3 minutes?"'},
    {delay:'+2 days if no answer',type:'ai_call',msg:'AI retry call with voicemail drop: "Hi {name}, leaving a quick message — we have something exclusive in {area} within your budget. Call us back or reply to this message."'},
  ]},
];
const notifs=[
  {text:'🔥 Ahmed Al Khalidi AI score jumped to 87 — Cash buyer, act now',time:'2m ago',color:'var(--hot)',unread:true},
  {text:'🚨 SLA breach: Nadia Al Sayed — lead unresponded for 22 minutes',time:'5m ago',color:'var(--hot)',unread:true},
  {text:'💬 Nour Al Mansouri replied on WhatsApp: "When can we sign?"',time:'2h ago',color:'var(--wa-dark)',unread:true},
  {text:'⚡ AI Copilot: 5 leads flagged for SLA risk in next 15 minutes',time:'2h ago',color:'var(--purple)',unread:true},
  {text:'✅ Deal closed: Jaber Al Nuaimi — AED 3.8M, Dubai Hills villa',time:'3h ago',color:'var(--green)',unread:false},
  {text:'📊 Daily AI scoring complete: 184 leads re-evaluated, 47 upgraded',time:'4h ago',color:'var(--cold)',unread:false},
  {text:'📋 Rania Hassan qualified — assigned to Ahmed Tariq',time:'5h ago',color:'var(--accent)',unread:false},
  {text:'🏠 New lead from Property Finder: Sara Al Blooshi, AED 750K budget',time:'6h ago',color:'var(--text2)',unread:false},
  {text:'⚠️ PDPL compliance review: 1 item requires attention before Friday',time:'1d ago',color:'var(--warm)',unread:false},
];
const weights=[
  {label:'Engagement Time',pts:28,color:'var(--hot)'},
  {label:'Budget Match',pts:24,color:'var(--accent)'},
  {label:'Response Speed',pts:20,color:'var(--green)'},
  {label:'Source Quality',pts:16,color:'var(--purple)'},
  {label:'Timeframe',pts:22,color:'var(--warm)'},
  {label:'Financing Type',pts:12,color:'var(--cold)'},
  {label:'Area Demand',pts:18,color:'var(--teal)'},
];
const scoreQueue=[
  {name:'Ahmed Al Khalidi',source:'Bayut',score:87,fill:'var(--hot)',pct:87,done:true},
  {name:'Nour Al Mansouri',source:'WhatsApp',score:91,fill:'var(--hot)',pct:91,done:true},
  {name:'Fatima Al Zaabi',source:'Property Finder',score:81,fill:'var(--hot)',pct:81,done:true},
  {name:'Rania Hassan',source:'Referral',score:69,fill:'var(--warm)',pct:69,done:true},
  {name:'New Lead #248',source:'Facebook',score:0,fill:'var(--purple)',pct:0,done:false,scoring:true},
];
const intentLeads=[
  {name:'Ahmed Al Khalidi',initials:'AK',phone:'+971 50 234 5678',tags:['buyer','serious','high-budget'],photo:'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',msgs:[
    {dir:'in',text:'I\'m looking for a villa in Dubai Hills, budget around 4 million. Cash purchase.'},
    {dir:'out',text:'Perfect! I have 3 options. When are you looking to move in?'},
    {dir:'in',text:'We need to move within 6 weeks. Can you show me something this week?'},
  ]},
  {name:'Nour Al Mansouri',initials:'NM',phone:'+971 52 456 7890',tags:['buyer','serious','high-budget','urgent'],photo:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',msgs:[
    {dir:'in',text:'I want to buy in Emirates Hills. Above AED 5M. I\'m ready to proceed immediately.'},
    {dir:'out',text:'We have an exclusive 7BR villa at AED 6.2M. Shall I send details?'},
    {dir:'in',text:'Yes please. Can we sign the LOI this week if I like it?'},
  ]},
  {name:'Tariq Mahmoud',initials:'TM',phone:'+971 50 890 1234',tags:['seller','researching'],photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&q=80&auto=format&fit=crop&crop=faces',msgs:[
    {dir:'in',text:'I have a 2BR in Business Bay. Curious what price I could get. Just researching.'},
    {dir:'out',text:'We recently sold a similar unit for AED 2.1M. Want a free valuation?'},
    {dir:'in',text:'Maybe later. What\'s the market like right now?'},
  ]},
  {name:'Omar Al Farouq',initials:'OF',phone:'+971 56 789 0123',tags:['buyer','researching'],msgs:[
    {dir:'in',text:'Hi, I\'m looking for apartments in Sharjah, budget 900K. Not urgent, just looking.'},
    {dir:'out',text:'Great! I can send you our Sharjah portfolio. Any preference for size?'},
    {dir:'in',text:'2BR preferably. No rush, planning for next year.'},
  ]},
];
const slaItems=[
  {name:'Ahmed Al Khalidi',meta:'Bayut · Score 87 · Hot',timer:'00:12:34',status:'ok',pct:20,action:'Contact Now'},
  {name:'Omar Al Farouq',meta:'Bayut · Score 44 · Cold',timer:'01:48:22',status:'breach',pct:100,action:'Escalate'},
  {name:'Sara Al Blooshi',meta:'Facebook · Score 38 · Cold',timer:'01:22:10',status:'breach',pct:100,action:'Escalate'},
  {name:'Mohammad Siddiqui',meta:'Facebook · Score 73 · Warm',timer:'00:48:55',status:'warn',pct:75,action:'Assign Agent'},
  {name:'Rania Hassan',meta:'Referral · Score 69 · Warm',timer:'00:32:10',status:'warn',pct:62,action:'Follow Up'},
];

// ══════════════════════════════════════════════════════════════
// ⚡ OBSERVER AI ENGINE — real, explainable logic (not mock data)
// Scoring · Intent NLP · Next-Best-Action · Channel Orchestration
// ══════════════════════════════════════════════════════════════
const AIEngine = (()=>{

  // ── Source quality priors (conversion-rate informed) ──
  const SOURCE_QUALITY = {
    'WhatsApp':0.95,'Referral':0.92,'Bayut':0.78,'Property Finder':0.74,
    'Facebook':0.55,'Instagram':0.52,'Dubizzle':0.60,'Website':0.70
  };
  // ── Timeframe → urgency multiplier ──
  const TIMEFRAME_SCORE = {'<1 mo':1.0,'1-2 mo':0.85,'3 mo':0.6,'4 mo':0.5,'6 mo':0.35,'12 mo':0.2,'18 mo':0.1};
  // ── Budget → tier (AED) ──
  function budgetTier(budgetStr){
    const n = parseFloat(String(budgetStr).replace(/[^0-9.]/g,''))||0;
    const m = /K/i.test(budgetStr)? n/1000 : n; // normalize to millions
    if(m>=5) return {tier:'Ultra-Prime',score:1.0};
    if(m>=3) return {tier:'Prime',score:0.85};
    if(m>=1.5) return {tier:'Mid-Market',score:0.65};
    if(m>=0.8) return {tier:'Entry',score:0.45};
    return {tier:'Budget',score:0.3};
  }

  // ── EXPLAINABLE LEAD SCORE ──────────────────────────────────
  // Returns 0-100 score + per-feature contribution breakdown
  function scoreLead(lead, weightMap){
    const w = weightMap || weightsAsMap();
    const contrib = [];
    const push=(label,raw,weight,color)=>{ const pts=Math.round(raw*weight); contrib.push({label,pts,weight,raw:Math.round(raw*100),color}); return pts; };

    let total=0;
    // Financing (cash buyers convert faster)
    total += push('Financing', lead.financing==='Cash'?1.0:lead.financing==='Mortgage'?0.55:0.3, w['Financing Type'], 'var(--cold)');
    // Budget match
    const bt = budgetTier(lead.budget);
    total += push('Budget Match', bt.score, w['Budget Match'], 'var(--accent)');
    // Timeframe / urgency
    total += push('Timeframe', TIMEFRAME_SCORE[lead.timeframe]??0.4, w['Timeframe'], 'var(--warm)');
    // Source quality
    total += push('Source Quality', SOURCE_QUALITY[lead.source]??0.5, w['Source Quality'], 'var(--purple)');
    // Intent urgency (from NLP)
    total += push('Engagement', lead.urgency==='serious'?0.95:lead.urgency==='researching'?0.4:0.6, w['Engagement Time'], 'var(--hot)');
    // Response speed proxy (hot temp = engaged)
    total += push('Response Speed', lead.temp==='hot'?0.9:lead.temp==='warm'?0.6:0.3, w['Response Speed'], 'var(--green)');
    // Area demand (prime areas)
    const primeAreas=['Dubai Hills','Downtown','Palm Jumeirah','Emirates Hills','MBR City','Business Bay'];
    total += push('Area Demand', primeAreas.some(a=>(lead.area||'').includes(a))?0.9:0.5, w['Area Demand'], 'var(--teal)');

    const maxPossible = Object.values(w).reduce((a,b)=>a+b,0);
    const score = Math.max(0,Math.min(100, Math.round(total/maxPossible*100)));
    const temp = score>=78?'hot':score>=55?'warm':'cold';
    contrib.sort((a,b)=>b.pts-a.pts);
    return {score, temp, contrib, bt};
  }
  function weightsAsMap(){ const m={}; weights.forEach(x=>m[x.label]=x.pts); return m; }

  // ── INTENT NLP — real signal extraction from message text ───
  const SIGNALS = {
    buyer:    {rx:/\b(buy|buying|purchase|looking for|interested in|want a|need a|acquire)\b/i, label:'Buyer', color:'var(--green)'},
    seller:   {rx:/\b(sell|selling|my (villa|apartment|unit|property)|valuation|what.*price.*get|list my)\b/i, label:'Seller', color:'var(--cold)'},
    urgent:   {rx:/\b(immediately|asap|urgent|this week|right away|ready to (proceed|sign|buy)|within \d+ (week|weeks|day|days)|move within)\b/i, label:'Urgent', color:'var(--hot)'},
    cashRich: {rx:/\b(cash|full payment|no mortgage|ready to pay|million|above aed|budget.*[0-9])\b/i, label:'High-Budget', color:'var(--accent)'},
    serious:  {rx:/\b(LOI|sign|proceed|paperwork|offer|deposit|book|viewing|see (it|them|the)|when can)\b/i, label:'Serious', color:'var(--purple)'},
    researching:{rx:/\b(just (looking|browsing|researching|curious)|no rush|not urgent|maybe later|next year|planning|thinking about)\b/i, label:'Researching', color:'var(--text2)'},
    investor: {rx:/\b(investment|ROI|rental yield|return|portfolio|rent it out|capital appreciation)\b/i, label:'Investor', color:'var(--teal)'},
  };
  // Extract intent signals from a thread of messages (inbound only)
  function extractIntent(msgs){
    const text = msgs.filter(m=>m.dir==='in').map(m=>m.text).join(' ');
    const hits=[]; const detail={};
    for(const [key,sig] of Object.entries(SIGNALS)){
      const m = text.match(sig.rx);
      if(m){ hits.push({key,label:sig.label,color:sig.color,evidence:m[0]}); detail[key]=m[0]; }
    }
    // Confidence from number + strength of signals
    let conf = Math.min(98, 45 + hits.length*13);
    // Primary classification
    const isBuyer = detail.buyer || (detail.serious && !detail.seller);
    const primary = detail.seller ? 'Seller' : isBuyer ? 'Buyer' : 'Unknown';
    const urgency = detail.researching ? 'Low' : detail.urgent ? 'High' : 'Medium';
    // Extract budget mention
    const budgetMatch = text.match(/\b(\d+(?:\.\d+)?)\s*(million|m|k|thousand)\b/i) || text.match(/AED\s*([\d,.]+)/i);
    return {primary, urgency, confidence:conf, signals:hits, budgetMention: budgetMatch?budgetMatch[0]:null};
  }

  // ── NEXT BEST ACTION — revenue-weighted ranking engine ──────
  // Each action scored by: revenue potential × close probability × SLA decay
  function rankActions(leadList){
    const now = Date.now();
    return leadList.map(l=>{
      const s = scoreLead(l);
      const bt = budgetTier(l.budget);
      const revenuePotential = parseFloat(String(l.budget).replace(/[^0-9.]/g,'')) * (/K/i.test(l.budget)?0.001:1); // millions
      const commission = revenuePotential * 0.02; // 2% commission (AED M)
      const closeProb = s.score/100 * (TIMEFRAME_SCORE[l.timeframe]??0.4);
      // SLA decay: cold leads waiting lose value fast
      const slaDecay = l.temp==='hot'?1.0:l.temp==='warm'?0.75:0.45;
      const priorityScore = commission * closeProb * slaDecay;
      // Pick channel by lead state
      let action, channel, why;
      if(l.status==='Offer Stage'||l.status==='Offer Made'){ action='Call immediately — close the deal'; channel='📞 Call'; why='Offer pending · revenue at risk'; }
      else if(l.temp==='hot' && l.status==='New'){ action='Send WhatsApp now'; channel='💬 WhatsApp'; why='Hot + uncontacted · speed-to-lead critical'; }
      else if(l.status==='Meeting Set'){ action='Confirm viewing'; channel='💬 WhatsApp'; why='Reduce no-show risk'; }
      else if(l.temp==='warm'){ action='Send property shortlist'; channel='📱 SMS'; why='Nurture · keep engaged'; }
      else if(l.temp==='cold'){ action='Enroll in AI re-engagement'; channel='🤖 AI Call'; why='Low touch · automate'; }
      else { action='Assign to agent'; channel='👤 Assign'; why='Needs ownership'; }
      return {lead:l.name, action, channel, why, score:s.score, temp:l.temp,
        priorityScore: Math.round(priorityScore*1000)/1000,
        commission: commission, closeProb: Math.round(closeProb*100),
        confidence: Math.min(97, 60+Math.round(s.score*0.35))};
    }).sort((a,b)=>b.priorityScore-a.priorityScore);
  }

  // ── MULTI-CHANNEL ORCHESTRATION — fallback waterfall ────────
  // Defines how follow-up cascades across channels until lead responds
  const ORCHESTRATION = {
    name:'Speed-to-Lead Cascade',
    description:'Every new lead enters here. The engine escalates channel-by-channel until the lead responds — then hands off to a human agent.',
    rules:[
      {step:1, channel:'WhatsApp', icon:'💬', color:'var(--wa-dark)', wait:'0 sec', condition:'On lead creation', action:'AI sends personalised opener + qualifying question', fallback:'No read in 30 min →'},
      {step:2, channel:'WhatsApp', icon:'💬', color:'var(--wa-dark)', wait:'30 min', condition:'Message unread', action:'AI re-sends with value hook (off-market listing)', fallback:'No reply in 2 h →'},
      {step:3, channel:'SMS', icon:'📱', color:'var(--warm)', wait:'2 hrs', condition:'WhatsApp unanswered', action:'SMS fallback — shorter, with reply-keyword CTA', fallback:'No reply in 24 h →'},
      {step:4, channel:'AI Voice Call', icon:'🤖', color:'var(--purple)', wait:'24 hrs', condition:'No text response', action:'AI places qualifying call, books viewing live, or drops voicemail', fallback:'No answer ×2 →'},
      {step:5, channel:'Email', icon:'📧', color:'var(--cold)', wait:'48 hrs', condition:'All direct channels exhausted', action:'Long-form: market report + curated listings, weekly cadence', fallback:'Re-enter at Day 7 (nurture loop)'},
      {step:6, channel:'Human Handoff', icon:'🤝', color:'var(--green)', wait:'On any reply', condition:'Lead responds on ANY channel', action:'Instant agent assignment + full context handoff. AI steps back.', fallback:'✓ Cascade complete'},
    ]
  };

  // Per-lead live journey state (which step each lead is currently at)
  const JOURNEYS = [
    {name:'Ahmed Al Khalidi', step:6, lastChannel:'WhatsApp', status:'responded', detail:'Replied on WhatsApp → handed to Sarah A.'},
    {name:'Rania Hassan', step:3, lastChannel:'SMS', status:'active', detail:'WhatsApp unread → SMS sent 12 min ago'},
    {name:'Omar Al Farouq', step:4, lastChannel:'AI Voice Call', status:'active', detail:'No text reply → AI call scheduled in 40 min'},
    {name:'Sara Al Blooshi', step:5, lastChannel:'Email', status:'active', detail:'Direct channels exhausted → nurture email cadence'},
    {name:'Mohammad Siddiqui', step:2, lastChannel:'WhatsApp', status:'active', detail:'2nd WhatsApp touch sent · awaiting read'},
  ];

  return {scoreLead, extractIntent, rankActions, budgetTier, ORCHESTRATION, JOURNEYS, SOURCE_QUALITY, weightsAsMap};
})();


const complianceItems=[
  {icon:'🔐',title:'Data Encryption',desc:'AES-256 at rest, TLS 1.3 in transit. All PII encrypted.',checks:[{ok:true,label:'Encrypted at rest'},{ok:true,label:'TLS 1.3 in transit'},{ok:true,label:'Key rotation active'}]},
  {icon:'🌍',title:'Data Residency',desc:'All data hosted in AWS Middle East (Bahrain). UAE & Saudi compliant.',checks:[{ok:true,label:'AWS ME-South (Bahrain)'},{ok:true,label:'No EU data transfer'},{ok:true,label:'Backup in region'}]},
  {icon:'📋',title:'PDPL — Saudi Arabia',desc:'Personal Data Protection Law compliance for Saudi operations.',checks:[{ok:true,label:'Consent management'},{ok:false,label:'Privacy notice update pending'},{ok:true,label:'Data retention policy set'}]},
  {icon:'🏛️',title:'UAE Data Protection',desc:'Federal Decree-Law No. 45 of 2021 on Personal Data Protection.',checks:[{ok:true,label:'DPA registration filed'},{ok:true,label:'DPIA completed'},{ok:true,label:'Data processor agreements'}]},
];
const auditLog=[
  {time:'14:32',event:'Lead data accessed',user:'Sarah Ahmed',ip:'192.168.1.44',status:'ok'},
  {time:'14:28',event:'WhatsApp message sent',user:'System/AI',ip:'10.0.0.1',status:'ok'},
  {time:'14:15',event:'Lead exported',user:'Khalid Mansouri',ip:'192.168.1.55',status:'ok'},
  {time:'13:44',event:'Failed login attempt',user:'unknown',ip:'45.12.88.201',status:'warn'},
  {time:'13:20',event:'AI model retrained',user:'System',ip:'10.0.0.2',status:'ok'},
];
const channelROI=[
  {name:'WhatsApp',icon:'💬',color:'var(--wa-dark)',leads:84,cpl:18,revenue:1820000,roi:412},
  {name:'Bayut',icon:'🏠',color:'var(--hot)',leads:67,cpl:52,revenue:1450000,roi:218},
  {name:'Property Finder',icon:'🔍',color:'var(--cold)',leads:55,cpl:61,revenue:980000,roi:174},
  {name:'Facebook Ads',icon:'📘',color:'#4267B2',leads:31,cpl:38,revenue:420000,roi:156},
  {name:'Referral',icon:'🤝',color:'var(--accent)',leads:10,cpl:0,revenue:650000,roi:'∞'},
];

// ══════════════════════════════════════════════════
// GCC DEVELOPERS DATA
// ══════════════════════════════════════════════════
const gccDevelopers = [
  // UAE
  {id:'emaar',name:'Emaar Properties',country:'UAE',flag:'🇦🇪',logo:'🏙️',accent:'linear-gradient(90deg,#c89b3c,#e8c06a)',founded:1997,projects:84,units:'180K+',value:'AED 580B',tier:1,
   hero:'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Burj Khalifa · Downtown Dubai',
   flagship:['Burj Khalifa','Dubai Mall','Dubai Creek Harbour','The Valley','Arabian Ranches 3'],
   desc:'UAE\'s largest developer. Master communities across Dubai & internationally.',tags:['Dubai Hills','Downtown','Emaar South','Creek Harbour']},
  {id:'damac',name:'DAMAC Properties',country:'UAE',flag:'🇦🇪',logo:'💎',accent:'linear-gradient(90deg,#c62828,#e53935)',founded:2002,projects:43,units:'46K+',value:'AED 300B',tier:1,
   hero:'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Cavalli Tower · Dubai Marina',
   flagship:['DAMAC Hills','Cavalli Tower','Rotana Hotel Residences','Safa Two','DAMAC Lagoons'],
   desc:'Luxury branded residences with Versace, Cavalli, and Trump partnerships.',tags:['Akoya','Business Bay','Dubai Marina','JLT']},
  {id:'meraas',name:'Meraas',country:'UAE',flag:'🇦🇪',logo:'🌆',accent:'linear-gradient(90deg,#1565c0,#1e88e5)',founded:2007,projects:22,units:'30K+',value:'AED 180B',tier:1,
   hero:'https://images.unsplash.com/photo-1583531352515-8884af319dc6?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Bluewaters Island · JBR',
   flagship:['City Walk','Bluewaters Island','Port De La Mer','La Mer','Al Wasl'],
   desc:'Government-backed developer. Lifestyle-focused master developments.',tags:['Jumeirah','Al Wasl','Port De La Mer']},
  {id:'nakheel',name:'Nakheel',country:'UAE',flag:'🇦🇪',logo:'🌴',accent:'linear-gradient(90deg,#00695c,#00897b)',founded:2000,projects:31,units:'55K+',value:'AED 250B',tier:1,
   hero:'https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Palm Jumeirah · Aerial View',
   flagship:['Palm Jumeirah','The World Islands','Palm Jebel Ali','Deira Islands','Jumeirah Village'],
   desc:'Master developer of iconic Palm projects and waterfront communities.',tags:['Palm Jumeirah','Deira','Jumeirah Village']},
  {id:'aldar',name:'Aldar Properties',country:'UAE',flag:'🇦🇪',logo:'🔵',accent:'linear-gradient(90deg,#6200ea,#7c4dff)',founded:2004,projects:38,units:'60K+',value:'AED 200B',tier:1,
   hero:'https://images.unsplash.com/photo-1583254023224-f1a87a04f4ce?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Saadiyat Island · Abu Dhabi',
   flagship:['Yas Island','Al Raha Beach','Saadiyat Island','Al Maryah Island','Nurai Island'],
   desc:'Abu Dhabi\'s leading developer. Iconic Yas and Saadiyat Island communities.',tags:['Abu Dhabi','Yas Island','Saadiyat']},
  {id:'sobha',name:'Sobha Realty',country:'UAE',flag:'🇦🇪',logo:'🏡',accent:'linear-gradient(90deg,#b8860b,#daa520)',founded:1976,projects:14,units:'28K+',value:'AED 120B',tier:2,
   hero:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Sobha Hartland · MBR City',
   flagship:['Sobha Hartland','Sobha Reserve','Sobha SeaHaven','Sobha One','Creek Vistas'],
   desc:'Premium quality construction with integrated backward supply chain.',tags:['MBR City','Hartland','Meydan']},
  {id:'azizi',name:'Azizi Developments',country:'UAE',flag:'🇦🇪',logo:'🏗️',accent:'linear-gradient(90deg,#0277bd,#0288d1)',founded:2007,projects:19,units:'35K+',value:'AED 100B',tier:2,
   hero:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Azizi Riviera · MBR City',
   flagship:['Azizi Riviera','Berton','Azizi Venice','Azizi Mina','Star of Obour'],
   desc:'Private developer with large-scale affordable luxury across Dubai.',tags:['MBR City','Palm Jumeirah','Downtown']},
  {id:'ellington',name:'Ellington Properties',country:'UAE',flag:'🇦🇪',logo:'🎨',accent:'linear-gradient(90deg,#c2185b,#e91e63)',founded:2014,projects:12,units:'8K+',value:'AED 40B',tier:2,
   hero:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Wilton Park · Mohammed Bin Rashid',
   flagship:['Crestmark','DT1','Ellington Beach House','Mercer House','Wilton Park Residences'],
   desc:'Design-led boutique developer. Architecture & interiors as product differentiator.',tags:['Downtown','JVC','Palm Jumeirah']},
  // Saudi Arabia
  {id:'neom',name:'NEOM',country:'KSA',flag:'🇸🇦',logo:'⚡',accent:'linear-gradient(90deg,#00bcd4,#0097a7)',founded:2017,projects:9,units:'N/A',value:'SAR 1.5T',tier:1,
   hero:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&auto=format&fit=crop',
   heroTitle:'The Line · Tabuk Province',
   flagship:['The Line','Sindalah','Oxagon','Trojena','Aqaba Waterfront'],
   desc:'Giga-project city of the future. $500B+ Vision 2030 megaproject.',tags:['The Line','Sindalah','Tabuk']},
  {id:'roshn',name:'ROSHN Group',country:'KSA',flag:'🇸🇦',logo:'🏘️',accent:'linear-gradient(90deg,#388e3c,#43a047)',founded:2019,projects:7,units:'400K+',value:'SAR 200B',tier:1,
   hero:'https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=900&q=80&auto=format&fit=crop',
   heroTitle:'SEDRA · Riyadh',
   flagship:['SEDRA','ALFULWA','WAREFA','MARAFY','ALQA'],
   desc:'PIF-backed developer creating Saudi Arabia\'s national housing programme.',tags:['Riyadh','Jeddah','Eastern Province']},
  {id:'dar',name:'Dar Al Arkan',country:'KSA',flag:'🇸🇦',logo:'🕌',accent:'linear-gradient(90deg,#e65100,#f57c00)',founded:1994,projects:18,units:'65K+',value:'SAR 90B',tier:1,
   hero:'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Shams Ar Riyadh',
   flagship:['Shams Ar Riyadh','Via Riyadh','Naseem Al Riyadh','Al Qasr','Juman'],
   desc:'Saudi Arabia\'s largest listed developer. Riyadh & Jeddah focus.',tags:['Riyadh','Jeddah','Makkah']},
  {id:'sdrg',name:'Red Sea Global',country:'KSA',flag:'🇸🇦',logo:'🌊',accent:'linear-gradient(90deg,#1a237e,#283593)',founded:2018,projects:4,units:'8K+',value:'SAR 500B',tier:1,
   hero:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop',
   heroTitle:'The Red Sea · Coral Bloom',
   flagship:['The Red Sea','Amaala','SHURA Island','Coral Bloom'],
   desc:'Ultra-luxury regenerative tourism & resort development along Red Sea coast.',tags:['Red Sea Coast','Tabuk','NEOM Region']},
  {id:'jabal',name:'Jabal Omar Development',country:'KSA',flag:'🇸🇦',logo:'🕋',accent:'linear-gradient(90deg,#4e342e,#6d4c41)',founded:2008,projects:6,units:'12K+',value:'SAR 70B',tier:1,
   hero:'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Jabal Omar · Makkah',
   flagship:['Jabal Omar Makkah','Conrad Makkah','Hyatt Regency Makkah','Hilton Makkah','Grand Millennium'],
   desc:'Iconic mixed-use development adjacent to the Grand Mosque in Makkah.',tags:['Makkah','Hajj District']},
  // Qatar
  {id:'barwa',name:'Barwa Real Estate',country:'Qatar',flag:'🇶🇦',logo:'🌐',accent:'linear-gradient(90deg,#8d1a1a,#b71c1c)',founded:2005,projects:12,units:'25K+',value:'QAR 80B',tier:1,
   hero:'https://images.unsplash.com/photo-1518803194621-27188ba362c9?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Doha Skyline · West Bay',
   flagship:['Barwa City','Madinat Al Mawater','Barwa Village','Pearl Residences','Ezdan Village'],
   desc:'Qatar\'s largest listed developer. Master communities for families & workers.',tags:['Lusail','Al Wakra','Doha']},
  {id:'qatarip',name:'Qatar Investment Projects',country:'Qatar',flag:'🇶🇦',logo:'🏆',accent:'linear-gradient(90deg,#1b5e20,#2e7d32)',founded:2010,projects:8,units:'14K+',value:'QAR 50B',tier:1,
   hero:'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Lusail City · Marina District',
   flagship:['Lusail Marina','Fox Hills','Entertainment City','Al Asmakh Towers','Gewan Island'],
   desc:'Joint venture developer focused on Lusail City and World Cup legacy projects.',tags:['Lusail','The Pearl','Msheireb']},
  // Kuwait
  {id:'mabanee',name:'Mabanee Company',country:'Kuwait',flag:'🇰🇼',logo:'🏢',accent:'linear-gradient(90deg,#1565c0,#0d47a1)',founded:1975,projects:8,units:'10K+',value:'KWD 2B',tier:1,
   hero:'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=900&q=80&auto=format&fit=crop',
   heroTitle:'The Avenues Mall · Kuwait City',
   flagship:['The Avenues Mall','Al Kout Mall','Marina Mall','Promenade','Al Rai Development'],
   desc:'Kuwait\'s leading commercial & mixed-use developer. Operates The Avenues.',tags:['Kuwait City','Salmiya','Hawalli']},
  // Bahrain
  {id:'eskan',name:'Eskan Bank Realty',country:'Bahrain',flag:'🇧🇭',logo:'🏦',accent:'linear-gradient(90deg,#880e4f,#ad1457)',founded:1979,projects:6,units:'7K+',value:'BHD 500M',tier:1,
   hero:'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Reef Island · Manama',
   flagship:['Ithmar Towers','Reef Island','Durrat Marina','Al Areen','Hajar Tower'],
   desc:'Government-linked housing finance and real estate developer in Bahrain.',tags:['Manama','Reef Island','Muharraq']},
  // Oman
  {id:'omran',name:'Oman Tourism Development',country:'Oman',flag:'🇴🇲',logo:'⛵',accent:'linear-gradient(90deg,#1b5e20,#4caf50)',founded:2005,projects:9,units:'12K+',value:'OMR 3B',tier:1,
   hero:'https://images.unsplash.com/photo-1578648681188-72a3b69e7a3f?w=900&q=80&auto=format&fit=crop',
   heroTitle:'Jebel Sifah · Muscat',
   flagship:['Jebel Sifah','Muscat Hills','The Wave Muscat','Ras Al Hadd','Yiti Resort'],
   desc:'OMRAN drives Oman\'s tourism & real estate Vision 2040 projects.',tags:['Muscat','Sur','Salalah']},
];

let currentGCCFilter = 'all';
let gccCalcTerm = 20;
let gccCalcPlan = 'mortgage';

function renderGCCDevelopers(filter='all'){
  let devs = filter==='all' ? gccDevelopers : gccDevelopers.filter(d=>d.country===filter);
  document.getElementById('gcc-count').textContent = devs.length+' developers';
  document.getElementById('gcc-dev-grid').innerHTML = devs.map(d=>`
    <div class="dev-card" style="--dev-accent:${d.accent}">
      <div class="dev-hero">
        <img src="${d.hero}" alt="${d.heroTitle||d.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--bg5)'">
        <span class="dev-hero-flag">${d.flag}</span>
        ${d.tier===1?'<span class="dev-hero-tag">⭐ Tier 1</span>':'<span class="dev-hero-tag">Tier 2</span>'}
        <div class="dev-hero-title">${d.heroTitle||d.name}</div>
      </div>
      <div class="dev-body">
        <div class="dev-head-row">
          <div class="dev-logo" style="background:var(--bg4)">${d.logo}</div>
          <div style="flex:1;min-width:0">
            <div class="dev-name">${d.name}</div>
            <div class="dev-country">${d.country} · Est. ${d.founded}</div>
          </div>
        </div>
        <div class="dev-desc">${d.desc}</div>
        <div class="dev-stats">
          <div class="dev-stat"><div class="dev-stat-val">${d.projects}</div><div class="dev-stat-lbl">Projects</div></div>
          <div class="dev-stat"><div class="dev-stat-val">${d.units}</div><div class="dev-stat-lbl">Units</div></div>
          <div class="dev-stat" style="flex:1.3"><div class="dev-stat-val" style="font-size:11px">${d.value}</div><div class="dev-stat-lbl">Portfolio</div></div>
        </div>
        <div class="dev-projects">
          <div style="font-size:9.5px;color:var(--text4);font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Flagship Projects</div>
          ${d.flagship.slice(0,3).map((p,i)=>`<span class="dev-project-tag ${i===0?'flagship':''}">${i===0?'⭐ ':''}${p}</span>`).join('')}
          ${d.flagship.length>3?`<span class="dev-project-tag">+${d.flagship.length-3} more</span>`:''}
        </div>
        <div style="margin-top:11px;display:flex;gap:5px;justify-content:flex-end">
          <button class="btn btn-sm" onclick="event.stopPropagation();loadDevInCalc('${d.id}')">💰 Calculate</button>
          <button class="btn btn-sm btn-wa">💬 Contact</button>
        </div>
      </div>
    </div>`).join('');
}

function filterGCC(filter,btn){
  currentGCCFilter = filter;
  document.querySelectorAll('.gcc-filter').forEach(b=>b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');
  renderGCCDevelopers(filter);
}

function loadDevInCalc(devId){
  showView('payment_calc', document.querySelector('[onclick*="payment_calc"]'));
  calcAll();
}

// ══════════════════════════════════════════════════
// PAYMENT CALCULATOR
// ══════════════════════════════════════════════════
function fmtAED(n){
  if(n>=1e6) return 'AED '+(n/1e6).toFixed(2)+'M';
  if(n>=1e3) return 'AED '+(n/1e3).toFixed(0)+'K';
  return 'AED '+n.toLocaleString();
}
function fmtNum(n){return n.toLocaleString('en-US',{maximumFractionDigits:0})}

function updateDP(){
  const v=document.getElementById('calc-dp').value;
  document.getElementById('dp-pct-label').textContent=v+'%';
  const price=parseFloat(document.getElementById('calc-price').value)||0;
  document.getElementById('dp-aed-label').textContent='AED '+(price*v/100).toLocaleString('en-US',{maximumFractionDigits:0});
}
function updateRate(){
  document.getElementById('rate-label').textContent=parseFloat(document.getElementById('calc-rate').value).toFixed(1)+'%';
}
function updateYield(){
  document.getElementById('yield-label').textContent=parseFloat(document.getElementById('calc-yield').value).toFixed(1)+'%';
}

function selectPlan(plan,btn){
  gccCalcPlan=plan;
  document.querySelectorAll('.plan-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide relevant inputs
  const showMortgage=['term-group','rate-group','dp-group'];
  if(plan==='mortgage'){showMortgage.forEach(id=>document.getElementById(id).style.display='block');}
  else if(plan==='cash'){['term-group','rate-group'].forEach(id=>document.getElementById(id).style.display='none');document.getElementById('dp-group').style.display='none';}
  else if(plan==='developer'){['rate-group'].forEach(id=>document.getElementById(id).style.display='none');['term-group','dp-group'].forEach(id=>document.getElementById(id).style.display='block');}
  else if(plan==='posthandover'){showMortgage.forEach(id=>document.getElementById(id).style.display='block');}
  calcAll();
}

function selectTerm(years,btn){
  gccCalcTerm=years;
  document.querySelectorAll('.term-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  calcAll();
}

function calcAll(){
  const price=parseFloat(document.getElementById('calc-price').value)||0;
  const dpPct=parseFloat(document.getElementById('calc-dp').value)||20;
  const rateAnnual=parseFloat(document.getElementById('calc-rate').value)||4.5;
  const rentalYield=parseFloat(document.getElementById('calc-yield').value)||6.5;
  const propType=document.getElementById('calc-type').value;

  if(!price){return;}
  updateDP();updateRate();updateYield();

  const dp=price*dpPct/100;
  const loanAmt=price-dp;
  const rateMonthly=rateAnnual/(100*12);
  const nPayments=gccCalcTerm*12;

  // Dubai fees
  const dldFee=price*0.04; // Dubai Land Dept
  const agencyFee=price*0.02;
  const trusteeAdminFee=4200;
  const mortgageReg=loanAmt*0.0025+290;
  const totalFees=dldFee+agencyFee+trusteeAdminFee+(gccCalcPlan==='mortgage'?mortgageReg:0);

  // Monthly EMI (mortgage)
  let monthlyEMI=0;
  if(gccCalcPlan==='mortgage'||gccCalcPlan==='posthandover'){
    if(rateMonthly>0){
      monthlyEMI=loanAmt*(rateMonthly*Math.pow(1+rateMonthly,nPayments))/(Math.pow(1+rateMonthly,nPayments)-1);
    }else{
      monthlyEMI=loanAmt/nPayments;
    }
  }
  const totalInterest=monthlyEMI*nPayments-loanAmt;
  const totalCost=gccCalcPlan==='cash'?price+totalFees:(dp+monthlyEMI*nPayments+totalFees);

  // ROI calculations
  const annualRent=price*(rentalYield/100);
  const monthlyRent=annualRent/12;
  const netYield=rentalYield-1.5; // Minus service charges ~1.5%
  const capitalAppreciation=price*0.08; // 8% Dubai avg appreciation
  const totalAnnualReturn=annualRent+capitalAppreciation;
  const roi=(totalAnnualReturn/price)*100;
  const breakEvenYears=price/annualRent;

  // Update metric cards
  document.getElementById('calc-monthly-val').textContent = gccCalcPlan==='cash'?'N/A':fmtAED(monthlyEMI);
  document.getElementById('calc-dp-val').textContent = fmtAED(dp);
  document.getElementById('calc-dp-pct').textContent = dpPct+'% of price';
  document.getElementById('calc-roi-val').textContent = roi.toFixed(1)+'%';
  document.getElementById('calc-total-val').textContent = fmtAED(totalCost);

  // Breakdown
  let breakdownHTML='';
  if(gccCalcPlan==='mortgage'){
    breakdownHTML=`
      <div class="calc-row"><span class="calc-label">Property Price</span><span class="calc-value">${fmtAED(price)}</span></div>
      <div class="calc-row"><span class="calc-label">Down Payment (${dpPct}%)</span><span class="calc-value" style="color:var(--accent)">${fmtAED(dp)}</span></div>
      <div class="calc-row"><span class="calc-label">Loan Amount</span><span class="calc-value">${fmtAED(loanAmt)}</span></div>
      <div class="calc-row"><span class="calc-label">Monthly EMI (${gccCalcTerm} yrs @ ${rateAnnual}%)</span><span class="calc-value" style="color:var(--green)">${fmtAED(monthlyEMI)}</span></div>
      <div class="calc-row"><span class="calc-label">Total Interest Paid</span><span class="calc-value" style="color:var(--hot)">${fmtAED(totalInterest)}</span></div>
      <div style="margin:10px 0;border-top:1px solid var(--border3)"></div>
      <div class="calc-row"><span class="calc-label">Dubai Land Dept Fee (4%)</span><span class="calc-value">${fmtAED(dldFee)}</span></div>
      <div class="calc-row"><span class="calc-label">Agency Commission (2%)</span><span class="calc-value">${fmtAED(agencyFee)}</span></div>
      <div class="calc-row"><span class="calc-label">Trustee + Admin</span><span class="calc-value">AED ${fmtNum(trusteeAdminFee)}</span></div>
      <div class="calc-row"><span class="calc-label">Mortgage Registration</span><span class="calc-value">${fmtAED(mortgageReg)}</span></div>
      <div class="calc-row" style="background:var(--accent-bg);border-radius:var(--r);padding:10px;margin-top:6px"><span class="calc-label" style="color:var(--text);font-weight:600">Total Acquisition Cost</span><span class="calc-value" style="color:var(--accent);font-size:15px">${fmtAED(totalCost)}</span></div>`;
  } else if(gccCalcPlan==='cash'){
    breakdownHTML=`
      <div class="calc-row"><span class="calc-label">Full Purchase Price</span><span class="calc-value" style="color:var(--accent)">${fmtAED(price)}</span></div>
      <div class="calc-row"><span class="calc-label">Dubai Land Dept Fee (4%)</span><span class="calc-value">${fmtAED(dldFee)}</span></div>
      <div class="calc-row"><span class="calc-label">Agency Commission (2%)</span><span class="calc-value">${fmtAED(agencyFee)}</span></div>
      <div class="calc-row"><span class="calc-label">Admin & Trustee</span><span class="calc-value">AED ${fmtNum(trusteeAdminFee)}</span></div>
      <div class="calc-row" style="background:var(--green-bg);border-radius:var(--r);padding:10px;margin-top:6px"><span class="calc-label" style="color:var(--text);font-weight:600">Total Cash Required</span><span class="calc-value" style="color:var(--green);font-size:15px">${fmtAED(totalCost)}</span></div>
      <div style="margin-top:10px;padding:9px 12px;background:var(--accent-bg);border-radius:var(--r);border-left:3px solid var(--accent)">
        <div style="font-size:11px;color:var(--accent);font-weight:600">💡 Cash Buyer Advantage</div>
        <div style="font-size:11px;color:var(--text2);margin-top:3px">Save ${fmtAED(totalInterest>0?totalInterest:price*0.45)} vs mortgage. Negotiate 5-8% discount from sellers.</div>
      </div>`;
  } else if(gccCalcPlan==='developer'){
    breakdownHTML=`
      <div class="calc-row"><span class="calc-label">Property Price</span><span class="calc-value">${fmtAED(price)}</span></div>
      <div class="calc-row"><span class="calc-label">Booking Fee (On Signing)</span><span class="calc-value" style="color:var(--accent)">${fmtAED(price*0.1)} <span style="font-size:10px;color:var(--text3)">(10%)</span></span></div>
      <div class="calc-row"><span class="calc-label">During Construction</span><span class="calc-value">${fmtAED(price*0.4)} <span style="font-size:10px;color:var(--text3)">(40%)</span></span></div>
      <div class="calc-row"><span class="calc-label">On Handover</span><span class="calc-value">${fmtAED(price*0.5)} <span style="font-size:10px;color:var(--text3)">(50%)</span></span></div>
      <div class="calc-row"><span class="calc-label">Monthly During Construction</span><span class="calc-value" style="color:var(--green)">${fmtAED(price*0.4/gccCalcTerm/12)}/mo</span></div>
      <div class="calc-row"><span class="calc-label">Dubai Land Dept Fee (4%)</span><span class="calc-value">${fmtAED(dldFee)}</span></div>
      <div class="calc-row" style="background:var(--purple-bg);border-radius:var(--r);padding:10px;margin-top:6px"><span class="calc-label" style="color:var(--text);font-weight:600">Total Investment</span><span class="calc-value" style="color:var(--purple);font-size:15px">${fmtAED(price+totalFees)}</span></div>`;
  } else if(gccCalcPlan==='posthandover'){
    breakdownHTML=`
      <div class="calc-row"><span class="calc-label">Property Price</span><span class="calc-value">${fmtAED(price)}</span></div>
      <div class="calc-row"><span class="calc-label">Pre-Handover (Down Payment ${dpPct}%)</span><span class="calc-value" style="color:var(--accent)">${fmtAED(dp)}</span></div>
      <div class="calc-row"><span class="calc-label">Post-Handover Balance</span><span class="calc-value">${fmtAED(loanAmt)}</span></div>
      <div class="calc-row"><span class="calc-label">Post-Handover Period</span><span class="calc-value">${gccCalcTerm} years</span></div>
      <div class="calc-row"><span class="calc-label">Monthly Post-Handover</span><span class="calc-value" style="color:var(--green)">${fmtAED(monthlyEMI)}/mo</span></div>
      <div class="calc-row"><span class="calc-label">Dubai Land Dept Fee</span><span class="calc-value">${fmtAED(dldFee)}</span></div>
      <div class="calc-row" style="background:var(--teal-bg);border-radius:var(--r);padding:10px;margin-top:6px"><span class="calc-label" style="color:var(--text);font-weight:600">Total Acquisition Cost</span><span class="calc-value" style="color:var(--teal);font-size:15px">${fmtAED(totalCost)}</span></div>`;
  }

  // ROI section appended
  breakdownHTML+=`
    <div style="margin-top:13px;padding:12px;background:var(--green-bg);border-radius:var(--r);border:1px solid var(--green)22">
      <div style="font-size:11px;font-weight:600;color:var(--green);margin-bottom:7px">📈 Investment Returns</div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Estimated Monthly Rent</span><span class="calc-value" style="color:var(--green)">${fmtAED(monthlyRent)}/mo</span></div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Annual Rental Income</span><span class="calc-value">${fmtAED(annualRent)}/yr</span></div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Gross Yield</span><span class="calc-value" style="color:var(--green)">${rentalYield.toFixed(1)}%</span></div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Net Yield (after service)</span><span class="calc-value">${netYield.toFixed(1)}%</span></div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Capital Appreciation (est. 8%)</span><span class="calc-value">${fmtAED(capitalAppreciation)}/yr</span></div>
      <div class="calc-row" style="border-bottom:none;padding:4px 0;font-weight:600"><span class="calc-label" style="color:var(--text)">Total ROI</span><span class="calc-value" style="color:var(--green);font-size:14px">${roi.toFixed(1)}% p.a.</span></div>
      <div class="calc-row" style="border-bottom:none;padding:3px 0"><span class="calc-label">Payback Period</span><span class="calc-value">${breakEvenYears.toFixed(1)} years</span></div>
    </div>`;

  document.getElementById('calc-breakdown').innerHTML=breakdownHTML;

  // Comparison table
  const plans=[
    {name:'Bank Mortgage',plan:'mortgage',icon:'🏦',dpAmt:dp,monthly:monthlyEMI,total:dp+monthlyEMI*nPayments+totalFees,roi:roi,best:false},
    {name:'Developer Plan',plan:'developer',icon:'🏗️',dpAmt:price*0.1,monthly:price*0.4/gccCalcTerm/12,total:price+totalFees,roi:roi+1.5,best:false},
    {name:'Full Cash',plan:'cash',icon:'💵',dpAmt:price,monthly:0,total:price+totalFees-mortgageReg,roi:roi+2,best:false},
    {name:'Post-Handover',plan:'posthandover',icon:'📋',dpAmt:dp,monthly:loanAmt/(gccCalcTerm*12),total:price+totalFees,roi:roi+0.5,best:false},
  ];
  const bestROI=plans.reduce((a,b)=>a.roi>b.roi?a:b);
  bestROI.best=true;
  document.getElementById('calc-comparison').innerHTML=`
    <table class="comp-table">
      <thead><tr><th>Plan</th><th>Down Payment</th><th>Monthly</th><th>Total Cost</th><th>Est. ROI</th><th>Best For</th></tr></thead>
      <tbody>${plans.map(p=>`
        <tr ${p.best?'class="best-plan"':''}>
          <td><strong>${p.icon} ${p.name}</strong>${p.best?` <span class="best-badge">✓ BEST ROI</span>`:''}</td>
          <td style="font-family:var(--font-mono)">${fmtAED(p.dpAmt)}</td>
          <td style="font-family:var(--font-mono)">${p.monthly?fmtAED(p.monthly):'-'}</td>
          <td style="font-family:var(--font-mono)">${fmtAED(p.total)}</td>
          <td style="font-family:var(--font-mono);color:var(--green)">${p.roi.toFixed(1)}%</td>
          <td style="font-size:11px;color:var(--text3)">${p.plan==='mortgage'?'Expats/Residents':p.plan==='developer'?'Off-Plan buyers':p.plan==='cash'?'Investors/HNWIs':'Staged payment'}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;

  // Trigger AI analysis
  getCalcAIAnalysis(price,dpPct,rateAnnual,rentalYield,monthlyEMI,roi,gccCalcPlan,gccCalcTerm,propType,totalCost,breakEvenYears);
}

async function getCalcAIAnalysis(price,dpPct,rate,yield_,emi,roi,plan,term,type,total,payback){
  const aiDiv=document.getElementById('calc-ai-response');
  const loadDiv=document.getElementById('calc-ai-loading');
  aiDiv.innerHTML='';loadDiv.style.display='block';
  const prompt=`Real estate investment analysis for a Dubai property:
- Price: AED ${price.toLocaleString()}
- Payment Plan: ${plan==='mortgage'?`Bank Mortgage (${dpPct}% down, ${rate}% p.a., ${term} years)`:plan==='cash'?'Full Cash Purchase':plan==='developer'?'Developer Payment Plan':'Post-Handover Plan'}
- Monthly EMI/Payment: AED ${emi>0?Math.round(emi).toLocaleString():'N/A (cash)'}
- Total Cost: AED ${Math.round(total).toLocaleString()}
- Rental Yield: ${yield_}%
- Expected ROI: ${roi.toFixed(1)}% p.a.
- Payback Period: ${payback.toFixed(1)} years
- Property Type: ${type}

Give a concise 3-4 sentence analysis covering: (1) is this a good buy given current Dubai market? (2) which payment plan is best for this price point? (3) key risk factors. Be direct and data-driven. Use AED currency. Max 80 words.`;

  try{
    const resp=await fetch('/api/claude',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:1000,
        system:'You are a Dubai real estate investment advisor. Be concise, direct, and data-driven. Use AED currency. Give actionable advice.',
        messages:[{role:'user',content:prompt}]})
    });
    const data=await resp.json();
    const reply=data.content?.[0]?.text||'Analysis unavailable.';
    loadDiv.style.display='none';
    aiDiv.innerHTML=`<div style="color:var(--text2);line-height:1.7">${esc(reply)}</div>`;
  }catch(e){
    loadDiv.style.display='none';
    aiDiv.innerHTML=`<div style="color:var(--text3)">⚠️ AI analysis unavailable. Check connection.</div>`;
  }
}


function tempBadge(t){return`<span class="temp ${t}"><span class="temp-dot"></span>${t}</span>`}
// Avatar helper — renders <img> if photo URL is present, falls back to initials gradient on error
function avatarHTML(person, opts={}){
  const cls = opts.class || 'agent-avatar';
  const size = opts.size || 30;
  const fs = opts.fs || (size<28?9.5:11);
  // Letters/digits only: initials are also placed inside an inline onerror JS string below.
  const initials = String(person.initials || (person.name?person.name.split(' ').map(n=>n[0]||'').slice(0,2).join(''):'?')).replace(/[^\p{L}\p{N}]/gu,'')||'?';
  const extraStyle = opts.style || '';
  const bg = opts.bg || '';
  if(person.photo){
    return `<div class="${cls} has-photo" style="width:${size}px;height:${size}px;font-size:${fs}px;${extraStyle}"><img src="${esc(person.photo)}" alt="${esc(person.name||'')}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.remove('has-photo');this.parentElement.style.background='${bg||'linear-gradient(135deg,var(--accent),var(--accent2))'}';this.parentElement.innerHTML='${initials}'"></div>`;
  }
  return `<div class="${cls}" style="width:${size}px;height:${size}px;font-size:${fs}px;${bg?'background:'+bg+';':''}${extraStyle}">${initials}</div>`;
}
function scoreRingHTML(s,r=15){
  const c=2*Math.PI*r,f=c*(s/100);
  const col=s>=80?'var(--hot)':s>=60?'var(--warm)':'var(--cold)';
  return`<div class="score-ring" style="width:${r*2+4}px;height:${r*2+4}px">
    <svg width="${r*2+4}" height="${r*2+4}" viewBox="0 0 ${r*2+4} ${r*2+4}">
      <circle cx="${r+2}" cy="${r+2}" r="${r}" stroke="var(--bg4)" stroke-width="2" fill="none"/>
      <circle cx="${r+2}" cy="${r+2}" r="${r}" stroke="${col}" stroke-width="2" fill="none" stroke-dasharray="${f} ${c-f}" stroke-linecap="round"/>
    </svg>
    <span class="score-val" style="color:${col}">${s}</span>
  </div>`;
}

// ══════════════════════════════════════════════════
// RENDERS
// ══════════════════════════════════════════════════
function renderHotLeads(){
  const hot=leads.filter(l=>l.temp==='hot');
  document.getElementById('hot-leads-table').innerHTML=hot.map(l=>`
    <tr class="row-hot pulse-hot" onclick="openLead(${l.id})">
      <td><div style="display:flex;align-items:center;gap:9px">${avatarHTML(l,{size:28,fs:10})}<div><span class="lead-name">${esc(l.name)}</span><div style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${esc(l.source)}</div></div></div></td>
      <td>${scoreRingHTML(l.score)}</td>
      <td><span class="intent-tag ${esc(l.intent)}">${esc(l.intent)}</span></td>
      <td><span style="font-size:10px;font-family:var(--font-mono);color:var(--text3)">2m ago</span></td>
      <td><button class="btn btn-sm btn-wa" onclick="event.stopPropagation();showView('whatsapp',null)">💬</button></td>
    </tr>`).join('');
  document.getElementById('hot-count').textContent=hot.length+' total';
}
function renderAllLeads(filter='all'){
  let list=leads;
  if(filter==='hot')list=leads.filter(l=>l.temp==='hot');
  else if(filter==='warm')list=leads.filter(l=>l.temp==='warm');
  else if(filter==='cold')list=leads.filter(l=>l.temp==='cold');
  else if(filter==='buyer')list=leads.filter(l=>l.intent==='buyer');
  else if(filter==='seller')list=leads.filter(l=>l.intent==='seller');
  document.getElementById('leads-count').textContent=list.length+' leads';
  document.getElementById('all-leads-table').innerHTML=list.map(l=>`
    <tr class="${l.temp==='hot'?'row-hot':''}" onclick="openLead(${l.id})">
      <td><div style="display:flex;align-items:center;gap:9px">${avatarHTML(l,{size:26,fs:9.5})}<span class="lead-name">${esc(l.name)}</span></div></td>
      <td><span style="font-size:10.5px;font-family:var(--font-mono);color:var(--text3)">${esc(l.source)}</span></td>
      <td>${scoreRingHTML(l.score,13)}</td>
      <td><span class="intent-tag ${esc(l.intent)}">${esc(l.intent)}</span> <span class="intent-tag ${esc(l.urgency)}" style="margin-left:3px">${esc(l.urgency)}</span></td>
      <td>${tempBadge(l.temp)}</td>
      <td style="font-family:var(--font-mono);font-size:12px">${esc(l.budget)}</td>
      <td>${esc(l.agent)}</td>
      <td><span style="font-size:10px;font-family:var(--font-mono);color:var(--text3)">2h ago</span></td>
      <td><button class="btn btn-sm btn-wa" onclick="event.stopPropagation()">💬</button></td>
    </tr>`).join('');
}
function renderActivity(){
  const el=document.getElementById('activity-feed');
  el.innerHTML=activityEvents.map(e=>`
    <div class="activity-item">
      <div class="activity-icon" style="background:${e.color}">${e.icon}</div>
      <div><div class="activity-text">${e.text}</div><div class="activity-time">just now</div></div>
    </div>`).join('');
}
function renderDashNBA(){
  document.getElementById('dash-nba').innerHTML=nbaData.slice(0,3).map(n=>`
    <div style="display:flex;align-items:center;gap:9px;padding:9px 11px;background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);margin-bottom:7px">
      <div class="nba-priority ${n.p}" style="width:24px;height:24px;font-size:10px">${n.p==='p1'?'!':'•'}</div>
      <div style="flex:1"><div style="font-size:12.5px;font-weight:500;color:var(--text)">${n.lead}</div><div style="font-size:11px;color:var(--text3)">${n.action} · ${n.channel}</div></div>
      <button class="btn btn-sm btn-primary">${n.btn}</button>
    </div>`).join('');
}
function renderDailyChart(){
  const vals=[8,12,7,15,19,11,14,22,9,17,21,13,18,24];
  const max=Math.max(...vals);
  document.getElementById('daily-chart').innerHTML=vals.map((v,i)=>`
    <div class="bar-c" style="height:${Math.round(v/max*100)}%;background:${i===13?'var(--accent)':'var(--bg4)'}">
      <span class="tooltip-box">${v} leads</span>
    </div>`).join('');
}
function renderAgentToday(){
  document.getElementById('agent-today').innerHTML=agents.slice(0,3).map(a=>`
    <div style="display:flex;align-items:center;gap:9px;padding:10px 15px;border-bottom:1px solid var(--border)">
      ${avatarHTML(a,{size:26,fs:10})}
      <div style="flex:1"><div style="font-size:12px;font-weight:500;color:var(--text)">${a.name}</div><div style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${a.hot} hot · ${a.booked} booked</div></div>
      <span class="status-dot ${a.status}"></span>
      <span style="font-family:var(--font-mono);font-size:12px;color:${a.conv>25?'var(--green)':'var(--text2)'}">${a.conv}%</span>
    </div>`).join('');
}
function renderPipeStats(){
  const stats=[{l:'New',v:'48',s:'today'},{l:'Qualified',v:'31',s:'64.5%'},{l:'Meeting',v:'19',s:'61.2%'},{l:'Offer',v:'8',s:'42%'},{l:'Closed',v:'7',s:'88%'},{l:'Revenue',v:'AED 26.6M',s:'this month'}];
  document.getElementById('pipe-stats').innerHTML=stats.map(s=>`
    <div class="pipe-stage"><div class="pipe-label">${s.l}</div><div class="pipe-value">${s.v}</div><div class="pipe-sub">${s.s}</div></div>`).join('');
}
function renderChannelMix(){
  const ch=[{n:'WhatsApp',p:34,c:'var(--wa-dark)'},{n:'Bayut',p:27,c:'var(--hot)'},{n:'Prop. Finder',p:22,c:'var(--cold)'},{n:'Facebook',p:13,c:'#4267B2'},{n:'Referral',p:4,c:'var(--accent)'}];
  document.getElementById('channel-mix').innerHTML=ch.map(c=>`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <div style="font-size:12px;color:var(--text2);width:86px">${c.n}</div>
      <div style="flex:1;height:4px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="width:${c.p}%;height:4px;background:${c.c};border-radius:2px"></div></div>
      <div style="font-size:11px;font-family:var(--font-mono);color:var(--text3);width:26px;text-align:right">${c.p}%</div>
    </div>`).join('');
}
function renderWeights(){
  const el=document.getElementById('weight-settings');if(!el)return;
  el.innerHTML=weights.map((w,i)=>`
    <div class="weight-row">
      <span class="weight-label">${w.label}</span>
      <input type="range" min="0" max="40" value="${w.pts}" class="weight-slider"
        oninput="updateWeight(${i}, this.value)"
        style="flex:1;accent-color:${w.color};cursor:pointer">
      <span class="weight-pts" id="wpts-${i}" style="color:${w.color}">+${w.pts}</span>
    </div>`).join('') +
    `<div style="margin-top:10px;padding-top:11px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:11px;color:var(--text3);font-family:var(--font-mono)">Live model — drag to retrain</span>
      <button class="btn btn-sm" onclick="resetWeights()" style="font-size:10.5px">↺ Reset defaults</button>
    </div>`;
}
const _defaultWeights = weights.map(w=>w.pts);
function updateWeight(i,val){
  weights[i].pts = parseInt(val);
  document.getElementById('wpts-'+i).textContent = '+'+val;
  renderScoreQueue(); // live recompute every lead's score
}
function resetWeights(){
  weights.forEach((w,i)=>w.pts=_defaultWeights[i]);
  renderWeights(); renderScoreQueue();
}
function renderScoreQueue(){
  const el=document.getElementById('score-queue');if(!el)return;
  // Compute live scores from the engine for real leads
  const scored = leads.map(l=>{ const r=AIEngine.scoreLead(l); return {...l, computed:r}; })
                      .sort((a,b)=>b.computed.score-a.computed.score);
  el.innerHTML=scored.map(l=>{
    const r=l.computed;
    const fill = r.temp==='hot'?'var(--hot)':r.temp==='warm'?'var(--warm)':'var(--cold)';
    const top2 = r.contrib.slice(0,2).map(c=>`${c.label} +${c.pts}`).join(' · ');
    return `
    <div class="score-item" onclick="explainScore(${l.id})" style="cursor:pointer">
      ${avatarHTML(l,{size:30,fs:10})}
      <div style="flex:1;min-width:0">
        <div style="font-size:12.5px;font-weight:500;color:var(--text)">${esc(l.name)}</div>
        <div style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${esc(l.source)} · ${top2}</div>
      </div>
      <div style="text-align:right;margin-right:6px">
        <div style="font-size:15px;font-family:var(--font-mono);font-weight:700;color:${fill}">${r.score}</div>
        <div class="si-score-bar"><div class="si-score-fill" style="width:${r.score}%;background:${fill}"></div></div>
      </div>
      <span class="temp ${r.temp}" style="font-size:9px"><span class="temp-dot"></span>${r.temp}</span>
    </div>`;
  }).join('') + `<div style="font-size:10px;color:var(--text3);text-align:center;padding:8px;font-family:var(--font-mono)">↑ Tap any lead to see the score breakdown</div>`;
}

// Explainable AI — show exactly why a lead scored what it did
function explainScore(leadId){
  const lead = leads.find(l=>l.id===leadId); if(!lead) return;
  const r = AIEngine.scoreLead(lead);
  const fill = r.temp==='hot'?'var(--hot)':r.temp==='warm'?'var(--warm)':'var(--cold)';
  const body = document.getElementById('modal-lead-body');
  const titleEl = document.getElementById('modal-lead-name');
  if(titleEl) titleEl.innerHTML = `⚡ Why ${esc(lead.name)} scored <span style="color:${fill}">${r.score}</span>`;
  body.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      ${avatarHTML(lead,{size:46,fs:15})}
      <div style="flex:1">
        <div style="font-size:15px;font-weight:600;color:var(--text)">${esc(lead.name)}</div>
        <div style="font-size:11.5px;color:var(--text3);font-family:var(--font-mono)">${esc(lead.source)} · ${esc(lead.budget)} · ${r.bt.tier} · ${esc(lead.area)}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:30px;font-family:var(--font-display);color:${fill};line-height:1">${r.score}</div>
        <div style="font-size:9px;font-family:var(--font-mono);color:${fill};text-transform:uppercase">${r.temp}</div>
      </div>
    </div>
    <div style="font-size:10px;font-family:var(--font-mono);color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">Feature Contributions (XGBoost v2.4)</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${r.contrib.map(c=>`
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:12px;color:var(--text2);width:110px;flex-shrink:0">${c.label}</span>
          <div style="flex:1;height:6px;background:var(--bg4);border-radius:3px;overflow:hidden">
            <div style="width:${c.raw}%;height:6px;background:${c.color};border-radius:3px"></div>
          </div>
          <span style="font-size:12px;font-family:var(--font-mono);font-weight:700;color:${c.color};width:42px;text-align:right">+${c.pts}</span>
        </div>`).join('')}
    </div>
    <div style="margin-top:14px;padding:11px 13px;background:var(--purple-bg);border:1px solid var(--purple)22;border-radius:var(--r);font-size:11.5px;color:var(--text2);line-height:1.6">
      <strong style="color:var(--purple)">AI Verdict:</strong> ${r.contrib[0].label} (+${r.contrib[0].pts}) and ${r.contrib[1].label} (+${r.contrib[1].pts}) are the strongest drivers. ${r.score>=78?'Prioritise immediate human contact — high close probability.':r.score>=55?'Nurture via WhatsApp; recheck score in 24h.':'Route to automated re-engagement cascade.'}
    </div>`;
  document.getElementById('lead-detail-modal').classList.add('open');
}
function renderIntentGrid(){
  const el=document.getElementById('intent-grid');if(!el)return;
  el.innerHTML=intentLeads.map(l=>{
    const intent = AIEngine.extractIntent(l.msgs); // real NLP extraction
    const pColor = intent.primary==='Buyer'?'var(--green)':intent.primary==='Seller'?'var(--cold)':'var(--text3)';
    const uColor = intent.urgency==='High'?'var(--hot)':intent.urgency==='Medium'?'var(--warm)':'var(--text3)';
    return `
    <div class="intent-card">
      <div class="ic-head">
        ${avatarHTML(l,{class:'ic-avatar',size:30,fs:11})}
        <div style="flex:1"><div class="ic-name">${esc(l.name)}</div><div class="ic-phone">${esc(l.phone)}</div></div>
        <div style="text-align:right">
          <div style="font-size:9px;font-family:var(--font-mono);color:var(--purple)">CONFIDENCE</div>
          <div style="font-size:15px;font-family:var(--font-mono);font-weight:700;color:var(--purple)">${intent.confidence}%</div>
        </div>
      </div>
      <div class="msg-thread">${l.msgs.map(m=>`<div style="display:flex;flex-direction:column;align-items:${m.dir==='out'?'flex-end':'flex-start'}"><div class="msg-bubble ${m.dir==='in'?'in':'out'}">${m.text}</div></div>`).join('')}</div>
      <div style="padding:11px 15px;border-top:1px solid var(--border);background:var(--bg3)">
        <div style="display:flex;gap:7px;margin-bottom:9px">
          <span style="font-size:10px;font-family:var(--font-mono);padding:3px 9px;border-radius:4px;background:${pColor}18;color:${pColor};border:1px solid ${pColor}33">${intent.primary==='Buyer'?'🟢':intent.primary==='Seller'?'🔵':'⚪'} ${intent.primary.toUpperCase()}</span>
          <span style="font-size:10px;font-family:var(--font-mono);padding:3px 9px;border-radius:4px;background:${uColor}18;color:${uColor};border:1px solid ${uColor}33">⏱ ${intent.urgency.toUpperCase()} URGENCY</span>
          ${intent.budgetMention?`<span style="font-size:10px;font-family:var(--font-mono);padding:3px 9px;border-radius:4px;background:var(--accent-bg);color:var(--accent);border:1px solid var(--accent)33">💰 ${intent.budgetMention}</span>`:''}
        </div>
        <div style="font-size:9.5px;font-family:var(--font-mono);color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">NLP Signals Detected</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${intent.signals.map(s=>`
            <div style="display:flex;align-items:center;gap:7px;font-size:11px">
              <span style="color:${s.color};font-weight:600;min-width:80px">${s.label}</span>
              <span style="color:var(--text3);font-style:italic">"…${s.evidence}…"</span>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}
function renderNBA(){
  const el=document.getElementById('nba-list');if(!el)return;
  const ranked = AIEngine.rankActions(leads); // real ranking
  const maxP = Math.max(...ranked.map(r=>r.priorityScore),0.001);
  el.innerHTML=ranked.map((n,i)=>{
    const rank = i+1;
    const tColor = n.temp==='hot'?'var(--hot)':n.temp==='warm'?'var(--warm)':'var(--cold)';
    const pri = i===0?'p1':i<2?'p1':i<4?'p2':'p3';
    return `
    <div class="nba-item">
      <div class="nba-priority ${pri}" style="position:relative">
        <span style="font-size:10px;font-family:var(--font-mono)">#${rank}</span>
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="nba-lead-name">${n.lead}</span>
          <span class="temp ${n.temp}" style="font-size:8.5px"><span class="temp-dot"></span>${n.score}</span>
        </div>
        <div class="nba-action">${n.action} · ${n.channel}</div>
        <div class="nba-reason">${n.why}</div>
        <div style="display:flex;gap:14px;margin-top:6px;font-size:10px;font-family:var(--font-mono)">
          <span style="color:var(--text3)">💰 Commission: <strong style="color:var(--green)">AED ${(n.commission*1000).toFixed(0)}K</strong></span>
          <span style="color:var(--text3)">📈 Close: <strong style="color:${tColor}">${n.closeProb}%</strong></span>
          <span style="color:var(--text3)">⚡ AI conf: <strong style="color:var(--purple)">${n.confidence}%</strong></span>
        </div>
        <div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:6px;overflow:hidden"><div style="width:${Math.round(n.priorityScore/maxP*100)}%;height:3px;background:linear-gradient(90deg,${tColor},var(--accent));border-radius:2px"></div></div>
      </div>
      <div class="nba-btns">
        <button class="btn btn-sm btn-primary">${n.channel.includes('Call')?'Call':n.channel.includes('WhatsApp')?'Send':n.channel.includes('SMS')?'Text':'Go'}</button>
        <button class="btn btn-sm" style="padding:4px 8px" title="Snooze">⏱</button>
      </div>
    </div>`;
  }).join('');
}
function renderWAContacts(){
  document.getElementById('wa-contacts').innerHTML=waContacts.map(c=>`
    <div class="wa-contact${c.active?' active':''}">
      ${avatarHTML(c,{class:'wa-c-avatar',size:32,fs:12,bg:c.c,style:'color:var(--wa-dark)'})}
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between"><span class="wa-c-name">${c.name}</span><span class="wa-c-time">${c.time}</span></div>
        <div class="wa-c-preview">${c.preview}</div>
      </div>
      ${c.unread>0?`<span class="wa-c-badge">${c.unread}</span>`:''}
    </div>`).join('');
}
function renderWAMsgs(){
  document.getElementById('wa-msgs').innerHTML=waMsgs.map(m=>{
    if(m.prop){
      const p=m.prop;
      return `<div class="wa-bubble out" style="background:transparent;border:none;padding:0;max-width:240px">
        <div class="wa-prop-card">
          <img src="${p.img}" alt="${p.title}" onerror="this.outerHTML='<div style=\\'height:118px;background:linear-gradient(135deg,var(--bg4),var(--bg5));display:flex;align-items:center;justify-content:center;font-size:28px\\'>🏡</div>'">
          <div class="wa-prop-body">
            <div class="wa-prop-title">${p.title}</div>
            <div class="wa-prop-meta">${p.meta}</div>
            <div class="wa-prop-price">${p.price}</div>
          </div>
        </div>
        <div class="msg-time" style="text-align:right">${m.time}</div>
      </div>`;
    }
    return `<div class="wa-bubble ${m.dir==='in'?'in':'out'}">${m.text}<div class="msg-time" style="text-align:${m.dir==='out'?'right':'left'}">${m.time}</div></div>`;
  }).join('');
  const msgs=document.getElementById('wa-msgs');
  msgs.scrollTop=msgs.scrollHeight;
}
function renderFunnel(){
  const el=document.getElementById('conv-funnel');if(!el)return;
  const steps=[
    {label:'New Leads',n:247,color:'var(--cold)',w:100},
    {label:'Qualified',n:158,color:'var(--warm)',w:64},
    {label:'Meeting Set',n:94,color:'var(--purple)',w:38},
    {label:'Offer Made',n:38,color:'var(--accent)',w:15},
    {label:'Closed Won',n:29,color:'var(--green)',w:12},
  ];
  el.innerHTML=steps.map((s,i)=>`
    <div style="display:flex;align-items:center;width:100%;gap:7px">
      <div class="funnel-bar" style="width:${s.w}%;background:${s.color};min-width:80px">
        <span class="funnel-label">${s.label}</span>
        <span class="funnel-num">${s.n}</span>
      </div>
      <span class="funnel-pct" style="color:${s.color}">${i>0?Math.round(steps[i].n/steps[i-1].n*100)+'%':''}</span>
    </div>
    ${i<steps.length-1?`<div class="funnel-arrow">↓ ${Math.round((1-steps[i+1].n/steps[i].n)*100)}% drop</div>`:''}`).join('');
}
function renderChannelROI(){
  const el=document.getElementById('channel-roi');if(!el)return;
  const maxL=Math.max(...channelROI.map(c=>c.leads));
  el.innerHTML=channelROI.map(c=>`
    <div class="channel-row">
      <div class="channel-icon" style="background:${c.color}18">${c.icon}</div>
      <div class="channel-name">${c.name}</div>
      <div class="channel-bar-wrap">
        <div class="channel-bar-track"><div class="channel-bar-fill" style="width:${Math.round(c.leads/maxL*100)}%;background:${c.color}"></div></div>
        <div class="channel-stats"><span class="channel-stat">Leads: <span>${c.leads}</span></span><span class="channel-stat">CPL: <span>AED ${c.cpl}</span></span><span class="channel-stat">Rev: <span>AED ${(c.revenue/1000).toFixed(0)}K</span></span></div>
      </div>
      <div class="channel-roi" style="color:${c.color}">${c.roi}%</div>
    </div>`).join('');
}
function renderAgentTable(){
  document.getElementById('agent-table').innerHTML=agents.map((a,i)=>`
    <tr>
      <td style="font-family:var(--font-mono);color:var(--text3)">${i+1}</td>
      <td><div style="display:flex;align-items:center;gap:8px">${avatarHTML(a,{size:24,fs:9.5})}<span class="lead-name">${a.name}</span></div></td>
      <td><span class="status-dot ${a.status}"></span> <span style="font-size:10.5px;color:var(--text3);font-family:var(--font-mono)">${a.status}</span></td>
      <td style="font-family:var(--font-mono);color:var(--hot)">${a.hot}</td>
      <td style="font-family:var(--font-mono);color:var(--green)">${a.booked}</td>
      <td style="font-family:var(--font-mono);font-weight:600;color:${a.conv>25?'var(--green)':'var(--text)'}">${a.conv}%</td>
      <td><span class="response-time" style="background:${a.resp==='3m'||a.resp==='4m'||a.resp==='5m'?'var(--green-bg)':'var(--hot-bg)'};color:${a.resp==='3m'||a.resp==='4m'||a.resp==='5m'?'var(--green)':'var(--hot)'}">${a.resp}</span></td>
      <td><div style="display:flex;align-items:center;gap:5px"><div style="width:46px;height:3px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="width:${a.score}%;height:3px;background:${a.score>80?'var(--green)':a.score>60?'var(--warm)':'var(--cold)'};border-radius:2px"></div></div><span style="font-family:var(--font-mono);font-size:11px;color:var(--text2)">${a.score}</span></div></td>
      <td><span style="font-size:10.5px;font-family:var(--font-mono);color:${a.sla==='OK'?'var(--green)':a.sla==='WARN'?'var(--warm)':'var(--hot)'}">${a.sla}</span></td>
    </tr>`).join('');
}
function renderSLA(){
  const el=document.getElementById('sla-list');if(!el)return;
  el.innerHTML=slaItems.map(s=>`
    <div class="sla-item">
      <div style="width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:2px;background:${s.status==='ok'?'var(--green)':s.status==='warn'?'var(--warm)':'var(--hot)'}${s.status==='breach'?';box-shadow:0 0 6px var(--hot)':''}"></div>
      <div style="flex:1"><div class="sla-lead-name">${s.name}</div><div class="sla-lead-meta">${s.meta}</div></div>
      <div class="sla-bar-wrap"><div class="sla-bar-track"><div class="sla-bar-fill" style="width:${s.pct}%;background:${s.status==='ok'?'var(--green)':s.status==='warn'?'var(--warm)':'var(--hot)'}"></div></div></div>
      <div class="sla-timer ${s.status}" id="sla-t-${slaItems.indexOf(s)}">${s.timer}</div>
      <button class="btn btn-sm ${s.status==='breach'?'btn-hot':'btn-primary'}">${s.action}</button>
    </div>`).join('');
}
function renderCompliance(){
  const el=document.getElementById('compliance-grid');if(!el)return;
  el.innerHTML=complianceItems.map(c=>`
    <div class="compliance-card">
      <div class="compliance-icon">${c.icon}</div>
      <div class="compliance-title">${c.title}</div>
      <div class="compliance-desc">${c.desc}</div>
      ${c.checks.map(ch=>`<div class="compliance-status"><div class="ccheck ${ch.ok?'ok':'warn'}">${ch.ok?'✓':'!'}</div><span style="font-size:11.5px;color:var(--text2)">${ch.label}</span></div>`).join('')}
    </div>`).join('');
}
function renderAuditLog(){
  const el=document.getElementById('audit-log');if(!el)return;
  el.innerHTML=auditLog.map(a=>`
    <tr>
      <td style="font-family:var(--font-mono);font-size:11px;color:var(--text3)">${a.time}</td>
      <td style="font-size:12.5px;color:var(--text2)">${a.event}</td>
      <td style="font-size:12px;color:var(--text)">${a.user}</td>
      <td style="font-family:var(--font-mono);font-size:11px;color:var(--text3)">${a.ip}</td>
      <td><span style="font-size:10.5px;font-family:var(--font-mono);color:${a.status==='ok'?'var(--green)':'var(--warm)'}">${a.status.toUpperCase()}</span></td>
    </tr>`).join('');
}
let currentSeqFilter = 'all';
function filterSeqs(f, btn){
  currentSeqFilter = f;
  document.querySelectorAll('.seq-tab').forEach(b=>b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');
  renderSMSSequences();
}
function renderSMSSequences(){
  const el=document.getElementById('sms-sequences');if(!el)return;
  const typeIcon={whatsapp:'💬',sms:'📱',email:'📧',ai_call:'🤖'};
  const typeColor={whatsapp:'var(--wa-dark)',sms:'var(--cold)',email:'var(--teal)',ai_call:'var(--purple)'};
  let seqs = currentSeqFilter==='all' ? smsSequences : smsSequences.filter(s=>s.channel===currentSeqFilter);
  const count = document.getElementById('seq-count'); if(count) count.textContent=seqs.length+' sequences';
  el.innerHTML=seqs.map((seq,i)=>`
    <div class="seq-card" style="border-left:3px solid ${typeColor[seq.channel]}44">
      <div style="padding:13px 15px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="toggleSeq(${i})">
        <span style="font-size:16px">${typeIcon[seq.channel]}</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:var(--text)">${seq.name}</div>
          <div style="font-size:10.5px;color:var(--text3);font-family:var(--font-mono)">${seq.steps.length} step${seq.steps.length>1?'s':''} · Trigger: ${seq.trigger}</div>
        </div>
        <div style="display:flex;gap:10px;align-items:center;font-size:11px;font-family:var(--font-mono)">
          <span style="color:var(--text3)">Enrolled: <strong style="color:var(--text)">${seq.enrolled}</strong></span>
          <span style="color:var(--text3)">Open: <strong style="color:${seq.openRate>80?'var(--green)':seq.openRate>60?'var(--warm)':'var(--hot)'}">${seq.openRate}%</strong></span>
        </div>
        <span style="background:${seq.active?'var(--green-bg)':'var(--bg4)'};color:${seq.active?'var(--green)':'var(--text3)'};font-size:10px;padding:2px 8px;border-radius:4px;font-family:var(--font-mono)">${seq.active?'ACTIVE':'PAUSED'}</span>
        <span id="seq-toggle-${i}" style="color:var(--text3);transition:transform .2s">+</span>
      </div>
      <div id="seq-body-${i}" style="display:none;border-top:1px solid var(--border);padding:13px 15px">
        <div style="display:flex;flex-direction:column;gap:8px">
          ${seq.steps.map((s,j)=>`
            <div style="display:flex;gap:10px;align-items:flex-start">
              <div style="width:22px;height:22px;border-radius:50%;background:${typeColor[seq.channel]}22;border:1px solid ${typeColor[seq.channel]}44;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:var(--font-mono);color:${typeColor[seq.channel]};flex-shrink:0;margin-top:2px">${j+1}</div>
              <div style="flex:1;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r);padding:9px 12px">
                <div style="font-size:10px;font-family:var(--font-mono);color:${typeColor[seq.channel]};margin-bottom:4px">${typeIcon[seq.channel]} ${s.type.toUpperCase()} · ${s.delay}</div>
                <div style="font-size:12px;color:var(--text2);line-height:1.55;white-space:pre-wrap">${s.msg}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:6px;margin-top:11px">
          <button class="btn btn-sm btn-primary">✏️ Edit</button>
          <button class="btn btn-sm" onclick="this.closest('.seq-card').querySelector('[id^=seq-body]').style.display='none'">Close</button>
        </div>
      </div>
    </div>`).join('');

  renderSeqLiveQueue();
  renderSeqPerfChart();
}

function toggleSeq(i){
  const b=document.getElementById('seq-body-'+i);
  const t=document.getElementById('seq-toggle-'+i);
  if(b.style.display==='none'){b.style.display='block';t.textContent='−';}
  else{b.style.display='none';t.textContent='+';}
}

function renderSeqLiveQueue(){
  const el=document.getElementById('seq-live-queue');if(!el)return;
  const queue=[
    {name:'Sara Al Blooshi',seq:'New Lead SMS',channel:'sms',status:'sending',time:'now'},
    {name:'Khalid Bin Zayed',seq:'Bayut Hot Lead',channel:'whatsapp',status:'queued',time:'in 2m'},
    {name:'Maha Al Rashid',seq:'Cold Reactivation',channel:'sms',status:'queued',time:'in 8m'},
    {name:'Yousef Mansouri',seq:'AI Call Follow-up',channel:'ai_call',status:'dialing',time:'now'},
    {name:'Reem Al Farsi',seq:'Post-Viewing WA',channel:'whatsapp',status:'queued',time:'in 14m'},
  ];
  const typeIcon={whatsapp:'💬',sms:'📱',email:'📧',ai_call:'🤖'};
  const statusColor={sending:'var(--green)',queued:'var(--text3)',dialing:'var(--hot)'};
  el.innerHTML=queue.map(q=>`
    <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border)">
      <span>${typeIcon[q.channel]}</span>
      <div style="flex:1"><div style="font-size:12px;color:var(--text)">${q.name}</div><div style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${q.seq}</div></div>
      <span style="font-size:10px;font-family:var(--font-mono);color:${statusColor[q.status]}">${q.status==='dialing'?'📞 ':q.status==='sending'?'✓ ':''}${q.time}</span>
    </div>`).join('');
}

function renderSeqPerfChart(){
  const el=document.getElementById('seq-perf-chart');if(!el)return;
  const days=['Mo','Tu','We','Th','Fr','Sa','Su'];
  const vals=[210,285,198,342,410,188,214];
  const max=Math.max(...vals);
  el.innerHTML=`
    <div style="display:flex;align-items:flex-end;gap:5px;height:70px;padding:0 2px">
      ${vals.map((v,i)=>`
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
          <div style="width:100%;background:var(--purple);border-radius:3px 3px 0 0;height:${Math.round(v/max*52)}px;opacity:${i===6?1:.65}"></div>
          <span style="font-size:9px;color:var(--text3);font-family:var(--font-mono)">${days[i]}</span>
        </div>`).join('')}
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:7px;font-size:10px;color:var(--text3);font-family:var(--font-mono)">
      <span>Messages sent</span><span style="color:var(--purple)">${vals.reduce((a,b)=>a+b,0).toLocaleString()} total</span>
    </div>`;
}

// Dashboard automation summary
function renderDashAutoSummary(){
  const el=document.getElementById('dash-auto-summary');if(!el)return;
  const items=[
    {icon:'💬',label:'WhatsApp auto-replies sent',val:'847',color:'var(--wa-dark)'},
    {icon:'📱',label:'SMS sequences triggered',val:'312',color:'var(--cold)'},
    {icon:'🤖',label:'AI calls made',val:'38',color:'var(--purple)'},
    {icon:'📘',label:'Facebook DMs auto-responded',val:'214',color:'#4267B2'},
    {icon:'📸',label:'Instagram DMs auto-responded',val:'189',color:'var(--hot)'},
    {icon:'🔥',label:'Leads upgraded by AI scoring',val:'47',color:'var(--hot)'},
    {icon:'✅',label:'Leads closed (automated flow)',val:'6',color:'var(--green)'},
  ];
  el.innerHTML=items.map(item=>`
    <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:15px;width:20px;text-align:center">${item.icon}</span>
      <span style="flex:1;font-size:12px;color:var(--text2)">${item.label}</span>
      <span style="font-size:14px;font-weight:700;font-family:var(--font-mono);color:${item.color}">${item.val}</span>
    </div>`).join('');
}

function renderDashSocialSnapshot(){
  const el=document.getElementById('dash-social-snapshot');if(!el)return;
  const items=[
    {platform:'📘 Facebook',leads:2853,responded:2853,conv:'11.2%',color:'#4267B2'},
    {platform:'📸 Instagram',leads:1889,responded:1889,conv:'8.7%',color:'var(--hot)'},
  ];
  el.innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:13px">
      ${items.map(item=>`
        <div style="background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r);padding:12px;border-top:2px solid ${item.color}">
          <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:7px">${item.platform}</div>
          <div style="font-size:22px;font-family:var(--font-display);color:${item.color}">${item.leads.toLocaleString()}</div>
          <div style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">Leads · Conv ${item.conv}</div>
        </div>`).join('')}
    </div>
    <div style="background:var(--green-bg);border:1px solid var(--green)22;border-radius:var(--r);padding:11px 13px;font-size:12px;color:var(--text2);line-height:1.6">
      🤖 <strong style="color:var(--text)">4,742 leads</strong> responded to automatically. Zero manual effort. System running <strong style="color:var(--green)">24/7</strong> — your customer does not even touch the system once.
    </div>`;
}

// Kanban with deal values
const STAGES=['New','Qualified','Meeting Set','Offer Stage','Closed Won'];
function stageOf(status){
  const t=String(status||'').toLowerCase();
  if(/clos|won/.test(t))return 'Closed Won';
  if(/offer/.test(t))return 'Offer Stage';
  if(/meet|view/.test(t))return 'Meeting Set';
  if(/qualif/.test(t))return 'Qualified';
  return 'New';
}
// "AED 2.8M", "900K", "2,500,000" -> number (0 if unparseable)
function parseAED(b){
  const m=String(b||'').replace(/,/g,'').match(/(\d+(?:\.\d+)?)\s*([mk])?/i);
  if(!m)return 0;
  return parseFloat(m[1])*({m:1e6,k:1e3}[(m[2]||'').toLowerCase()]||1);
}
function renderKanban(){
  const kanbanEl=document.getElementById('kanban-board');if(!kanbanEl)return;
  const stageProb={New:10,Qualified:30,'Meeting Set':60,'Offer Stage':85,'Closed Won':100};
  const stageColor={New:'var(--cold)',Qualified:'var(--warm)','Meeting Set':'var(--purple)','Offer Stage':'var(--accent)','Closed Won':'var(--green)'};
  kanbanEl.innerHTML=STAGES.map(stage=>{
    const cards=leads.filter(l=>stageOf(l.status)===stage);
    const color=stageColor[stage],prob=stageProb[stage];
    const totalVal=cards.reduce((sum,c)=>sum+parseAED(c.budget),0);
    return`<div class="kanban-col">
      <div class="kanban-col-head">
        <span style="color:${color};font-weight:700">${stage}</span>
        <div style="display:flex;align-items:center;gap:5px">
          <span class="kanban-count">${cards.length}</span>
          <span style="font-size:9px;font-family:var(--font-mono);color:${color}">${prob}%</span>
        </div>
      </div>
      <div style="font-size:10px;font-family:var(--font-mono);color:var(--text3);padding:0 12px 8px">${fmtAED(totalVal)} in stage</div>
      ${cards.map(c=>`
        <div class="kanban-card" onclick="openLead(${c.id})" style="border-left:2px solid ${color}44">
          <div class="kanban-card-name">${esc(c.name)}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
            <span class="temp ${esc(c.temp)}" style="font-size:9px"><span class="temp-dot"></span>${esc(c.temp)}</span>
            <span style="font-size:11px;font-family:var(--font-mono);color:var(--accent);font-weight:600">${esc(c.budget)}</span>
          </div>
          <div style="font-size:10px;color:var(--text3);font-family:var(--font-mono);margin-top:3px">${esc(c.type)} · Score ${esc(c.score)}</div>
        </div>`).join('')}
    </div>`;
  }).join('');
}
// Everything on the dashboard that can be derived from real leads.
function renderLiveStats(){
  const n=leads.length,hot=leads.filter(l=>l.temp==='hot').length,warm=leads.filter(l=>l.temp==='warm').length,cold=n-hot-warm;
  const meet=leads.filter(l=>stageOf(l.status)==='Meeting Set').length;
  const pipe=leads.filter(l=>stageOf(l.status)!=='Closed Won').reduce((a,l)=>a+parseAED(l.budget),0);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  const counts={all:n,hot,warm,cold};
  for(const lang in T)for(const k in counts)if(T[lang]['filter_'+k])T[lang]['filter_'+k]=T[lang]['filter_'+k].replace(/\(\d+\)/,`(${counts[k]})`);
  document.querySelectorAll('[data-i18n^="filter_"]').forEach(e=>{const t=T[currentLang][e.dataset.i18n];if(t)e.textContent=t});
  set('m-total',n);set('m-hot',hot);set('m-meet',meet);
  set('m-total-d',`${warm} warm · ${cold} cold`);set('m-hot-d',n?Math.round(hot/n*100)+'% of all leads':'No leads yet');
  set('m-meet-d',n?Math.round(meet/n*100)+'% of leads at Meeting Set':'');
  set('chip-total',`${n} lead${n===1?'':'s'} tracked`);set('chip-hot',`${hot} hot 🔥`);set('chip-pipe',`${fmtAED(pipe)} open pipeline`);
  set('hero-sub',n?`You have ${hot} hot lead${hot===1?'':'s'} and ${meet} at Meeting Set.`:'No leads yet. Add one or import a CSV from the Leads page.');
  const me=window.__me||{};
  set('org-name',me.agency||'Your agency');set('user-name',me.email||'');set('user-role',me.role||'');
  set('hero-loc','📍 '+(me.agency||''));
  const hl=document.getElementById('hot-count');if(hl)hl.textContent=hot+' total';
}
function renderNotifs(){
  document.getElementById('notif-list').innerHTML=notifs.map(n=>`
    <div class="notif${n.unread?' notif-unread':''}">
      <div class="notif-dot" style="background:${n.color}"></div>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════
const viewTitles={
  dashboard:'nav_dashboard',pipeline:'nav_pipeline',leads:'nav_leads',
  scoring:'nav_scoring',intent:'nav_intent',nba:'nav_nba',
  whatsapp:'nav_wa',sms:'nav_sms',funnel:'nav_funnel',roi:'nav_roi',
  agents:'nav_agents',sla:'nav_sla',compliance:'nav_compliance',notifications:'nav_notif',
  social_auto:'nav_social_auto'
};
function showView(id,el){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const view=document.getElementById('view-'+id);
  if(view)view.classList.add('active');
  if(el)el.classList.add('active');
  const titleKey=viewTitles[id];
  if(titleKey){
    const t=T[currentLang];
    document.getElementById('page-title').textContent=t[titleKey]||id;
  }
  // lazy renders
  if(id==='team'){renderTeam();renderIntegrations();}
  if(id==='scoring'){renderWeights();renderScoreQueue();}
  if(id==='intent')renderIntentGrid();
  if(id==='nba')renderNBA();
  if(id==='call_assist')renderCallAssist();
  if(id==='whatsapp'){renderWAContacts();renderWAMsgs();}
  if(id==='funnel')renderFunnel();
  if(id==='roi')renderChannelROI();
  if(id==='agents')renderAgentTable();
  if(id==='sla')renderSLA();
  if(id==='compliance'){renderCompliance();renderAuditLog();}
  if(id==='sms'){renderSMSSequences();renderOrchestration();renderFollowUpTemplates();}
  if(id==='social_auto'){renderSocialWorkflows();renderSocialConvFeed();renderAICallQueue();renderSocialPipeline();renderFbStats();renderIgStats();}
  if(!viewTitles[id]) document.getElementById('page-title').textContent = id==='social_auto'?'FB & Instagram Automation':id==='call_assist'?'Live Call Assistant':id==='team'?'Team':id;

  // Animate metric bars on view change
  setTimeout(()=>{
    const view=document.getElementById('view-'+id);
    if(view){
      view.querySelectorAll('.metric-bar-fill').forEach(bar=>{
        const w=bar.style.width;
        bar.style.width='0';
        setTimeout(()=>{ bar.style.width=w; }, 80);
      });
      view.querySelectorAll('.metric-value').forEach(el=>{
        el.style.animation='none';
        setTimeout(()=>{ el.style.animation='countUp .4s cubic-bezier(.22,1,.36,1) both'; }, 10);
      });
    }
  }, 50);
}
function filterLeads(f,tab){
  document.querySelectorAll('.btn-sm').forEach(b=>{b.style.borderColor='';b.style.color='';});
  tab.style.borderColor='var(--accent)';tab.style.color='var(--accent)';
  renderAllLeads(f);
}
// ══════════════════════════════════════════════════
// MODALS
// ══════════════════════════════════════════════════
let editingLeadId=null;
function openAddLead(){
  editingLeadId=null;
  ['al-name','al-phone','al-budget','al-area'].forEach(id=>document.getElementById(id).value='');
  document.querySelectorAll('#add-lead-modal .modal-body .btn').forEach(b=>{b.style.borderColor='';b.style.color='';b.style.background=''});
  document.getElementById('al-status').value='New';document.getElementById('al-save').textContent='⚡ Add & Score';
  document.getElementById('add-lead-modal').classList.add('open');
}
function editLead(id){
  const l=leads.find(x=>x.id===id);if(!l)return;
  closeModal('lead-detail-modal');openAddLead();editingLeadId=id;
  document.getElementById('al-name').value=l.name;document.getElementById('al-phone').value=l.phone;
  document.getElementById('al-budget').value=l.budget;document.getElementById('al-area').value=l.area;document.getElementById('al-status').value=stageOf(l.status);
  document.querySelectorAll('#add-lead-modal .modal-body .btn').forEach(b=>{if(b.textContent.trim()===l.source)selectType(b)});
  document.getElementById('al-save').textContent='Save changes';
}
function refreshLeadViews(){
  renderHotLeads();renderAllLeads();renderLiveStats();
  if(typeof renderKanban==='function')renderKanban();
  const a=document.querySelector('#view-scoring.active');if(a)renderScoreQueue();
}
async function saveLead(){
  const src=[...document.querySelectorAll('#add-lead-modal .modal-body .btn')].find(b=>b.style.color)?.textContent.trim()||'';
  const data={name:document.getElementById('al-name').value,phone:document.getElementById('al-phone').value,
    budget:document.getElementById('al-budget').value,area:document.getElementById('al-area').value,source:src,status:document.getElementById('al-status').value};
  if(!data.name.trim()){toastMsg('Name is required');return}
  try{
    if(editingLeadId){const r=await api('PATCH','/api/leads/'+editingLeadId,data);leads.splice(leads.findIndex(x=>x.id===editingLeadId),1,r)}
    else leads.push(await api('POST','/api/leads',data));
    closeModal('add-lead-modal');refreshLeadViews();toastMsg(editingLeadId?'Lead updated':'Lead added');
  }catch(e){toastMsg(e.message)}
}
async function deleteLead(id){
  if(!confirm('Delete this lead permanently?'))return;
  try{await api('DELETE','/api/leads/'+id);leads.splice(leads.findIndex(x=>x.id===id),1);closeModal('lead-detail-modal');refreshLeadViews();toastMsg('Lead deleted')}
  catch(e){toastMsg(e.message)}
}
async function importLeadsCSV(input){
  const f=input.files[0];input.value='';if(!f)return;
  try{
    const r=await api('POST','/api/leads/import',{csv:await f.text()});
    leads.splice(0,leads.length,...await api('GET','/api/leads'));refreshLeadViews();
    toastMsg(`Imported ${r.imported}`+(r.duplicates?`, ${r.duplicates} already existed (merged)`:'')+(r.skipped?`, skipped ${r.skipped} (row ${r.errors[0].row}: ${r.errors[0].error})`:''));
  }catch(e){toastMsg(e.message)}
}
function toastMsg(t){
  const el=document.createElement('div');el.setAttribute('role','status');el.className='toast-msg';el.textContent=t;
  el.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--bg4);color:var(--text);border:1px solid var(--border2);padding:9px 16px;border-radius:8px;font-size:12.5px;z-index:400';
  document.body.appendChild(el);setTimeout(()=>el.remove(),3200);
}
function closeModal(id){document.getElementById(id).classList.remove('open')}
document.querySelectorAll('.modal-overlay').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')})});
function selectType(btn){
  btn.closest('.modal-body').querySelectorAll('.btn:not(.btn-primary)').forEach(b=>{b.style.borderColor='';b.style.color='';b.style.background=''});
  btn.style.borderColor='var(--accent)';btn.style.color='var(--accent)';btn.style.background='var(--accent-bg)';
}
function openLead(id){
  const l=leads.find(x=>x.id===id);if(!l)return;
  const listing=listingFor(l);
  document.getElementById('modal-lead-name').textContent=l.name;
  document.getElementById('modal-lead-body').innerHTML=`
    <div class="prop-hero">
      <img src="${listing.img}" alt="${listing.title}" onerror="this.parentElement.style.background='linear-gradient(135deg,var(--bg4),var(--bg5))';this.remove()">
      <div class="prop-hero-tag">🏡 ${l.type==='Seller'?'Listing for valuation':'Matched listing'}</div>
      <div class="prop-hero-cap">
        <div class="prop-hero-title">${listing.title}</div>
        <div class="prop-hero-price">${listing.price}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:13px;margin-bottom:16px">
      ${avatarHTML(l,{size:40,fs:13})}
      <div><div style="font-size:15px;font-weight:500">${esc(l.name)}</div><div style="font-size:11px;color:var(--text3);font-family:var(--font-mono)">${esc(l.phone)} · Ref ${listing.ref}</div></div>
      <div style="margin-left:auto">${scoreRingHTML(l.score,18)}</div>
      <div>${tempBadge(l.temp)}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      ${[['Type',l.type],['Intent',l.intent+' · '+l.urgency],['Timeframe',l.timeframe],['Budget',l.budget],['Financing',l.financing],['Source',l.source],['Agent',l.agent],['Area',l.area],...(l.notes?[['Notes',l.notes]]:[])].map(([k,v])=>`
        <div style="background:var(--bg3);border-radius:var(--r);padding:8px 10px"><div style="font-size:9.5px;color:var(--text3);font-family:var(--font-mono);margin-bottom:2px;text-transform:uppercase">${k}</div><div style="font-size:12.5px;color:var(--text);font-weight:500">${esc(v)}</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:6px">
      <button class="btn btn-wa" style="flex:1;justify-content:center">💬 WhatsApp</button>
      <button class="btn btn-primary" style="flex:1;justify-content:center">📅 Book Viewing</button>
      <button class="btn" style="flex:1;justify-content:center" onclick="editLead(${l.id})">✎ Edit</button>
      ${(window.__me||{}).role==='admin'?`<button class="btn" style="flex:1;justify-content:center;color:var(--hot)" onclick="deleteLead(${l.id})">🗑 Delete</button>`:''}
    </div>`;
  document.getElementById('lead-detail-modal').classList.add('open');
}

// ══════════════════════════════════════════════════
// WHATSAPP
// ══════════════════════════════════════════════════
function sendWaMessage(){
  const inp=document.getElementById('wa-input');
  if(!inp.value.trim())return;
  waMsgs.push({dir:'out',text:inp.value,time:'now'});
  inp.value='';renderWAMsgs();
}
function sendWaSuggestion(){
  const sug=document.getElementById('wa-suggestion').textContent.replace(/"/g,'').trim();
  waMsgs.push({dir:'out',text:sug,time:'now'});
  renderWAMsgs();
}
document.getElementById('wa-input').addEventListener('keypress',e=>{if(e.key==='Enter')sendWaMessage()});

// ══════════════════════════════════════════════════
// AI COPILOT — Powered by Anthropic API
// ══════════════════════════════════════════════════
function toggleCopilot(){document.getElementById('copilot-panel').classList.toggle('open')}

const COPILOT_SYSTEM = `You are Observer AI Copilot — a sharp, data-driven real estate CRM assistant for a Dubai property agency.

IMPORTANT: everything below is illustrative SAMPLE data from a concept prototype, not live or real. Say so when you cite it, never present it as real results, and do not give investment, tax or legal advice.

Sample data snapshot:
- 247 total leads: 34 hot, 89 warm, 124 cold (sample)
- Lead scoring: rule-based sample weights (not a trained model; no accuracy figure exists)
- Top priority leads: Ahmed Al Khalidi (score 87, cash buyer, 6-week timeline), Nour Al Mansouri (score 91, offer pending), Fatima Al Zaabi (score 81, viewing tomorrow)
- 2 active SLA breaches. Avg response time: 6m 12s (target: <5 min)
- Best channel in the sample data: WhatsApp (no verified open-rate or ROI figures)
- Revenue pipeline: AED 4.2M
- 8 active agents, top converter: Sarah Ahmed (32% conv. rate)
- GCC Developer coverage: 42 developers across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman
- Top developers: Emaar (UAE), NEOM/ROSHN (KSA), Barwa (Qatar), DAMAC (UAE), Aldar (UAE)
- Payment plan calculator: Bank Mortgage, Developer Plan, Full Cash, Post-Handover (with full ROI analysis)
- Dubai avg rental yield: 6-8%. Dubai Land Dept fee: 4%. Typical mortgage rates: 3.5-5.5% p.a.

You are concise, direct, and action-oriented. Always recommend specific next steps tied to data. Use GCC real estate context (Bayut, Property Finder, AED currency, Dubai/UAE market). Keep responses under 120 words. You can reference specific lead names and scores. You know about all GCC developers and can recommend projects. The user may be speaking to you hands-free via voice, so keep replies tight and natural to hear aloud. Suggest navigation actions when relevant by saying things like "[Go to WhatsApp]", "[Check SLA Tracker]", "[GCC Developers]", "[Payment Calculator]", or "[View Pipeline]".`;

let copilotHistory = [];

async function sendCopilot() {
  const inp = document.getElementById('cop-input');
  const msgs = document.getElementById('copilot-msgs');
  const text = inp.value.trim();
  if (!text) return;

  // Add user message
  msgs.innerHTML += `<div class="cop-msg user">${esc(text)}</div>`;
  copilotHistory.push({ role: 'user', content: text });
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  msgs.innerHTML += `<div class="cop-msg thinking" id="${typingId}"><div class="cop-typing"><span></span><span></span><span></span></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-5-5',
        max_tokens: 1000,
        system: COPILOT_SYSTEM,
        messages: copilotHistory
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Something went wrong. Please try again.';

    // Remove typing indicator
    document.getElementById(typingId)?.remove();

    // Parse and add action links
    const formatted = esc(reply)
      .replace(/\[Go to WhatsApp\]/gi, `<span class="cop-action" onclick="showView('whatsapp',null);toggleCopilot()">→ WhatsApp</span>`)
      .replace(/\[Check SLA Tracker\]/gi, `<span class="cop-action" onclick="showView('sla',null);toggleCopilot()">→ SLA Tracker</span>`)
      .replace(/\[View Pipeline\]/gi, `<span class="cop-action" onclick="showView('pipeline',null);toggleCopilot()">→ Pipeline</span>`)
      .replace(/\[View Leads\]/gi, `<span class="cop-action" onclick="showView('leads',null);toggleCopilot()">→ All Leads</span>`)
      .replace(/\[Channel ROI\]/gi, `<span class="cop-action" onclick="showView('roi',null);toggleCopilot()">→ Channel ROI</span>`)
      .replace(/\[Scoring\]/gi, `<span class="cop-action" onclick="showView('scoring',null);toggleCopilot()">→ AI Scoring</span>`)
      .replace(/\[GCC Developers\]/gi, `<span class="cop-action" onclick="showView('gcc_developers',null);toggleCopilot()">→ GCC Developers</span>`)
      .replace(/\[Payment Calculator\]/gi, `<span class="cop-action" onclick="showView('payment_calc',null);toggleCopilot()">→ Payment Plans</span>`);

    msgs.innerHTML += `<div class="cop-msg ai">${formatted}</div>`;
    copilotHistory.push({ role: 'assistant', content: reply });
    if(window.voiceOut) speak(stripForSpeech(reply));

  } catch (err) {
    document.getElementById(typingId)?.remove();
    msgs.innerHTML += `<div class="cop-msg ai">⚠️ Unable to connect to AI. Check your connection and try again.</div>`;
  }

  msgs.scrollTop = msgs.scrollHeight;
}

// ══════════════════════════════════════════════════
// VOICE COPILOT — "Hey Observer" · hands-free CRM
// Web Speech API (recognition + synthesis). No backend.
// ══════════════════════════════════════════════════
window.voiceOut = false;
let recog = null, listening = false, wakeRecog = null, wakeActive = false;
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

// Voice navigation map — instant local routing, no API round-trip needed
const VOICE_ROUTES = [
  {kw:['dashboard','home','overview'], view:'dashboard', label:'Dashboard'},
  {kw:['pipeline','deals'], view:'pipeline', label:'Pipeline'},
  {kw:['all leads','leads list','show leads','my leads'], view:'leads', label:'All Leads'},
  {kw:['scoring','lead score','score'], view:'scoring', label:'Lead Scoring'},
  {kw:['intent'], view:'intent', label:'Intent Detection'},
  {kw:['next best','best action','nba'], view:'nba', label:'Next Best Action'},
  {kw:['whatsapp','whats app','message'], view:'whatsapp', label:'WhatsApp'},
  {kw:['sms','sequence','follow up','follow-up','followup'], view:'sms', label:'SMS / Sequences'},
  {kw:['facebook','instagram','social'], view:'social_auto', label:'Social Automation'},
  {kw:['funnel','conversion'], view:'funnel', label:'Conversion Funnel'},
  {kw:['roi','channel','return'], view:'roi', label:'Channel ROI'},
  {kw:['agent','team','performance'], view:'agents', label:'Agent Performance'},
  {kw:['developer','project','emaar','damac','aldar','neom','roshn'], view:'gcc_developers', label:'GCC Developers'},
  {kw:['payment','calculator','mortgage','installment','calc'], view:'payment_calc', label:'Payment Plans'},
  {kw:['sla','response time'], view:'sla', label:'SLA Tracking'},
  {kw:['compliance','rera','audit'], view:'compliance', label:'Compliance'},
  {kw:['notification','alert'], view:'notifications', label:'Notifications'},
];

function tryVoiceCommand(text){
  const t = text.toLowerCase().trim();
  // "add lead" / "new lead"
  if(/\b(add|new|create)\b.*\blead\b/.test(t)){ openAddLead(); speakIfOut('Opening the new lead form.'); return true; }
  // navigation: "go to / open / show me / take me to <X>"
  if(/\b(go to|open|show( me)?|take me to|navigate to|switch to|pull up)\b/.test(t)){
    for(const r of VOICE_ROUTES){
      if(r.kw.some(k=>t.includes(k))){
        showView(r.view,null);
        // sync sidebar highlight
        document.querySelectorAll('.nav-item').forEach(n=>{ if(n.getAttribute('onclick')?.includes(`'${r.view}'`)) n.classList.add('active'); else n.classList.remove('active'); });
        speakIfOut('Opening ' + r.label + '.');
        flashCopilot('→ ' + r.label);
        return true;
      }
    }
  }
  return false; // not a command — fall through to Claude
}

function flashCopilot(msg){
  const m = document.getElementById('copilot-msgs');
  if(!m) return;
  m.innerHTML += `<div class="cop-msg ai" style="font-family:var(--font-mono);font-size:11px;color:var(--purple)">🎤 ${esc(msg)}</div>`;
  m.scrollTop = m.scrollHeight;
}

function handleVoiceResult(text){
  document.getElementById('cop-input').value = text;
  // Echo what was heard
  const m = document.getElementById('copilot-msgs');
  m.innerHTML += `<div class="cop-msg user">${esc(text)}</div>`;
  m.scrollTop = m.scrollHeight;
  // Local command first; if not a nav command, send to Claude
  if(!tryVoiceCommand(text)){
    document.getElementById('cop-input').value = text;
    // push to history & call API (reuse sendCopilot, but message already echoed)
    sendCopilotSpoken(text);
  } else {
    document.getElementById('cop-input').value = '';
  }
}

async function sendCopilotSpoken(text){
  const msgs = document.getElementById('copilot-msgs');
  copilotHistory.push({ role:'user', content:text });
  document.getElementById('cop-input').value='';
  const typingId='typing-'+Date.now();
  msgs.innerHTML += `<div class="cop-msg thinking" id="${typingId}"><div class="cop-typing"><span></span><span></span><span></span></div></div>`;
  msgs.scrollTop=msgs.scrollHeight;
  try{
    const response=await fetch('/api/claude',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:1000,system:COPILOT_SYSTEM,messages:copilotHistory})
    });
    const data=await response.json();
    const reply=data.content?.[0]?.text||'Something went wrong.';
    document.getElementById(typingId)?.remove();
    msgs.innerHTML += `<div class="cop-msg ai">${esc(reply).replace(/\n/g,'<br>')}</div>`;
    copilotHistory.push({role:'assistant',content:reply});
    if(window.voiceOut) speak(stripForSpeech(reply));
  }catch(e){
    document.getElementById(typingId)?.remove();
    msgs.innerHTML += `<div class="cop-msg ai">⚠️ Unable to connect to AI.</div>`;
  }
  msgs.scrollTop=msgs.scrollHeight;
}

function toggleVoiceInput(){
  if(!SpeechRec){ alert('Voice input needs Chrome, Edge, or Safari. Your browser does not support the Web Speech API.'); return; }
  if(listening){ recog?.stop(); return; }
  recog = new SpeechRec();
  recog.lang = (currentLang==='ar') ? 'ar-SA' : 'en-US';
  recog.interimResults = true;
  recog.continuous = false;
  const mic = document.getElementById('cop-mic');
  const bar = document.getElementById('cop-listening-bar');
  const barText = document.getElementById('cop-listening-text');
  recog.onstart = ()=>{ listening=true; mic.classList.add('listening'); bar.classList.add('show'); barText.textContent = currentLang==='ar'?'أستمع…':'Listening…'; };
  recog.onresult = (e)=>{
    let txt=''; for(let i=0;i<e.results.length;i++) txt+=e.results[i][0].transcript;
    barText.textContent = txt || (currentLang==='ar'?'أستمع…':'Listening…');
    if(e.results[e.results.length-1].isFinal){ recog.stop(); handleVoiceResult(txt.trim()); }
  };
  recog.onerror = (e)=>{ barText.textContent = 'Error: '+e.error; };
  recog.onend = ()=>{ listening=false; mic.classList.remove('listening'); setTimeout(()=>bar.classList.remove('show'),300); };
  recog.start();
}

function toggleVoiceOut(){
  window.voiceOut = document.getElementById('cop-voice-out').checked;
  if(window.voiceOut) speak(currentLang==='ar'?'تم تفعيل الصوت':'Voice replies on.');
}

function speak(text){
  if(!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = (currentLang==='ar') ? 'ar-SA' : 'en-US';
  u.rate = 1.04; u.pitch = 1.0;
  speechSynthesis.speak(u);
}
function speakIfOut(t){ if(window.voiceOut) speak(t); }

// Strip markdown / nav tokens / html before TTS
function stripForSpeech(s){
  return s.replace(/\[(Go to|Check|View|Channel|GCC|Payment)[^\]]*\]/gi,'')
          .replace(/[*_#`>]/g,'').replace(/<[^>]+>/g,'')
          .replace(/\s+/g,' ').trim();
}

// ── "Hey Observer" wake word ──
function toggleWakeWord(){
  if(!SpeechRec){ alert('Wake word needs a browser with Web Speech API support (Chrome/Edge).'); return; }
  const fab = document.getElementById('copilot-fab');
  const wb = document.getElementById('wakeBtn');
  if(wakeActive){ wakeActive=false; wakeRecog?.stop(); fab.classList.remove('wake-on'); wb?.classList.remove('active'); fab.title='AI Copilot'; return; }
  wakeActive=true; fab.classList.add('wake-on'); wb?.classList.add('active'); fab.title='Wake word ON · say "Hey Observer"';
  wakeRecog = new SpeechRec();
  wakeRecog.lang='en-US'; wakeRecog.continuous=true; wakeRecog.interimResults=true;
  wakeRecog.onresult=(e)=>{
    const last=e.results[e.results.length-1][0].transcript.toLowerCase();
    if(last.includes('hey observer')||last.includes('hi observer')||last.includes('hey absorber')){
      wakeRecog.stop();
      if(!document.getElementById('copilot-panel').classList.contains('open')) toggleCopilot();
      speakIfOut('Yes?');
      setTimeout(toggleVoiceInput,400);
    }
  };
  wakeRecog.onend=()=>{ if(wakeActive){ try{wakeRecog.start();}catch(e){} } }; // auto-restart
  try{ wakeRecog.start(); }catch(e){}
}

document.getElementById('cop-input').addEventListener('keypress', e => { if (e.key === 'Enter') sendCopilot() });

// ══════════════════════════════════════════════════
// LIVE SIMULATION
// ══════════════════════════════════════════════════
let liveIdx=0;
const liveAdd=[
  {icon:'🔥',color:'var(--hot-bg)',text:'<strong>New hot lead</strong> entered — Score 84, Cash buyer, Palm Jumeirah'},
  {icon:'💬',color:'var(--wa-bg)',text:'<strong>Omar Al Farouq</strong> replied on WhatsApp — "When can I visit?"'},
  {icon:'⚡',color:'var(--purple-bg)',text:'<strong>AI model</strong> re-scored 14 leads — 4 upgraded to hot status'},
  {icon:'📞',color:'var(--green-bg)',text:'<strong>Khalid Mansouri</strong> booked a call with Rania Hassan for 4pm today'},
];
setInterval(()=>{
  if(document.getElementById('view-dashboard').classList.contains('active')){
    const feed=document.getElementById('activity-feed');
    if(feed){
      const ev=liveAdd[liveIdx%liveAdd.length];
      const div=document.createElement('div');
      div.className='activity-item new';
      div.innerHTML=`<div class="activity-icon" style="background:${ev.color}">${ev.icon}</div><div><div class="activity-text">${ev.text}</div><div class="activity-time">just now</div></div>`;
      feed.prepend(div);liveIdx++;
      if(liveIdx%3===0){const mh=document.getElementById('m-hot');if(mh)mh.textContent=parseInt(mh.textContent)+1;}
    }
  }
},9000);

// SLA live timers
setInterval(()=>{
  slaItems.forEach((s,i)=>{
    const el=document.getElementById('sla-t-'+i);
    if(!el)return;
    const parts=el.textContent.split(':').map(Number);
    let[h,m,sec]=parts;sec++;if(sec>=60){sec=0;m++;}if(m>=60){m=0;h++;}
    el.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  });
},1000);

// ══════════════════════════════════════════════════
// FACEBOOK & INSTAGRAM AUTOMATION
// ══════════════════════════════════════════════════

const socialWorkflows = [
  { id:1, platform:'facebook', name:'Facebook Page DM Auto-Responder', trigger:'New DM received', steps:['Instant greeting sent','AI qualifies intent','Collect name + budget','Book viewing or transfer to agent'], status:'active', leads:1843, conv:'12.4%' },
  { id:2, platform:'instagram', name:'Instagram Reel Lead Flow', trigger:'Comment or DM on Reel', steps:['Comment detected','Auto-DM with property link','Chatbot collects info','Lead pushed to pipeline'], status:'active', leads:1290, conv:'9.8%' },
  { id:3, platform:'facebook', name:'Secondhand Furniture Inquiry Flow', trigger:'Keyword: "secondhand furniture"', steps:['Auto-reply: "Yes we buy!"','Ask for photos & location','Offer calculation sent','Schedule pickup'], status:'active', leads:612, conv:'18.2%' },
  { id:4, platform:'both', name:'Unclosed Lead AI Call-Back', trigger:'Lead stalled > 48h', steps:['AI detects no conversion','Auto-dial lead via AI','AI pitches & qualifies','Books call or flags hot'], status:'active', leads:997, conv:'21.7%' },
];

const socialConversations = [
  { platform:'facebook', name:'Hamid Al Nouri', msg:'Hey, do you buy secondhand furniture?', reply:'Hi Hamid! Yes, we do 😊 Can you share some photos and your location?', time:'2m ago', stage:'Qualified', score:74 },
  { platform:'instagram', name:'Layla Mansouri', msg:'Hi', reply:'Hello Layla! Welcome 🌟 Are you looking to buy, sell, or rent a property today?', time:'5m ago', stage:'New', score:55 },
  { platform:'facebook', name:'Tariq Al Faisal', msg:'What areas do you cover?', reply:'We cover all of Dubai, Abu Dhabi and Sharjah. Would you like to chat or see our latest listings?', time:'9m ago', stage:'Engaged', score:68 },
  { platform:'instagram', name:'Nadia Hassan', msg:'Interested in Palm Jumeirah villa', reply:'Excellent choice Nadia! We have 4 exclusive villas available right now. Shall I send you the shortlist?', time:'12m ago', stage:'Hot', score:83 },
  { platform:'facebook', name:'Omar Al Qasim', msg:"What's the price range?", reply:"Our properties start from AED 800K. What's your budget range, Omar? I'll match you to the best options 🏡", time:'18m ago', stage:'Qualified', score:71 },
  { platform:'instagram', name:'Sara Jaber', msg:'Location?', reply:'We operate across the UAE! Tap below to see our locations or speak with an agent 📍', time:'25m ago', stage:'New', score:49 },
];

const aiCallQueue = [
  { name:'Khalid Bin Saeed', platform:'Facebook', reason:'No reply after 48h', status:'Calling now', score:76, duration:'2m 14s' },
  { name:'Mariam Al Zaabi', platform:'Instagram', reason:'Stalled at viewing stage', status:'Scheduled 4:30pm', score:81, duration:'—' },
  { name:'Fares Al Otaibi', platform:'Facebook', reason:'Cold lead reactivation', status:'Queued', score:59, duration:'—' },
  { name:'Hessa Al Rashid', platform:'Instagram', reason:'Post-viewing follow-up', status:'Queued', score:70, duration:'—' },
];

const socialPipelineStages = [
  { label:'New DM', color:'var(--cold)', leads:['Layla M.','Sara J.','Adel K.','Reem A.'] },
  { label:'Chatbot Active', color:'var(--purple)', leads:['Hamid N.','Omar Q.','Zayed B.'] },
  { label:'Info Collected', color:'var(--warm)', leads:['Tariq F.','Maha R.','Bilal S.','Yousef A.'] },
  { label:'Agent Assigned', color:'var(--accent)', leads:['Nadia H.','Mariam Z.'] },
  { label:'Closed 🎉', color:'var(--green)', leads:['Ahmed K.','Fatima L.'] },
];

function renderSocialWorkflows(){
  const el = document.getElementById('workflow-list');
  if(!el) return;
  const platformIcon = p => p==='facebook'?'📘':p==='instagram'?'📸':'📱';
  const platformColor = p => p==='facebook'?'var(--cold)':p==='instagram'?'var(--hot)':'var(--purple)';
  el.innerHTML = socialWorkflows.map(w=>`
    <div style="border:1px solid var(--border2);border-radius:var(--r);padding:12px 14px;margin-bottom:9px;background:var(--bg3);transition:border-color .15s" onmouseover="this.style.borderColor='var(--border3)'" onmouseout="this.style.borderColor='var(--border2)'">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="font-size:15px">${platformIcon(w.platform)}</span>
        <span style="font-size:12.5px;font-weight:600;color:var(--text);flex:1">${w.name}</span>
        <span style="font-size:9.5px;background:var(--green-bg);color:var(--green);border:1px solid var(--green)22;padding:2px 7px;border-radius:3px;font-family:var(--font-mono)">● ACTIVE</span>
      </div>
      <div style="font-size:10.5px;color:var(--text3);margin-bottom:8px;font-family:var(--font-mono)">Trigger: <span style="color:${platformColor(w.platform)}">${w.trigger}</span></div>
      <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:9px">
        ${w.steps.map((s,i)=>`<span style="font-size:10px;background:var(--bg4);border:1px solid var(--border);color:var(--text2);padding:2px 7px;border-radius:4px">Step ${i+1}: ${s}</span>`).join('')}
      </div>
      <div style="display:flex;gap:14px;font-size:11px;font-family:var(--font-mono)">
        <span style="color:var(--text3)">Leads: <strong style="color:var(--text)">${w.leads.toLocaleString()}</strong></span>
        <span style="color:var(--text3)">Conv: <strong style="color:var(--green)">${w.conv}</strong></span>
      </div>
    </div>
  `).join('');
}

function renderSocialConvFeed(){
  const el = document.getElementById('social-conv-feed');
  if(!el) return;
  const icon = p => p==='facebook'?'📘':'📸';
  const stageColor = s => ({New:'var(--cold)',Qualified:'var(--warm)',Engaged:'var(--teal)',Hot:'var(--hot)'}[s]||'var(--text3)');
  el.innerHTML = socialConversations.map(c=>`
    <div style="border-bottom:1px solid var(--border);padding:10px 2px;display:flex;flex-direction:column;gap:5px">
      <div style="display:flex;align-items:center;gap:7px">
        <span>${icon(c.platform)}</span>
        <span style="font-size:12.5px;font-weight:500;color:var(--text);flex:1">${c.name}</span>
        <span style="font-size:9px;background:var(--bg4);color:${stageColor(c.stage)};border:1px solid ${stageColor(c.stage)}22;padding:1px 7px;border-radius:3px;font-family:var(--font-mono)">${c.stage}</span>
        <span style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${c.time}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;padding-left:22px">
        <div style="font-size:11.5px;color:var(--text3);background:var(--bg4);padding:5px 9px;border-radius:0 6px 6px 6px;border-left:2px solid var(--border3)">👤 ${c.msg}</div>
        <div style="font-size:11.5px;color:var(--text2);background:var(--purple-bg);padding:5px 9px;border-radius:6px 6px 6px 0;border-left:2px solid var(--purple)44">🤖 ${c.reply}</div>
      </div>
    </div>
  `).join('');
  const cc = document.getElementById('sm-conv-count');
  if(cc) cc.textContent = socialConversations.length + ' live';
}

function renderAICallQueue(){
  const el = document.getElementById('ai-call-queue');
  if(!el) return;
  const statusColor = s => s.includes('now')?'var(--hot)':s.includes('Scheduled')?'var(--warm)':'var(--text3)';
  el.innerHTML = `<div style="display:flex;flex-direction:column;gap:7px">` +
    aiCallQueue.map(c=>`
      <div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;padding:9px 11px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r)">
        <div>
          <div style="font-size:12.5px;font-weight:500;color:var(--text)">${c.name}</div>
          <div style="font-size:10.5px;color:var(--text3);">${c.platform} · ${c.reason}</div>
        </div>
        <div style="font-size:10px;font-family:var(--font-mono);color:${statusColor(c.status)};white-space:nowrap">${c.status}</div>
        <div style="font-size:10px;font-family:var(--font-mono);color:var(--text3)">${c.duration}</div>
      </div>
    `).join('') + `</div>`;
}

function renderSocialPipeline(){
  const el = document.getElementById('social-pipeline');
  if(!el) return;
  el.innerHTML = `<div style="display:flex;gap:9px;min-width:max-content;padding-bottom:4px">` +
    socialPipelineStages.map(stage=>`
      <div style="width:140px;flex-shrink:0">
        <div style="font-size:10px;font-family:var(--font-mono);color:${stage.color};text-transform:uppercase;letter-spacing:.5px;margin-bottom:7px;padding:0 2px">${stage.label} <span style="color:var(--text3)">(${stage.leads.length})</span></div>
        <div style="display:flex;flex-direction:column;gap:5px">
          ${stage.leads.map(l=>`
            <div style="background:var(--bg3);border:1px solid var(--border2);border-left:2px solid ${stage.color};border-radius:6px;padding:6px 9px;font-size:11.5px;color:var(--text2);cursor:grab" draggable="true">${l}</div>
          `).join('')}
        </div>
      </div>
    `).join('') + `</div>`;
}

function renderFbStats(){
  const el = document.getElementById('fb-stats');
  if(!el) return;
  const rows = [
    ['Page Followers','48,320','↑ +840 this month'],
    ['DMs Received (30d)','2,841','Auto-responded: 100%'],
    ['Ad Campaigns Active','4','Boosted posts + Lead Ads'],
    ['Avg Response Buffer','18s','Mimics human delay'],
    ['Leads from Facebook','2,853','Of 4,742 total'],
    ['Conversion Rate','11.2%','↑ vs 6.1% industry avg'],
  ];
  el.innerHTML = rows.map(([l,v,d])=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:12px;color:var(--text2)">${l}</span>
      <div style="text-align:right">
        <div style="font-size:13px;font-family:var(--font-mono);color:var(--text)">${v}</div>
        <div style="font-size:10px;color:var(--text3)">${d}</div>
      </div>
    </div>
  `).join('');
}

function renderIgStats(){
  const el = document.getElementById('ig-stats');
  if(!el) return;
  const rows = [
    ['Followers','31,780','↑ +1,240 this month'],
    ['DMs Received (30d)','1,889','Auto-responded: 100%'],
    ['Reels Driving Leads','12','Top: Property Tour Reel'],
    ['Avg Response Buffer','22s','Humanized timing'],
    ['Leads from Instagram','1,889','Of 4,742 total'],
    ['Conversion Rate','8.7%','↑ vs 4.2% industry avg'],
  ];
  el.innerHTML = rows.map(([l,v,d])=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:12px;color:var(--text2)">${l}</span>
      <div style="text-align:right">
        <div style="font-size:13px;font-family:var(--font-mono);color:var(--text)">${v}</div>
        <div style="font-size:10px;color:var(--text3)">${d}</div>
      </div>
    </div>
  `).join('');
}

function addWorkflow(){
  alert('New workflow builder coming soon — connect Facebook Page, set trigger keyword, define chatbot steps, and activate.');
}

// Live counter — update social lead count every ~12s
setInterval(()=>{
  const el = document.getElementById('sm-total');
  if(el && document.getElementById('view-social_auto').classList.contains('active')){
    el.textContent = (parseInt(el.textContent.replace(',','')) + 1).toLocaleString();
  }
}, 12000);


// ══════════════════════════════════════════════════
// FOLLOW-UP AUTOMATION LIBRARY
// ══════════════════════════════════════════════════
const followUpTemplates = [
  {icon:'📆', name:'Quarterly Check-In', color:'var(--cold)', cadence:'Every 90 days', enrolled:412, desc:'"Hi {name}, checking in on your property search. New listings in {area} this quarter?"'},
  {icon:'💰', name:'Budget Revisit', color:'var(--green)', cadence:'On price drop / 60d', enrolled:118, desc:'"{name}, units in your AED {budget} range just opened in {area}. Want a shortlist?"'},
  {icon:'🎉', name:'Holiday & Eid Greetings', color:'var(--accent)', cadence:'Calendar-triggered', enrolled:1240, desc:'"Eid Mubarak, {name}! Wishing you and your family a blessed celebration. — Emaar Team"'},
  {icon:'🏗️', name:'New Launch Alert', color:'var(--purple)', cadence:'On developer launch', enrolled:864, desc:'"{name}, {developer} just launched in {area} — pre-launch prices + payment plan inside."'},
  {icon:'👀', name:'Post-Viewing Follow-Up', color:'var(--warm)', cadence:'24h after viewing', enrolled:73, desc:'"Thanks for viewing today, {name}. Any questions? I can hold the unit 48h for you."'},
  {icon:'❄️', name:'Cold Lead Re-Engage', color:'var(--hot)', cadence:'90d inactive', enrolled:214, desc:'"{name}, still looking? The {area} market shifted — worth a quick 5-min call this week?"'},
  {icon:'🤝', name:'Post-Handover Care', color:'var(--teal)', cadence:'After closing', enrolled:96, desc:'"Congrats on your new home, {name}! Need help with move-in, snagging, or leasing it out?"'},
  {icon:'🎂', name:'Birthday & Milestones', color:'var(--cold)', cadence:'Calendar-triggered', enrolled:540, desc:'"Happy Birthday, {name}! 🎉 A small token from all of us at the team."'},
];

// ══════════════════════════════════════════════════
// 📞 LIVE CALL ASSISTANT — in-call AI help for agents
// ══════════════════════════════════════════════════
const callTranscript = [
  {who:'lead', text:'Hi, yes I saw the Dubai Hills villa. It looks great but honestly the price feels a bit high for me.', t:'00:42'},
  {who:'agent', text:'I completely understand, Ahmed. Let me show you why it holds value — and I have flexibility on payment structure.', t:'00:51'},
  {who:'lead', text:'Okay. My main worry is I need to move within 6 weeks. Is that even possible?', t:'01:18'},
  {who:'agent', text:'Absolutely — this is a completed, ready-to-move villa. Handover can be immediate once paperwork clears.', t:'01:27'},
  {who:'lead', text:'That\'s good. And what about the service charges? I heard Dubai Hills is expensive.', t:'01:58'},
];
// AI cues react to the LAST lead utterance
const callWhisper = {
  text:'💡 The lead just raised <strong>service charges</strong> — a buying signal (they\'re past "if" and onto "details"). Quote the exact figure to build trust:',
  script:'"Great question — Dubai Hills service charge is AED 18/sqft annually, which is mid-range for prime communities. For this villa that\'s about AED 5,400/month, and it covers the parks, security, and pools. I\'ll send you the full breakdown right after this call."',
  why:'Specific numbers + proactive follow-up = trust. Avoid vague answers on fees — they trigger doubt.'
};
const callObjections = [
  {trigger:'"Price feels high"', detected:true, response:'Reframe to value/sqft + payment plan. "Let\'s look at price per sqft vs comparable villas — and I can structure 20% down with post-handover instalments."'},
  {trigger:'"Need to move fast"', detected:true, response:'Emphasise ready/completed status. "This is move-in ready — no construction wait. We can close in your 6-week window."'},
  {trigger:'"Service charges"', detected:true, response:'Give exact figure + what it covers. Never be vague on recurring costs.'},
  {trigger:'"Let me think about it"', detected:false, response:'Create gentle urgency: "Of course — shall I hold the unit 48h so no one else takes it while you decide?"'},
  {trigger:'"Talk to my spouse"', detected:false, response:'Offer a joint viewing/call. "Would a quick call together work? I can answer both your questions at once."'},
];
const callCapture = [
  {label:'Budget confirmed', val:'AED 4.0–4.2M', icon:'💰'},
  {label:'Timeline', val:'6 weeks (urgent)', icon:'⏱'},
  {label:'Key concern', val:'Price + service charges', icon:'⚠️'},
  {label:'Buying signal', val:'Asking about fees = serious', icon:'🟢'},
  {label:'Next step', val:'Send fee breakdown + book viewing', icon:'📅'},
];
const callTalkPoints = [
  {done:true, text:'Confirmed move-in ready status'},
  {done:true, text:'Addressed price objection'},
  {done:false, text:'Quote exact service charge (AED 5.4K/mo)'},
  {done:false, text:'Offer payment plan: 20% + post-handover'},
  {done:false, text:'Book Thursday viewing before ending call'},
  {done:false, text:'Send shortlist of 2 comparable villas'},
];

function renderCallAssist(){
  const tr = document.getElementById('call-transcript');
  if(tr){
    tr.innerHTML = callTranscript.map(m=>{
      const isLead = m.who==='lead';
      return `<div style="display:flex;flex-direction:column;align-items:${isLead?'flex-start':'flex-end'}">
        <div style="max-width:82%;padding:9px 12px;border-radius:${isLead?'10px 10px 10px 2px':'10px 10px 2px 10px'};background:${isLead?'var(--bg4)':'var(--purple-bg)'};border:1px solid ${isLead?'var(--border2)':'var(--purple)22'}">
          <div style="font-size:9px;font-family:var(--font-mono);color:${isLead?'var(--cold)':'var(--purple)'};text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">${isLead?'🗣 Ahmed (Lead)':'👤 You'} · ${m.t}</div>
          <div style="font-size:12.5px;color:var(--text);line-height:1.5">${m.text}</div>
        </div>
      </div>`;
    }).join('') + `<div style="display:flex;align-items:center;gap:6px;padding:6px 2px;color:var(--text3)"><span class="live-dot"></span><span style="font-size:10px;font-family:var(--font-mono)">AI transcribing live…</span></div>`;
    tr.scrollTop = tr.scrollHeight;
  }
  const wh = document.getElementById('call-whisper');
  if(wh){
    wh.innerHTML = `
      <div style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:11px">${callWhisper.text}</div>
      <div style="background:var(--purple-bg);border:1px solid var(--purple)33;border-radius:var(--r);padding:12px 14px;font-size:13px;color:var(--text);line-height:1.6;font-style:italic">${callWhisper.script}</div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn btn-sm btn-primary" onclick="this.textContent='✓ Delivered'" style="flex:1;justify-content:center">🎙 I said this</button>
        <button class="btn btn-sm" onclick="nextWhisper()" style="justify-content:center">Skip →</button>
      </div>
      <div style="font-size:10.5px;color:var(--text3);margin-top:9px;line-height:1.5">⚡ <strong>Why:</strong> ${callWhisper.why}</div>`;
  }
  const ob = document.getElementById('call-objections');
  if(ob){
    ob.innerHTML = callObjections.map(o=>`
      <div style="padding:9px 0;border-bottom:1px solid var(--border)">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          ${o.detected?'<span style="font-size:8px;color:var(--hot)">🔴</span>':'<span style="font-size:8px;color:var(--text4)">○</span>'}
          <span style="font-size:11.5px;font-weight:600;color:${o.detected?'var(--hot)':'var(--text2)'}">${o.trigger}</span>
          ${o.detected?'<span style="font-size:8.5px;font-family:var(--font-mono);color:var(--hot);margin-left:auto">DETECTED</span>':''}
        </div>
        <div style="font-size:11px;color:var(--text3);line-height:1.5">${o.response}</div>
      </div>`).join('');
  }
  const cap = document.getElementById('call-capture');
  if(cap){
    cap.innerHTML = callCapture.map(c=>`
      <div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:14px">${c.icon}</span>
        <div style="flex:1"><div style="font-size:10px;color:var(--text3);font-family:var(--font-mono);text-transform:uppercase">${c.label}</div><div style="font-size:12px;color:var(--text);font-weight:500">${c.val}</div></div>
      </div>`).join('');
  }
  const tp = document.getElementById('call-talkpoints');
  if(tp){
    tp.innerHTML = callTalkPoints.map(p=>`
      <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:11.5px">
        <span style="width:16px;height:16px;border-radius:4px;background:${p.done?'var(--green-bg)':'var(--bg4)'};border:1px solid ${p.done?'var(--green)':'var(--border3)'};display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--green);flex-shrink:0">${p.done?'✓':''}</span>
        <span style="color:${p.done?'var(--text3)':'var(--text)'};text-decoration:${p.done?'line-through':'none'}">${p.text}</span>
      </div>`).join('');
  }
}
let whisperShown = 0;
function nextWhisper(){
  whisperShown++;
  const variants = [
    {text:'💡 Time to <strong>create urgency</strong> — offer to hold the unit:', script:'"I can hold this villa for you for 48 hours so no one else takes it while you review the numbers. Would that help?"', why:'Reversible commitment lowers risk perception and moves the deal forward.'},
    {text:'💡 Strong moment to <strong>book the viewing</strong> — don\'t end without a date:', script:'"How about Thursday at 11am? I\'ll line up 2 comparable villas too, so you can compare on the spot."', why:'A scheduled viewing is the #1 predictor of close. Always exit a call with a next date.'},
  ];
  const v = variants[(whisperShown-1)%variants.length];
  callWhisper.text=v.text; callWhisper.script=v.script; callWhisper.why=v.why;
  renderCallAssist();
}
function endCallDemo(){
  document.getElementById('call-status-val').innerHTML='✅ Ended';
  document.getElementById('call-duration').textContent='Call summary saved';
  alert('📞 Call ended.\n\n✅ AI auto-saved to CRM:\n• Budget: AED 4.0–4.2M\n• Timeline: 6 weeks (urgent)\n• Concern: price + service charges\n• Next: send fee breakdown + Thursday viewing\n\nFollow-up sequence "Post-Call Hot Lead" auto-enrolled.');
}

// ── MULTI-CHANNEL ORCHESTRATION RENDER ──
function renderOrchestration(){
  const O = AIEngine.ORCHESTRATION;
  const desc = document.getElementById('orch-desc');
  if(desc) desc.innerHTML = `<strong style="color:var(--text)">${O.name}.</strong> ${O.description}`;
  const wf = document.getElementById('orch-waterfall');
  if(wf){
    wf.innerHTML = O.rules.map((r,i)=>`
      <div style="flex-shrink:0;width:172px;display:flex;flex-direction:column;align-items:center;position:relative">
        ${i<O.rules.length-1?`<div style="position:absolute;top:21px;left:calc(50% + 26px);right:-86px;height:2px;background:linear-gradient(90deg,${r.color},var(--border3));z-index:0"></div>`:''}
        <div style="width:44px;height:44px;border-radius:50%;background:${r.color}1a;border:2px solid ${r.color};display:flex;align-items:center;justify-content:center;font-size:19px;position:relative;z-index:1">${r.icon}</div>
        <div style="font-size:9px;font-family:var(--font-mono);color:${r.color};margin-top:7px;text-transform:uppercase;letter-spacing:.5px">Step ${r.step} · ${r.wait}</div>
        <div style="font-size:12px;font-weight:600;color:var(--text);margin-top:3px;text-align:center">${r.channel}</div>
        <div style="font-size:10.5px;color:var(--text3);text-align:center;margin-top:5px;line-height:1.45;padding:0 6px">${r.action}</div>
        <div style="font-size:9px;font-family:var(--font-mono);color:var(--text4);margin-top:7px;text-align:center">${r.fallback}</div>
      </div>`).join('');
  }
  const jel = document.getElementById('orch-journeys');
  if(jel){
    jel.innerHTML = AIEngine.JOURNEYS.map(j=>{
      const rule = AIEngine.ORCHESTRATION.rules.find(r=>r.step===j.step);
      const done = j.status==='responded';
      const c = done?'var(--green)':rule.color;
      const pct = Math.round(j.step/6*100);
      return `
      <div style="display:flex;align-items:center;gap:11px;padding:10px 13px;background:var(--bg3);border:1px solid var(--border2);border-left:2px solid ${c};border-radius:var(--r)">
        <span style="font-size:17px">${done?'✅':rule.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12.5px;font-weight:500;color:var(--text)">${j.name}</div>
          <div style="font-size:10.5px;color:var(--text3)">${j.detail}</div>
          <div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:5px;overflow:hidden;max-width:280px"><div style="width:${pct}%;height:3px;background:${c};border-radius:2px"></div></div>
        </div>
        <span style="font-size:9.5px;font-family:var(--font-mono);padding:2px 8px;border-radius:4px;background:${c}18;color:${c};border:1px solid ${c}33;white-space:nowrap">${done?'HANDED OFF':'STEP '+j.step+'/6'}</span>
      </div>`;
    }).join('');
  }
}

function renderFollowUpTemplates(){
  const el = document.getElementById('followup-templates');
  if(!el) return;
  el.innerHTML = followUpTemplates.map((t,i)=>`
    <div style="background:var(--bg3);border:1px solid var(--border2);border-left:2px solid ${t.color};border-radius:var(--r);padding:12px 13px;display:flex;flex-direction:column;gap:7px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:16px">${t.icon}</span>
        <span style="font-size:12.5px;font-weight:600;color:var(--text);flex:1">${t.name}</span>
      </div>
      <div style="font-size:10px;font-family:var(--font-mono);color:${t.color};text-transform:uppercase;letter-spacing:.4px">${t.cadence}</div>
      <div style="font-size:11px;color:var(--text3);line-height:1.5;font-style:italic">${t.desc}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px">
        <span style="font-size:10px;color:var(--text3);font-family:var(--font-mono)">${t.enrolled.toLocaleString()} enrolled</span>
        <button class="btn btn-sm" style="padding:3px 9px;font-size:10.5px" onclick="enrollTemplate(${i},this)">+ Enroll</button>
      </div>
    </div>
  `).join('');
}

function enrollTemplate(i,btn){
  const t = followUpTemplates[i];
  btn.textContent = '✓ Active';
  btn.classList.add('btn-primary');
  btn.disabled = true;
  // tiny toast
  const toast = document.createElement('div');
  toast.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--green-bg);border:1px solid var(--green);color:var(--green);font-size:12px;font-family:var(--font-mono);padding:9px 16px;border-radius:8px;z-index:300;box-shadow:var(--shadow-lg)';
  toast.textContent = `🔁 "${t.name}" enrolled · ${t.cadence}`;
  document.body.appendChild(toast);
  setTimeout(()=>{toast.style.transition='opacity .4s';toast.style.opacity='0';setTimeout(()=>toast.remove(),400);},2200);
}

// ══════════════════════════════════════════════════
renderHotLeads();
renderAllLeads();
renderLiveStats();
renderActivity();
renderDashNBA();
renderDailyChart();
renderAgentToday();
renderPipeStats();
renderChannelMix();
renderKanban();
renderNotifs();
renderGCCDevelopers();
renderSocialWorkflows();
renderSocialConvFeed();
renderAICallQueue();
renderSocialPipeline();
renderFbStats();
renderIgStats();
renderFollowUpTemplates();
renderOrchestration();
renderCallAssist();

// Time-aware hero greeting
function updateHeroGreeting(){
  const el=document.getElementById('hero-greeting'); if(!el) return;
  const h=new Date().getHours();
  const ar = currentLang==='ar';
  let g;
  if(h<12) g = ar?'صباح الخير':'Good morning';
  else if(h<17) g = ar?'مساء الخير':'Good afternoon';
  else g = ar?'مساء الخير':'Good evening';
  el.textContent = g+' 👋';
}
updateHeroGreeting();
renderDashAutoSummary();
renderDashSocialSnapshot();
updateDP(); updateRate(); updateYield();

// Animate metric bars on load
setTimeout(()=>{
  document.querySelectorAll('.metric-bar-fill').forEach(bar=>{
    const w=bar.style.width;
    bar.style.width='0';
    requestAnimationFrame(()=>{
      setTimeout(()=>{ bar.style.width=w; }, 100);
    });
  });
}, 200);

// Animate metric values counting up
document.querySelectorAll('.metric-value').forEach(el=>{
  el.style.animation='countUp .5s cubic-bezier(.22,1,.36,1) both';
});


// ── Team & roles ─────────────────────────────────────────────────────
(function(){
  const me=window.__me||{},admin=me.role==='admin';
  if(admin)document.getElementById('nav-team').style.display='';
  // Agents cannot import or delete (the server enforces this too); hide the controls.
  if(!admin){const imp=document.querySelector('[onclick*="csv-file"]');if(imp)imp.style.display='none';}
})();
async function renderTeam(){
  const body=document.getElementById('team-table');
  try{
    const {users,invites}=await api('GET','/api/users'),me=window.__me||{};
    document.getElementById('team-count').textContent=users.length+' member'+(users.length===1?'':'s')+(invites.length?` · ${invites.length} pending`:'');
    body.innerHTML=users.map(u=>`<tr><td>${esc(u.email)}${u.email===me.email?' <span style="color:var(--text3)">(you)</span>':''}</td>
      <td><select class="field-input" style="width:auto;padding:4px 8px" onchange="setRole(${Number(u.id)},this)" aria-label="Role for ${esc(u.email)}"><option value="agent"${u.role==='agent'?' selected':''}>Agent</option><option value="admin"${u.role==='admin'?' selected':''}>Admin</option></select></td>
      <td>${u.email===me.email?'':`<button class="btn btn-sm" style="color:var(--hot)" onclick="removeUser(${Number(u.id)})">Remove</button>`}</td></tr>`).join('')
      +invites.map(i=>`<tr><td>${esc(i.email)} <span style="color:var(--text3)">· invited</span></td><td>${esc(i.role)}</td>
      <td><button class="btn btn-sm" onclick="revokeInvite(${Number(i.id)})">Revoke</button></td></tr>`).join('');
  }catch(e){body.textContent=e.message}
}
async function sendInvite(){
  try{
    const r=await api('POST','/api/users/invite',{email:document.getElementById('inv-email').value,role:document.getElementById('inv-role').value});
    document.getElementById('inv-link').value=location.origin+'/login.html?invite='+encodeURIComponent(r.token);
    document.getElementById('inv-result').style.display='';document.getElementById('inv-email').value='';
    renderTeam();
  }catch(e){toastMsg(e.message)}
}
function copyInvite(){copyField('inv-link')}
function copyField(id){
  const i=document.getElementById(id);i.select();
  (navigator.clipboard?navigator.clipboard.writeText(i.value):Promise.reject()).then(()=>toastMsg('Link copied'),()=>{document.execCommand('copy');toastMsg('Link copied')});
}
async function setRole(id,sel){
  try{await api('PATCH','/api/users/'+id,{role:sel.value});toastMsg('Role updated')}catch(e){toastMsg(e.message);renderTeam()}
}
async function removeUser(id){
  if(!confirm('Remove this person? They lose access immediately.'))return;
  try{await api('DELETE','/api/users/'+id);renderTeam();toastMsg('Removed')}catch(e){toastMsg(e.message)}
}
async function revokeInvite(id){try{await api('DELETE','/api/invites/'+id);renderTeam()}catch(e){toastMsg(e.message)}}

async function renderIntegrations(){
  const body=document.getElementById('intg-table');
  try{
    const {integrations}=await api('GET','/api/integrations');
    document.getElementById('intg-count').textContent=integrations.length?integrations.length+' active':'';
    body.innerHTML=integrations.length?integrations.map(i=>{
      const pull=i.kind==='pull',when=pull?i.last_sync_at:i.last_used_at;
      const note=i.last_error?`<div style="color:var(--hot);font-size:11px">${esc(i.last_error)}</div>`:(pull&&i.more?'<div style="color:var(--warm);font-size:11px">More contacts to import: press Sync again</div>':'');
      return `<tr><td>${esc(i.label)} <span style="color:var(--text3);font-size:11px">${pull?'· HubSpot pull':'· webhook'}</span>${note}</td>
      <td style="color:var(--text3)">${when?esc(new Date(when).toLocaleString()):'never'}</td><td>${esc(i.received)}</td>
      <td style="white-space:nowrap">${pull?`<button class="btn btn-sm btn-primary" onclick="syncIntegration(${Number(i.id)},this)">Sync now</button> `:''}<button class="btn btn-sm" style="color:var(--hot)" onclick="revokeIntegration(${Number(i.id)})">${pull?'Remove':'Revoke'}</button></td></tr>`;
    }).join(''):'<tr><td colspan="4" style="color:var(--text3);padding:14px">No integrations yet.</td></tr>';
  }catch(e){body.textContent=e.message}
}
async function connectHubspot(){
  const btn=document.getElementById('hs-connect'),tok=document.getElementById('hs-token');
  btn.disabled=true;
  try{
    await api('POST','/api/integrations',{adapter:'hubspot',label:'HubSpot',config:{token:tok.value}});
    tok.value='';toastMsg('HubSpot connected. Press Sync now to import contacts.');renderIntegrations();
  }catch(e){toastMsg(e.message)}finally{btn.disabled=false}
}
async function syncIntegration(id,btn){
  btn.disabled=true;btn.textContent='Syncing…';
  try{
    const r=await api('POST',`/api/integrations/${id}/sync`);
    leads.splice(0,leads.length,...await api('GET','/api/leads'));refreshLeadViews();
    toastMsg(`Synced ${r.fetched}: ${r.created} new, ${r.duplicates} already existed`+(r.skipped?`, ${r.skipped} skipped (no name or phone)`:'')+(r.done?'':'. More to import: press Sync again'));
  }catch(e){toastMsg(e.message)}
  renderIntegrations();
}
async function createIntegration(){
  try{
    const r=await api('POST','/api/integrations',{adapter:'webhook',label:document.getElementById('intg-label').value});
    const url=location.origin+r.path;
    document.getElementById('intg-url').value=url;
    document.getElementById('intg-curl').textContent=`curl -X POST '${url}' \\\n  -H 'content-type: application/json' \\\n  -d '{"name":"Layla Hassan","phone":"050 111 2233","email":"layla@example.com","budget":2500000,"message":"Interested in 2BR"}'`;
    document.getElementById('intg-result').style.display='';document.getElementById('intg-label').value='';
    renderIntegrations();
  }catch(e){toastMsg(e.message)}
}
async function revokeIntegration(id){
  if(!confirm('Revoke this webhook? Systems posting to it will stop working.'))return;
  try{await api('DELETE','/api/integrations/'+id);renderIntegrations()}catch(e){toastMsg(e.message)}
}
