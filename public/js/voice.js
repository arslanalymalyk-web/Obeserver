// ══════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════
const T={
  en:{
    'logo-status':'SIMULATION · NO CALLS PLACED','ns-live':'Live Operations','ni-live':'Live Call Center',
    'ni-queue':'Call Queue','ni-campaigns':'Campaigns','ns-scripts':'Scripts & AI','ni-scripts':'Script Library',
    'ni-objections':'Objection Handling','ns-analytics':'Analytics','ni-analytics':'Call Analytics',
    'ni-calllog':'Call Log','ns-settings':'System','ni-settings':'Voice Settings','ni-notifications':'Notifications',
    'page-title-live':'Live Call Center','page-title-queue':'Call Queue','page-title-campaigns':'Campaigns',
    'page-title-scripts':'Script Library','page-title-objections':'Objection Handling',
    'page-title-analytics':'Call Analytics','page-title-calllog':'Call Log','page-title-settings':'Voice Settings','page-title-notifications':'Notifications',
    'tb-live':'Demo','tb-ai':'Scripted simulation','tb-end':'End simulated call','tb-new':'New simulated call',
    'm-active-calls':'Active Calls','md-active':'Simulated','m-queue-size':'Queue Size','md-queue':'Waiting',
    'm-today-calls':'Calls Today','md-today':'Sample figure','m-connect-rate':'Connect Rate','md-connect':'Sample figure',
    'm-handoffs':'Handoffs Today','md-handoffs':'Sample figure',
    'cq-title':'Call Queue','cq-sub':'8 leads · Ordered by AI score',
    'sp-title':'AI Script Router','ai-score-label':'AI Score',
    'ca-quick':'⚡ Quick Actions','ca-obj':'🛡️ Objection Handlers',
    'switch-wa':'WA','handoff-btn':'Handoff','end-call-btn':'End',
    'wf-who':'🤖 AI Agent',
    'm-q-high':'High Intent Waiting','md-q-high':'Score 80+','m-q-mid':'Medium Intent','md-q-mid':'Score 50–79',
    'm-q-low':'Low Intent','md-q-low':'Score 0–49','m-avg-wait':'Avg Wait Time','md-wait':'Target: <2 min',
    'm-auto-rate':'Auto-Dial Rate','md-auto':'Not implemented','qv-title':'Full Call Queue','qv-live':'Sample queue',
    'dial-next-btn':'📞 Dial Next',
    'm-total-camps':'Total Campaigns','m-total-leads':'Total Leads','m-called':'Called',
    'm-handoff-camp':'Handoffs','m-camp-rev':'Revenue Pipeline',
    'sf-all':'All Scripts','sf-high':'🔥 High Intent','sf-medium':'Warm','sf-low':'Low Intent',
    'sf-buyer':'Buyers','sf-investor':'Investors','sf-tenant':'Tenants','sf-obj':'Objections',
    'm-obj-today':'Objections Today','m-obj-resolved':'Resolved Rate','m-obj-top':'Most Common',
    'm-obj-end':'Calls Ended','m-obj-wa':'Converted to WA',
    'obj-en-title':'English Objection Handlers','obj-ar-title':'Arabic Objection Handlers',
    'm-a-total':'Total Calls','m-a-answered':'Answered','m-a-high':'High Score','m-a-handoff':'Handoffs',
    'm-a-duration':'Avg Duration','pa-outcomes':'Call Outcomes','pa-score-dist':'Calls by AI Score Band',
    'pa-daily':'Daily Call Volume — Last 14 Days',
    'cl-title':'Full Call Log','cl-count':'47 calls today',
    'clh-time':'Time','clh-lead':'Lead','clh-score':'Score','clh-intent':'Intent','clh-lang':'Lang',
    'clh-duration':'Duration','clh-outcome':'Outcome','clh-next':'Next Step',
    'sv-voice':'Voice Settings','sv-routing':'Score Routing Logic','sv-vars':'System Variables',
    'nv-title':'Notifications',
    'ncm-title':'New Call','ncm-name':'Lead Name','ncm-phone':'Phone / WhatsApp',
    'ncm-score':'AI Score','ncm-lang':'Preferred Language','ncm-cancel':'Cancel','ncm-start':'📞 Start Call',
    'score-tier-hot':'HIGH INTENT','score-tier-mid':'MEDIUM INTENT','score-tier-low':'LOW INTENT',
  },
  ar:{
    'logo-status':'محاكاة · لا يتم إجراء مكالمات','ns-live':'العمليات الحية','ni-live':'مركز الاتصال المباشر',
    'ni-queue':'قائمة الانتظار','ni-campaigns':'الحملات','ns-scripts':'النصوص والذكاء','ni-scripts':'مكتبة النصوص',
    'ni-objections':'معالجة الاعتراضات','ns-analytics':'التحليلات','ni-analytics':'تحليلات المكالمات',
    'ni-calllog':'سجل المكالمات','ns-settings':'النظام','ni-settings':'إعدادات الصوت','ni-notifications':'الإشعارات',
    'page-title-live':'مركز الاتصال المباشر','page-title-queue':'قائمة الانتظار','page-title-campaigns':'الحملات',
    'page-title-scripts':'مكتبة النصوص','page-title-objections':'معالجة الاعتراضات',
    'page-title-analytics':'تحليلات المكالمات','page-title-calllog':'سجل المكالمات','page-title-settings':'إعدادات الصوت','page-title-notifications':'الإشعارات',
    'tb-live':'عرض','tb-ai':'محاكاة مكتوبة مسبقًا','tb-end':'إنهاء المكالمة المحاكاة','tb-new':'مكالمة محاكاة جديدة',
    'm-active-calls':'المكالمات النشطة','md-active':'محاكى','m-queue-size':'حجم القائمة','md-queue':'في الانتظار',
    'm-today-calls':'مكالمات اليوم','md-today':'رقم تجريبي','m-connect-rate':'معدل الاتصال','md-connect':'رقم تجريبي',
    'm-handoffs':'التحويلات اليوم','md-handoffs':'رقم تجريبي',
    'cq-title':'قائمة المكالمات','cq-sub':'8 عملاء · مرتبة حسب نقاط الذكاء',
    'sp-title':'موجه نص الذكاء الاصطناعي','ai-score-label':'نقاط الذكاء',
    'ca-quick':'⚡ إجراءات سريعة','ca-obj':'🛡️ ردود الاعتراضات',
    'switch-wa':'واتساب','handoff-btn':'تحويل','end-call-btn':'إنهاء',
    'wf-who':'🤖 الوكيل الذكي',
    'm-q-high':'انتظار عالي النية','md-q-high':'نقاط 80+','m-q-mid':'نية متوسطة','md-q-mid':'نقاط 50–79',
    'm-q-low':'نية منخفضة','md-q-low':'نقاط 0–49','m-avg-wait':'متوسط وقت الانتظار','md-wait':'الهدف: أقل من دقيقتين',
    'm-auto-rate':'معدل الاتصال التلقائي','md-auto':'غير منفذ','qv-title':'قائمة المكالمات الكاملة','qv-live':'قائمة تجريبية',
    'dial-next-btn':'📞 اتصل بالتالي',
    'm-total-camps':'إجمالي الحملات','m-total-leads':'إجمالي العملاء','m-called':'تم الاتصال',
    'm-handoff-camp':'التحويلات','m-camp-rev':'خط الإيرادات',
    'sf-all':'جميع النصوص','sf-high':'🔥 نية عالية','sf-medium':'دافئ','sf-low':'نية منخفضة',
    'sf-buyer':'المشترون','sf-investor':'المستثمرون','sf-tenant':'المستأجرون','sf-obj':'الاعتراضات',
    'm-obj-today':'اعتراضات اليوم','m-obj-resolved':'معدل الحل','m-obj-top':'الأكثر شيوعاً',
    'm-obj-end':'مكالمات منتهية','m-obj-wa':'تحويل إلى واتساب',
    'obj-en-title':'ردود الاعتراضات بالإنجليزية','obj-ar-title':'ردود الاعتراضات بالعربية',
    'm-a-total':'إجمالي المكالمات','m-a-answered':'تمت الإجابة','m-a-high':'نقاط عالية','m-a-handoff':'التحويلات',
    'm-a-duration':'متوسط المدة','pa-outcomes':'نتائج المكالمات','pa-score-dist':'المكالمات حسب نطاق النقاط',
    'pa-daily':'حجم المكالمات اليومي — آخر 14 يوم',
    'cl-title':'سجل المكالمات الكامل','cl-count':'47 مكالمة اليوم',
    'clh-time':'الوقت','clh-lead':'العميل','clh-score':'النقاط','clh-intent':'النية','clh-lang':'اللغة',
    'clh-duration':'المدة','clh-outcome':'النتيجة','clh-next':'الخطوة التالية',
    'sv-voice':'إعدادات الصوت','sv-routing':'منطق توجيه النقاط','sv-vars':'متغيرات النظام',
    'nv-title':'الإشعارات',
    'ncm-title':'مكالمة جديدة','ncm-name':'اسم العميل','ncm-phone':'الهاتف / واتساب',
    'ncm-score':'نقاط الذكاء','ncm-lang':'اللغة المفضلة','ncm-cancel':'إلغاء','ncm-start':'📞 بدء المكالمة',
    'score-tier-hot':'نية عالية','score-tier-mid':'نية متوسطة','score-tier-low':'نية منخفضة',
  }
};
let lang='en';
function t(key){return T[lang][key]||T.en[key]||key}
function applyLang(l){
  lang=l;
  Object.keys(T.en).forEach(k=>{
    const el=document.getElementById(k);
    if(el&&T[l][k])el.textContent=T[l][k];
  });
  const root=document.getElementById('root');
  if(l==='ar'){root.setAttribute('lang','ar');root.setAttribute('dir','rtl');document.getElementById('langLabel').textContent='EN';}
  else{root.setAttribute('lang','en');root.setAttribute('dir','ltr');document.getElementById('langLabel').textContent='AR';}
  // re-render current script with new lang
  setScript(currentScore,currentIntent);
}
function toggleLang(){applyLang(lang==='en'?'ar':'en');document.getElementById('langBtn').classList.toggle('on',lang==='ar');}
function toggleTheme(){document.body.classList.toggle('light');document.getElementById('themeBtn').classList.toggle('on',document.body.classList.contains('light'));}

// ══════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════
// Lead-to-property relationship: each sample lead references a demo asset id; the link opens that asset in the portfolio prototype.
const PORTFOLIO_BASE=location.pathname.includes('/demo/')?'index.html':'demo/index.html';
const queueData=[
  {id:1,name:'Ahmed (sample)',initials:'AS',phone:'+000 555 0101',score:87,intent:'Tenant',area:'Marlow Street Mixed-Use · 2-bedroom',assetId:'A7',lang:'EN',status:'active',c:'#0d2a1a'},
  {id:2,name:'Nour (sample)',initials:'NS',phone:'+000 555 0102',score:91,intent:'Tenant',area:'Quayside Serviced Apartments · 1-bedroom',assetId:'A8',lang:'EN',status:'waiting',c:'#1a0d2a'},
  {id:3,name:'Fatima (sample)',initials:'FS',phone:'+000 555 0103',score:81,intent:'Tenant',area:'Cedar Row Townhomes · 3-bedroom',assetId:'A5',lang:'AR',status:'waiting',c:'#0d1a2a'},
  {id:4,name:'Rania (sample)',initials:'RS',phone:'+000 555 0104',score:69,intent:'Tenant',area:'Harbor Point Residences · studio',assetId:'A1',lang:'AR',status:'waiting',c:'#2a1a0d'},
  {id:5,name:'Tariq (sample)',initials:'TS',phone:'+000 555 0105',score:62,intent:'Tenant',area:'Northgate Office Park · Floor 2 suite',assetId:'A2',lang:'AR',status:'waiting',c:'#0d2a2a'},
  {id:6,name:'Mohammad (sample)',initials:'MS',phone:'+000 555 0106',score:55,intent:'Investor',area:'Portfolio enquiry (no specific asset)',assetId:null,lang:'EN',status:'waiting',c:'#1a1a2a'},
  {id:7,name:'Omar (sample)',initials:'OS',phone:'+000 555 0107',score:44,intent:'Tenant',area:'Atlas Business Centre · small suite',assetId:'A6',lang:'AR',status:'waiting',c:'#2a2a0d'},
  {id:8,name:'Sara (sample)',initials:'SS',phone:'+000 555 0108',score:38,intent:'Tenant',area:'Marlow Street Mixed-Use · retail unit',assetId:'A7',lang:'AR',status:'missed',c:'#2a0d0d'},
  {id:9,name:'Khalid (sample)',initials:'KS',phone:'+000 555 0109',score:29,intent:'Tenant',area:'Harbor Point Residences · 1-bedroom',assetId:'A1',lang:'AR',status:'waiting',c:'#0d2a2a'},
];


const scriptsEN={
  greeting:`Hello, am I speaking with [Client Name]?\n\nHi [Client Name], this is [Agent Name], the automated assistant from [Platform Name]. We noticed your interest in real estate in [Area/City]. Is this a good time for a quick 1-minute call?\n\n<em>Would you prefer to continue in English or Arabic?</em>`,
  high_open:`Thank you. Based on your recent interest, we may have highly relevant options for you.\n\n<strong>May I quickly ask:</strong>\n• Are you looking to buy, rent, or invest?\n• Which area do you prefer?\n• What budget range are you considering?\n• How soon are you planning to move forward?\n• What type of property — apartment, villa, townhouse, office, or other?`,
  high_cta:`Thank you, that's very helpful. Based on what you shared, we likely have matching options.\n\n<strong>Would you prefer:</strong>\n• A call today from one of our property specialists, <em>or</em>\n• Schedule a viewing for the most relevant properties?\n\n<em>If hesitant: We can first send you a shortlist by WhatsApp or email.</em>`,
  medium_open:`Thank you. I'd like to understand your requirement a little better.\n\n<strong>May I ask:</strong>\n• Are you searching for personal use or investment?\n• Which locations interest you?\n• What is your approximate budget?\n• Are you planning to move soon, or still exploring?\n• Have you viewed any properties recently?`,
  medium_cta:`Based on your preferences, we can prepare relevant options.\n\n<strong>Would you prefer:</strong>\n• A shortlist by WhatsApp\n• A shortlist by email, <em>or</em>\n• A detailed consultation call with one of our advisors?\n\n<em>If undecided: We can send a few handpicked options first.</em>`,
  low_open:`Thank you. I just wanted to understand whether you are:\n\n• Actively searching now\n• Exploring the market, <em>or</em>\n• Planning for the future?\n\n<em>If casual: We'd be happy to occasionally share selected listings and market updates.</em>`,
  low_cta:`<strong>Would you like to receive updates by WhatsApp or email?</strong>\n\n<em>If no: No problem at all. Thank you for your time, and if your plans change in the future, we'll be happy to assist you.</em>`,
  buyer:`Great, thank you. Since you are looking to buy:\n\n• Is this for personal use or investment?\n• Which area or community do you prefer?\n• What is your budget range?\n• Ready property or off-plan?\n• How many bedrooms?\n• When are you planning to purchase?`,
  investor:`Since you are exploring investment:\n\n• Rental income, capital appreciation, or both?\n• Which city or area interests you most?\n• What investment range are you considering?\n• Ready properties, off-plan, or both?\n• First-time investor or experienced?`,
  tenant:`Since you are looking to rent:\n\n• Which location do you prefer?\n• Monthly or yearly budget?\n• How many bedrooms?\n• Planning to move immediately or later?\n• For yourself or your family?`,
  closing:`Thank you for your time, [Client Name]. We look forward to helping you find the right property.\n\nOur team will contact you shortly with the most relevant options.\n\n<em>Have a great day.</em>`,
  voicemail:`Hello [Client Name], this is [Agent Name] from [Platform Name]. We're calling regarding your interest in real estate in [Area/City]. You can reach us back or reply to our message, and we'll be happy to share suitable options with you. Thank you.`,
  no_answer:`SMS/WhatsApp follow-up:\nHello [Client Name], this is [Platform Name]. We tried reaching you regarding your interest in properties in [Area]. Reply here if you'd like suitable options by WhatsApp or a callback.`,
  handoff:`I can connect you with one of our property specialists who can assist you in more detail.\n\nWould you like a call today, or at a specific time that works better for you?\n\n<em>This is an automated assistant from [Platform Name].</em>`,
};

const scriptsAR={
  greeting:`السلام عليكم، هل أتحدث مع [اسم العميل]؟\n\nمعك [اسم الوكيل]، المساعد الآلي من [اسم المنصة]. لاحظنا اهتمامك بعقارات في [المدينة / المنطقة]. هل هذا وقت مناسب لمكالمة سريعة لمدة دقيقة؟\n\n<em>هل تفضل أن نكمل باللغة العربية أم الإنجليزية؟</em>`,
  high_open:`شكرًا لك. بناءً على اهتمامك الأخير، قد تكون لدينا خيارات مناسبة جدًا لك.\n\n<strong>اسمح لي ببعض الأسئلة السريعة:</strong>\n• هل تبحث عن شراء أم إيجار أم استثمار؟\n• ما المنطقة التي تفضلها؟\n• ما الميزانية التقريبية التي وضعتها؟\n• متى تنوي اتخاذ خطوة جدية؟\n• ما نوع العقار: شقة، فيلا، تاون هاوس، مكتب، أم غير ذلك؟`,
  high_cta:`شكرًا لك، هذه المعلومات مفيدة جدًا.\n\n<strong>هل تفضل:</strong>\n• أن يتواصل معك أحد مستشارينا العقاريين اليوم، <em>أم</em>\n• نرتب لك معاينة لأكثر العقارات مناسبة؟\n\n<em>إذا كان مترددًا: يمكننا أولًا إرسال قائمة مختصرة عبر الواتساب أو البريد الإلكتروني.</em>`,
  medium_open:`شكرًا لك. فقط أود فهم احتياجك بشكل أفضل.\n\n<strong>هل يمكنني أن أسأل:</strong>\n• هل تبحث بغرض السكن الشخصي أم الاستثمار؟\n• ما المناطق التي تهمك؟\n• ما الميزانية التقريبية المناسبة لك؟\n• هل تخطط للتحرك قريبًا أم ما زلت في مرحلة الاستكشاف؟\n• هل قمت بمعاينة أي عقارات مؤخرًا؟`,
  medium_cta:`بناءً على تفضيلاتك، يمكننا تجهيز بعض الخيارات المناسبة لك.\n\n<strong>هل تفضل:</strong>\n• إرسال قائمة مختصرة عبر الواتساب\n• أو عبر البريد الإلكتروني، <em>أم</em>\n• مكالمة تفصيلية مع أحد مستشارينا؟\n\n<em>إذا متردد: يمكننا إرسال بعض الخيارات أولًا لتراجعها في الوقت المناسب.</em>`,
  low_open:`شكرًا لك. فقط أود أن أعرف هل أنت:\n\n• تبحث بشكل جدي حاليًا\n• أم تستكشف السوق فقط، <em>أم</em>\n• تخطط للمستقبل؟\n\n<em>إذا كان يستكشف: يمكننا إرسال بعض الفرص المناسبة وتحديثات السوق من وقت لآخر.</em>`,
  low_cta:`<strong>هل تفضل استلام التحديثات عبر الواتساب أم البريد الإلكتروني؟</strong>\n\n<em>إذا رفض: لا مشكلة أبدًا. شكرًا لوقتك، وإذا تغيرت خططك مستقبلًا سنكون سعداء بخدمتك.</em>`,
  buyer:`ممتاز، بما أنك تبحث عن شراء:\n\n• هل الشراء للسكن الشخصي أم للاستثمار؟\n• ما المنطقة أو المجمع السكني المفضل لديك؟\n• ما الفئة السعرية المناسبة لك؟\n• عقار جاهز أم مشروع على الخارطة؟\n• كم عدد الغرف التي تحتاجها؟\n• متى تتوقع إتمام الشراء؟`,
  investor:`بما أنك مهتم بالاستثمار:\n\n• هل هدفك العائد الإيجاري، أم زيادة قيمة العقار، أم كلاهما؟\n• ما المدينة أو المنطقة التي تهمك أكثر؟\n• ما حجم الاستثمار الذي تفكر فيه؟\n• عقارات جاهزة أم مشاريع على الخارطة أم كلاهما؟\n• هل هذه أول تجربة استثمارية لك أم لديك استثمارات سابقة؟`,
  tenant:`بما أنك تبحث عن إيجار:\n\n• ما المنطقة التي تفضلها؟\n• ما الميزانية الشهرية أو السنوية المناسبة لك؟\n• كم عدد الغرف التي تحتاجها؟\n• هل ترغب بالانتقال فورًا أم لاحقًا؟\n• هل السكن لك أم للعائلة؟`,
  closing:`شكرًا لوقتك [اسم العميل]، ونتطلع لمساعدتك في العثور على العقار المناسب.\n\nسيتواصل معك فريقنا قريبًا بأفضل الخيارات المناسبة.\n\n<em>نتمنى لك يومًا سعيدًا.</em>`,
  voicemail:`مرحبًا [اسم العميل]، معك [اسم الوكيل] من [اسم المنصة] بخصوص اهتمامك بخيارات عقارية في [المدينة / المنطقة]. يمكنك التواصل معنا أو الرد على رسالتنا وسنكون سعداء بمساعدتك. شكرًا لك.`,
  no_answer:`رسالة متابعة واتساب / SMS:\nمرحبًا [اسم العميل]، معك [اسم المنصة]. حاولنا التواصل معك بخصوص اهتمامك بعقارات في [المنطقة]. يمكنك الرد هنا إذا رغبت باستلام خيارات مناسبة أو ترتيب مكالمة.`,
  handoff:`أستطيع تحويلك إلى أحد مستشارينا العقاريين المختصين.\n\nهل تفضل مكالمة اليوم أم في وقت آخر يناسبك؟\n\n<em>هذا مساعد آلي من [اسم المنصة].</em>`,
};

const objectionsEN=[
  {trigger:`"I'm busy."`,response:`Of course, I understand. May I arrange a callback at a time that suits you better?`},
  {trigger:`"Just send me details."`,response:`Certainly. Would you prefer to receive them by WhatsApp or email?`},
  {trigger:`"I'm not interested."`,response:`Understood. Thank you for your time. If your plans change in the future, we'll be happy to assist you. Would you like me to mark your preference as no follow-up for now?`},
  {trigger:`"I'm only comparing."`,response:`That makes perfect sense. We can help by sending a small selection of properties in different price ranges so you can compare more easily.`},
  {trigger:`"I already have an agent."`,response:`Understood. If you ever need additional market options or a second opinion, we'd be happy to help.`},
  {trigger:`"I'm not ready yet."`,response:`That's absolutely fine. Would you like us to share selected opportunities from time to time until you are ready?`},
  {trigger:`Wrong number`,response:`I apologize for the inconvenience. Thank you for letting us know. We will update our records.`},
  {trigger:`Don't call again`,response:`Understood. I apologize for the inconvenience. We will mark your preference and stop further contact.`},
];

const objectionsAR=[
  {trigger:`"أنا مشغول."`,response:`أتفهم ذلك تمامًا. هل ترغب أن نعاود الاتصال في وقت أنسب لك؟`},
  {trigger:`"فقط أرسل لي التفاصيل."`,response:`بكل تأكيد. هل تفضل إرسالها عبر الواتساب أم البريد الإلكتروني؟`},
  {trigger:`"غير مهتم."`,response:`أفهم ذلك. شكرًا لوقتك. وإذا تغيرت خططك مستقبلًا سنكون سعداء بخدمتك. هل تود أن نسجل عدم التواصل حاليًا؟`},
  {trigger:`"فقط أقارن الأسعار."`,response:`مفهوم. يمكننا مساعدتك من خلال إرسال مجموعة صغيرة من الخيارات ضمن فئات سعرية مختلفة لتسهيل المقارنة.`},
  {trigger:`"لدي وسيط آخر."`,response:`أفهم ذلك. وإذا احتجت في أي وقت إلى خيارات إضافية أو رأي آخر، يسعدنا مساعدتك.`},
  {trigger:`"لست جاهزًا الآن."`,response:`لا مشكلة. هل ترغب أن نرسل لك فرصًا مناسبة من وقت لآخر إلى أن تصبح جاهزًا؟`},
  {trigger:`رقم خاطئ`,response:`أعتذر عن الإزعاج. شكرًا لتوضيحك، وسنقوم بتحديث بياناتنا.`},
  {trigger:`لا تتصل مجددًا`,response:`تم، ونعتذر عن الإزعاج. سنقوم بتسجيل تفضيلك بعدم التواصل مستقبلًا.`},
];

const callLogData=[
  {time:'14:32',name:'Ahmed (sample)',score:87,intent:'Tenant',lang:'EN',duration:'3m 12s',outcome:'Handoff requested',next:'Viewing request (sample)'},
  {time:'14:18',name:'Nour (sample)',score:91,intent:'Tenant',lang:'EN',duration:'2m 48s',outcome:'Viewing requested',next:'Leasing agent call'},
  {time:'14:05',name:'Fatima (sample)',score:81,intent:'Tenant',lang:'AR',duration:'4m 01s',outcome:'Details requested',next:'Follow-up 24h'},
  {time:'13:55',name:'Rania (sample)',score:69,intent:'Tenant',lang:'AR',duration:'1m 44s',outcome:'Prefers messaging',next:'Send details'},
  {time:'13:42',name:'Tariq (sample)',score:62,intent:'Tenant',lang:'AR',duration:'2m 22s',outcome:'Callback requested',next:'Call tomorrow 10:00'},
  {time:'13:30',name:'Mohammad (sample)',score:55,intent:'Investor',lang:'EN',duration:'3m 55s',outcome:'Human follow-up',next:'Investor relations call'},
  {time:'13:15',name:'Omar (sample)',score:44,intent:'Tenant',lang:'AR',duration:'0m 58s',outcome:'Not interested',next:'Opted out (sample)'},
  {time:'13:02',name:'Sara (sample)',score:38,intent:'Tenant',lang:'AR',duration:'No Answer',outcome:'No answer',next:'Retry later'},
];


const notifData=[
  {text:'🔥 Ahmed (sample), score 87: handoff rule met (example event, nothing was sent)',time:'sample',color:'var(--hot)',unread:true},
  {text:'📞 Nour (sample): leasing agent call requested (example event)',time:'sample',color:'var(--call)',unread:true},
  {text:'🚨 Sara (sample): no answer. A retry would be a human decision (example event)',time:'sample',color:'var(--warm)',unread:true},
  {text:'⚡ Example: queue scores would be recalculated when new lead activity arrives (not implemented)',time:'sample',color:'#9b7fff',unread:true},
  {text:'💬 Fatima (sample) asked for details by message (example event)',time:'sample',color:'var(--wa)',unread:false},
  {text:'✅ Sample campaign "Marlow Street lease-up" shows 80% of its sample list reviewed',time:'sample',color:'var(--call)',unread:false},
  {text:'⚠️ Omar (sample) opted out: a real system must honour this on every channel (requirement, not implemented)',time:'sample',color:'var(--warm)',unread:false},
];


const campaigns=[
  {name:'Sample campaign: Marlow Street lease-up',status:'active',leads:84,called:68,answered:42,handoffs:18,conv:26,bar:81,barColor:'var(--call)'},
  {name:'Sample campaign: Cedar Row refurbished units',status:'active',leads:67,called:48,answered:29,handoffs:9,conv:19,bar:72,barColor:'var(--warm)'},
  {name:'Sample campaign: Northgate office enquiries',status:'paused',leads:96,called:26,answered:16,handoffs:4,conv:25,bar:27,barColor:'var(--cold)'},
];


const scriptsLibrary=[
  {icon:'🔥',name:'High Intent — Opening',type:'Score 80–100',tags:['hot','en','ar'],preview:'Hello, am I speaking with [Client Name]? ... Based on your recent interest, we may have highly relevant options...'},
  {icon:'⚡',name:'Medium Intent — Qualification',type:'Score 50–79',tags:['mid','en','ar'],preview:'Thank you. I\'d like to understand your requirement a little better so we can recommend suitable options...'},
  {icon:'❄️',name:'Low Intent — Soft Discovery',type:'Score 0–49',tags:['low','en','ar'],preview:'Thank you. I just wanted to understand whether you are actively searching now, exploring, or planning for the future...'},
  {icon:'🏠',name:'Buyer Script',type:'Intent Branch',tags:['buyer','en','ar'],preview:'Great, since you are looking to buy: Is this for personal use or investment? Which area or community do you prefer?...'},
  {icon:'📈',name:'Investor Script',type:'Intent Branch',tags:['investor','en','ar'],preview:'Since you are exploring investment: Are you focused on rental income, capital appreciation, or both?...'},
  {icon:'🔑',name:'Tenant / Rental Script',type:'Intent Branch',tags:['tenant','en','ar'],preview:'Since you are looking to rent: Which location do you prefer? What monthly or yearly budget are you considering?...'},
  {icon:'🛡️',name:'Objection Handling — Busy',type:'Objection',tags:['en','ar'],preview:'"I\'m busy." → Of course, I understand. May I arrange a callback at a time that suits you better?'},
  {icon:'💬',name:'WhatsApp Fallback Script',type:'No Answer',tags:['en','ar'],preview:'Hello [Client Name], this is [Platform Name]. We tried reaching you regarding your interest in properties in [Area]...'},
  {icon:'📞',name:'Voicemail Script',type:'Voicemail',tags:['en','ar'],preview:'Hello [Client Name], this is [Agent Name] from [Platform Name]. We\'re calling regarding your interest in real estate...'},
  {icon:'👤',name:'Human Handoff Transition',type:'Handoff',tags:['hot','en','ar'],preview:'I can connect you with one of our property specialists who can assist you in more detail...'},
];

// ══════════════════════════════════════════════════
// RENDERS
// ══════════════════════════════════════════════════
function scoreClass(s){return s>=80?'hot':s>=50?'mid':'low'}
function scoreTierLabel(s){
  if(s>=80)return t('score-tier-hot');
  if(s>=50)return t('score-tier-mid');
  return t('score-tier-low');
}
function renderQueueList(){
  const el=document.getElementById('call-queue-list');
  el.innerHTML=queueData.map(q=>`
    <div class="queue-item${q.status==='active'?' active-call':q.status==='ringing'?' ringing':''}" onclick="selectQueueItem(${q.id})">
      <div class="qi-top">
        <div class="qi-avatar" style="background:${q.c};color:${q.score>=80?'var(--call)':q.score>=50?'var(--warm)':'var(--cold)'}">${q.initials}</div>
        <span class="qi-name">${q.name}</span>
        <span class="qi-score ${scoreClass(q.score)}">${q.score}</span>
      </div>
      <div class="qi-meta">
        <span>${q.intent} · ${q.area}</span>
        <span style="margin-left:auto">
          <span class="qi-status qs-${q.status==='active'?'active':q.status==='missed'?'missed':q.status==='ringing'?'ringing':'waiting'}">${q.status}</span>
          <span style="font-size:10px;margin-left:4px;background:${q.lang==='AR'?'var(--accent-bg)':'var(--bg4)'};color:${q.lang==='AR'?'var(--accent)':'var(--text3)'};padding:1px 5px;border-radius:3px;font-family:var(--font-m)">${q.lang}</span>
        </span>
      </div>
    </div>`).join('');
}

function renderFullQueue(){
  const el=document.getElementById('full-queue-table');
  el.innerHTML=`<table class="call-log-table"><thead><tr><th>#</th><th>Lead</th><th>Score</th><th>Intent</th><th>Area</th><th>Lang</th><th>Status</th><th></th></tr></thead><tbody>${
  queueData.map((q,i)=>`<tr>
    <td style="font-family:var(--font-m);color:var(--text3)">${i+1}</td>
    <td><div style="display:flex;align-items:center;gap:8px"><div class="qi-avatar" style="background:${q.c};color:${q.score>=80?'var(--call)':q.score>=50?'var(--warm)':'var(--cold)'};width:26px;height:26px;font-size:9.5px">${q.initials}</div><div><div style="font-size:12.5px;font-weight:500;color:var(--text)">${q.name}</div><div style="font-size:10.5px;color:var(--text3);font-family:var(--font-m)">${q.phone}</div></div></div></td>
    <td><span class="qi-score ${scoreClass(q.score)}">${q.score}</span></td>
    <td style="font-size:12px;color:var(--text2)">${q.intent}</td>
    <td style="font-size:12px;color:var(--text2)">${q.area}</td>
    <td><span style="font-size:10px;background:${q.lang==='AR'?'var(--accent-bg)':'var(--bg4)'};color:${q.lang==='AR'?'var(--accent)':'var(--text3)'};padding:1px 6px;border-radius:3px;font-family:var(--font-m)">${q.lang}</span></td>
    <td><span class="qi-status qs-${q.status==='active'?'active':q.status==='missed'?'missed':'waiting'}">${q.status}</span></td>
    <td><button class="btn btn-sm btn-call" onclick="dialLead(${q.id})">📞 Dial</button></td>
  </tr>`).join('')
  }</tbody></table>`;
}

function renderCampaigns(){
  document.getElementById('campaigns-list').innerHTML=campaigns.map(c=>`
    <div class="campaign-card">
      <div class="cc-head">
        <div class="cc-name">${c.name}</div>
        <span class="cc-status ${c.status==='active'?'cs-active':c.status==='paused'?'cs-paused':'cs-draft'}">${c.status.toUpperCase()}</span>
        <button class="btn btn-sm" style="margin-left:auto">⚙️ Edit</button>
        <button class="btn btn-sm btn-call">📞 Resume</button>
      </div>
      <div class="cc-stats">
        <div class="cc-stat"><div class="cc-stat-val">${c.leads}</div><div class="cc-stat-label">Total</div></div>
        <div class="cc-stat"><div class="cc-stat-val">${c.called}</div><div class="cc-stat-label">Called</div></div>
        <div class="cc-stat"><div class="cc-stat-val">${c.answered}</div><div class="cc-stat-label">Answered</div></div>
        <div class="cc-stat"><div class="cc-stat-val" style="color:var(--hot)">${c.handoffs}</div><div class="cc-stat-label">Handoffs</div></div>
      </div>
      <div class="cc-bar-wrap"><div class="cc-bar-fill" style="width:${c.bar}%;background:${c.barColor}"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--text3);font-family:var(--font-m)">
        <span>${c.bar}% complete</span><span>Conv. rate: ${c.conv}%</span>
      </div>
    </div>`).join('');
}

let scriptLang='en';
function setScriptLang(l){
  scriptLang=l;
  document.getElementById('lang-en-btn').style.borderColor=l==='en'?'var(--accent)':'';
  document.getElementById('lang-en-btn').style.color=l==='en'?'var(--accent)':'';
  document.getElementById('lang-ar-btn').style.borderColor=l==='ar'?'var(--accent)':'';
  document.getElementById('lang-ar-btn').style.color=l==='ar'?'var(--accent)':'';
  renderScriptLibrary();
}
function renderScriptLibrary(filter='all'){
  const S=scriptLang==='ar'?scriptsAR:scriptsEN;
  const cards=scriptsLibrary.filter(s=>{
    if(filter==='all')return true;
    if(filter==='high')return s.tags.includes('hot');
    if(filter==='medium')return s.tags.includes('mid');
    if(filter==='low')return s.tags.includes('low');
    return s.tags.includes(filter);
  });
  document.getElementById('scripts-list').innerHTML=cards.map(s=>`
    <div class="script-lib-card">
      <div class="slc-head">
        <div class="slc-icon" style="background:${s.tags.includes('hot')?'var(--hot-bg)':s.tags.includes('mid')?'var(--warm-bg)':s.tags.includes('investor')?'var(--purple-bg)':'var(--bg4)'}">${s.icon}</div>
        <div style="flex:1"><div class="slc-name">${s.name}</div><div class="slc-type">${s.type}</div></div>
        <button class="btn btn-sm btn-call" onclick="loadScriptPreview('${s.name}')">▶ Use in Call</button>
        <button class="btn btn-sm">Copy</button>
      </div>
      <div class="slc-preview">${s.preview}</div>
      <div class="slc-tags">${s.tags.map(tag=>`<span class="tag tag-${tag}">${tag.toUpperCase()}</span>`).join('')}</div>
    </div>`).join('');
}
function filterScripts(f,btn){
  document.querySelectorAll('[id^="sf-"]').forEach(b=>{b.className=b.className.replace(' on','')});
  btn.className+=' on';
  renderScriptLibrary(f);
}
function loadScriptPreview(name){
  showView('live',document.querySelector('.nav-item'));
  addToTranscript('system',`📋 Script loaded: ${name}`);
}

function renderObjections(){
  document.getElementById('objections-en').innerHTML=objectionsEN.map(o=>`
    <div class="obj-btn" onclick="useObjectionResponse('${o.response.replace(/'/g,"\\'")}')">
      <div class="ob-trigger">${o.trigger}</div>
      <div class="ob-response">${o.response.substring(0,80)}${o.response.length>80?'...':''}</div>
    </div>`).join('');
  document.getElementById('objections-ar').innerHTML=objectionsAR.map(o=>`
    <div class="obj-btn" style="text-align:right;direction:rtl" onclick="useObjectionResponse('${o.response.replace(/'/g,"\\'")}')">
      <div class="ob-trigger">${o.trigger}</div>
      <div class="ob-response">${o.response.substring(0,80)}${o.response.length>80?'...':''}</div>
    </div>`).join('');
}
function useObjectionResponse(resp){
  showView('live',document.querySelector('.nav-item.active'));
  setTimeout(()=>addToTranscript('agent',resp),400);
}

function renderAnalytics(){
  const outcomes=[
    {label:'Handoff to Agent',n:31,pct:36,color:'var(--hot)'},
    {label:'CTA Accepted',n:24,pct:28,color:'var(--call)'},
    {label:'WA Shortlist Sent',n:19,pct:22,color:'var(--wa)'},
    {label:'Callback Requested',n:8,pct:9,color:'var(--warm)'},
    {label:'Not Interested / DNC',n:5,pct:6,color:'var(--cold)'},
  ];
  document.getElementById('analytics-outcomes').innerHTML=outcomes.map(o=>`
    <div class="stat-row">
      <div class="stat-label">${o.label}</div>
      <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${o.pct}%;background:${o.color}"></div></div>
      <div class="stat-val" style="color:${o.color}">${o.n}</div>
    </div>`).join('');
  const bands=[
    {label:'High (80–100)',n:34,pct:39,color:'var(--hot)'},
    {label:'Medium (50–79)',n:31,pct:36,color:'var(--warm)'},
    {label:'Low (0–49)',n:22,pct:25,color:'var(--cold)'},
  ];
  document.getElementById('analytics-score-dist').innerHTML=bands.map(b=>`
    <div class="stat-row">
      <div class="stat-label">${b.label}</div>
      <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${b.pct}%;background:${b.color}"></div></div>
      <div class="stat-val" style="color:${b.color}">${b.n}</div>
    </div>`).join('');
  const vals=[5,8,4,11,14,9,12,17,7,13,16,10,14,19];
  const max=Math.max(...vals);
  document.getElementById('analytics-daily-chart').innerHTML=vals.map((v,i)=>`
    <div style="flex:1;border-radius:3px 3px 0 0;background:${i===13?'var(--accent)':'var(--bg4)'};height:${Math.round(v/max*100)}%;position:relative;cursor:pointer;transition:opacity .15s" title="${v} calls" onmouseenter="this.style.opacity=.7" onmouseleave="this.style.opacity=1">
    </div>`).join('');
}

function renderCallLog(){
  document.getElementById('call-log-table').innerHTML=callLogData.map(r=>`
    <tr>
      <td style="font-family:var(--font-m);font-size:11px;color:var(--text3)">${r.time}</td>
      <td><span style="font-size:12.5px;font-weight:500;color:var(--text)">${r.name}</span></td>
      <td><span class="qi-score ${scoreClass(r.score)}">${r.score}</span></td>
      <td style="font-size:12px;color:var(--text2)">${r.intent}</td>
      <td><span style="font-size:10px;background:${r.lang==='AR'?'var(--accent-bg)':'var(--bg4)'};color:${r.lang==='AR'?'var(--accent)':'var(--text3)'};padding:1px 6px;border-radius:3px;font-family:var(--font-m)">${r.lang}</span></td>
      <td style="font-family:var(--font-m);font-size:12px;color:${r.duration==='No Answer'?'var(--hot)':'var(--text2)'}">${r.duration}</td>
      <td><span style="font-size:11px;padding:2px 7px;border-radius:4px;font-family:var(--font-m);background:${r.outcome==='Handoff'?'var(--hot-bg)':r.outcome==='CTA Accepted'?'var(--call-bg)':r.outcome==='Not Interested'?'var(--hot-bg)':r.outcome==='WA Sent'?'var(--wa-bg)':'var(--bg4)'};color:${r.outcome==='Handoff'?'var(--hot)':r.outcome==='CTA Accepted'?'var(--call)':r.outcome==='Not Interested'?'var(--hot)':r.outcome==='WA Sent'?'var(--wa)':'var(--text2)'}">${r.outcome}</span></td>
      <td style="font-size:12px;color:var(--text3)">${r.next}</td>
    </tr>`).join('');
}

function renderSettings(){
  document.getElementById('voice-settings-list').innerHTML=`
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Voice Speed</div><input type="range" min="0.8" max="1.5" step="0.05" value="1.0" style="flex:1;accent-color:var(--accent)"><div class="stat-val" style="color:var(--accent)">1.0x</div></div>
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Auto Pause</div><input type="range" min="0.5" max="3" step="0.5" value="1.5" style="flex:1;accent-color:var(--accent)"><div class="stat-val" style="color:var(--accent)">1.5s</div></div>
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Confidence Threshold</div><input type="range" min="50" max="95" step="5" value="75" style="flex:1;accent-color:var(--purple)"><div class="stat-val" style="color:#9b7fff">75%</div></div>
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Default Language</div>
      <div style="flex:1;display:flex;gap:6px">
        <button class="btn btn-sm" style="border-color:var(--accent);color:var(--accent);background:var(--accent-bg)" onclick="selectType(this)">English</button>
        <button class="btn btn-sm" onclick="selectType(this)">العربية</button>
        <button class="btn btn-sm" onclick="selectType(this)">Auto-detect</button>
      </div>
    </div>
    <div class="stat-row"><div class="stat-label">Message fallback</div><div style="flex:1;font-size:12px;color:var(--text3)">Not implemented. No messages are sent by this prototype.</div></div>
    <div class="stat-row" style="margin-top:14px;display:block"><div class="stat-label" style="margin-bottom:6px">Before any real use (not implemented here)</div><ul style="margin:0;padding-inline-start:18px;font-size:12px;color:var(--text2);line-height:1.7"><li>Recorded consent and opt-out handling across channels</li><li>Call-recording disclosure and retention rules for each region</li><li>Telecom and marketing-contact regulations for each market</li><li>Human approval points before any outreach</li><li>Telephony, speech and CRM integrations (none are connected)</li></ul></div>`;
  document.getElementById('routing-settings').innerHTML=`
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">High Intent (80+)</div><div style="flex:1;font-size:12px;color:var(--hot)">Push to viewing / Handoff immediately</div></div>
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Medium (50–79)</div><div style="flex:1;font-size:12px;color:var(--warm)">Qualify → Send shortlist → Book callback</div></div>
    <div class="stat-row" style="margin-bottom:12px"><div class="stat-label">Low (0–49)</div><div style="flex:1;font-size:12px;color:var(--cold)">Soft discovery → Capture WA/email → Nurture</div></div>
    <div class="stat-row"><div class="stat-label">Dial pacing (illustrative)</div><input type="range" min="1" max="5" step="1" value="3" style="flex:1;accent-color:var(--call)"><div class="stat-val" style="color:var(--call)">3/min</div></div>`;
  const vars=['client_name','agent_name','platform_name','ai_score','lead_intent','preferred_language','area_city','property_type','budget_range','timeline','contact_channel','callback_time','lead_source','handoff_required'];
  document.getElementById('system-vars').innerHTML=`<div style="display:flex;gap:8px;flex-wrap:wrap">${vars.map(v=>`<span style="background:var(--bg4);border:1px solid var(--border2);border-radius:5px;padding:4px 10px;font-family:var(--font-m);font-size:11.5px;color:var(--text2)">[${v}]</span>`).join('')}</div>`;
}

function renderNotifications(){
  document.getElementById('notif-list').innerHTML=notifData.map(n=>`
    <div class="notif-item${n.unread?' unread':''}">
      <div class="ni-dot" style="background:${n.color}"></div>
      <div><div class="ni-text">${n.text}</div><div class="ni-time">${n.time}</div></div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════
// LIVE CALL ENGINE
// ══════════════════════════════════════════════════
let callSeconds=154, callInterval, currentScore=87, currentIntent='buyer', isMuted=false;

function buildWaveform(){
  const wf=document.getElementById('waveform');
  wf.innerHTML=Array.from({length:40},(_,i)=>`<div class="wave-bar active" style="--delay:${(Math.random()*0.4+0.2).toFixed(2)}s;height:${Math.floor(Math.random()*20+4)}px"></div>`).join('');
}
function stopWave(){document.querySelectorAll('.wave-bar').forEach(b=>{b.classList.remove('active');b.style.height='4px';})}
function startWave(){buildWaveform();}

function startCallTimer(){
  clearInterval(callInterval);
  callInterval=setInterval(()=>{
    callSeconds++;
    const m=Math.floor(callSeconds/60),s=callSeconds%60;
    document.getElementById('call-timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },1000);
}

const transcriptQueue=[
  {role:'agent',delay:0,text:'Hello, am I speaking with Ahmed?'},
  {role:'client',delay:2200,text:'Yes, speaking. Who is this?'},
  {role:'agent',delay:4400,text:'Hi Ahmed, this is the automated assistant for the leasing team. You enquired about a two-bedroom at Marlow Street Mixed-Use. Is this a good time for a one-minute call?'},
  {role:'client',delay:8000,text:'Yes, sure. Go ahead.'},
  {role:'agent',delay:9500,text:'Thank you. May I ask: is this home for you, or for a family?'},
  {role:'client',delay:13500,text:'For my family. Two bedrooms, and I would need to move in within six weeks.'},
  {role:'agent',delay:15500,text:'Thanks. Do you need parking, and do you have a monthly budget in mind?'},
  {role:'client',delay:19000,text:'One parking space. Around 5,000 a month.'},
  {role:'system',delay:21000,text:'⚡ HANDOFF RULE (sample): specific unit, 6-week move-in → route to a human leasing agent'},
  {role:'agent',delay:22500,text:'Perfect. I would like to connect you with a leasing specialist who can confirm availability and arrange a viewing. Does that work for you?'},
];


let tIdx=0;
function runTranscript(){
  if(tIdx>=transcriptQueue.length)return;
  const msg=transcriptQueue[tIdx++];
  setTimeout(()=>{
    if(msg.role==='agent'){
      setWaveStatus('speaking');
    } else if(msg.role==='client'){
      setWaveStatus('listening');
    }
    addToTranscript(msg.role,msg.text);
    runTranscript();
  },msg.delay);
}
function setWaveStatus(st){
  const el=document.getElementById('wf-status');
  el.className='wf-status '+st;
  el.textContent=st.toUpperCase();
  if(st==='speaking')startWave();
  else stopWave();
}
function addToTranscript(role,text){
  const area=document.getElementById('transcript-area');
  const div=document.createElement('div');
  const now=new Date();
  const ts=`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  if(role==='system'){
    div.className='transcript-bubble system-msg';
    div.textContent=text;
  } else {
    div.className=`transcript-bubble ${role}`;
    div.innerHTML=`<div class="tb-role">${role==='agent'?'🤖 AI Agent':'👤 Client'}</div>${String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).replace(/\n/g,'<br>')}<div class="tb-time">${ts}</div>`;
  }
  area.appendChild(div);
  area.scrollTop=area.scrollHeight;
  if(role==='system'){
    setTimeout(()=>document.getElementById('handoff-alert').style.display='flex',500);
  }
}

// SCRIPT PANEL
let currentChip='hot';
function setScript(score,intent){
  currentScore=score;currentIntent=intent;
  const S=lang==='ar'?scriptsAR:scriptsEN;
  const tier=score>=80?'high':score>=50?'medium':'low';
  const scripts=[
    {label:'OPENING',dot:'var(--call)',text:S.greeting,key:'greeting'},
    {label:tier==='high'?'HIGH INTENT OPENING':tier==='medium'?'MEDIUM INTENT OPENING':'LOW INTENT OPENING',dot:score>=80?'var(--hot)':score>=50?'var(--warm)':'var(--cold)',text:S[`${tier}_open`],key:`${tier}_open`,highlight:true},
    {label:'INTENT BRANCH: '+intent.toUpperCase(),dot:'var(--purple)',text:S[intent]||S.buyer,key:intent},
    {label:'CTA',dot:'var(--call)',text:S[`${tier}_cta`],key:`${tier}_cta`},
    {label:'CLOSING',dot:'var(--text3)',text:S.closing,key:'closing'},
    {label:'IF NO ANSWER',dot:'var(--warm)',text:S.no_answer,key:'no_answer'},
    {label:'HANDOFF TRANSITION',dot:'var(--hot)',text:S.handoff,key:'handoff'},
  ];
  // chips
  const chips=[
    {label:score>=80?'HIGH':score>=50?'MEDIUM':'LOW',cls:score>=80?'hot':score>=50?'mid':'low'},
    {label:intent.toUpperCase(),cls:'intent'},
    {label:lang.toUpperCase(),cls:'intent'},
  ];
  document.getElementById('script-route-chips').innerHTML=chips.map(c=>`<span class="route-chip ${c.cls}">${c.label}</span>`).join('');
  document.getElementById('script-body').innerHTML=scripts.map(s=>`
    <div class="script-block${s.highlight?' highlight':''}">
      <div class="sb-label">
        <div class="sb-label-dot" style="background:${s.dot}"></div>
        ${s.label}
      </div>
      <div class="sb-text" dir="${lang==='ar'?'rtl':'ltr'}">${(s.text||'').replace(/\n/g,'<br>')}</div>
      <button class="btn btn-xs sb-use-btn" onclick="useScript('${s.key}')">▶ Use this line</button>
    </div>`).join('');
}
function useScript(key){
  const S=lang==='ar'?scriptsAR:scriptsEN;
  if(S[key]){addToTranscript('agent',S[key].replace(/<[^>]*>/g,'').substring(0,200)+'...');}
}

function renderQuickActions(){
  const actions=[
    {label:'📋 Send Shortlist',fn:'sendShortlist()'},
    {label:'📅 Book Viewing',fn:'bookViewing()'},
    {label:'📞 Request Callback',fn:'scheduleCallback()'},
    {label:'💬 Switch to WhatsApp',fn:'switchToWA()'},
    {label:'👤 Human Handoff',fn:'triggerHandoff()'},
    {label:'🔇 Voicemail Drop',fn:'dropVoicemail()'},
  ];
  document.getElementById('quick-actions').innerHTML=actions.map(a=>`<button class="btn btn-sm" onclick="${a.fn}">${a.label}</button>`).join('');
  const objQuick=['Busy','Details Only','Not Interested','Comparing','Has Agent'];
  document.getElementById('objection-quick').innerHTML=objQuick.map(o=>`<button class="btn btn-sm btn-xs" style="background:var(--bg4);border-color:var(--border2)" onclick="handleObj('${o}')">${o}</button>`).join('');
}
function sendShortlist(){addToTranscript('agent','Certainly. Would you prefer to receive properties by WhatsApp or email?');}
function bookViewing(){addToTranscript('agent','Perfect. May I confirm your preferred day for the viewing: today, tomorrow, or this weekend?');}
function scheduleCallback(){addToTranscript('agent','Of course. May I confirm the best time for a callback — morning, afternoon, or evening?');}
function switchToWA(){addToTranscript('system','📲 (simulated) A real build would offer a message channel here. No message is sent.');}
function dropVoicemail(){addToTranscript('system','📬 (simulated) No voicemail is left and no message is sent.');}
function handleObj(type){
  const responses={
    'Busy':'Of course, I understand. May I arrange a callback at a time that suits you better?',
    'Details Only':'Certainly. Would you prefer to receive them by WhatsApp or email?',
    'Not Interested':"Understood. Thank you for your time. If your plans change in the future, we'll be happy to assist you.",
    'Comparing':"That makes perfect sense. We can help by sending a small selection of properties in different price ranges so you can compare more easily.",
    'Has Agent':"Understood. If you ever need additional market options or a second opinion, we'd be happy to help.",
  };
  if(responses[type])addToTranscript('agent',responses[type]);
}
function triggerHandoff(){
  document.getElementById('handoff-alert').style.display='flex';
  addToTranscript('system','🚨 HANDOFF (simulated) — in a real build this would alert a human leasing agent');
}
function confirmHandoff(){
  document.getElementById('handoff-alert').style.display='none';
  addToTranscript('system','✅ Handoff confirmed (simulated) — nobody was notified and no data was transferred');
}
function toggleMute(){
  isMuted=!isMuted;
  document.getElementById('mute-btn').textContent=isMuted?'🔊':'🔇';
  setWaveStatus(isMuted?'silent':'speaking');
}
function endCurrentCall(){
  clearInterval(callInterval);
  stopWave();
  setWaveStatus('silent');
  addToTranscript('system','📵 Simulated call ended — timer shows '+document.getElementById('call-timer').textContent);
}

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════
const pageTitles={live:'page-title-live',queue:'page-title-queue',campaigns:'page-title-campaigns',scripts:'page-title-scripts',objections:'page-title-objections',analytics:'page-title-analytics',calllog:'page-title-calllog',settings:'page-title-settings',notifications:'page-title-notifications'};

function showView(id,el){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const view=document.getElementById('view-'+id);
  if(view)view.classList.add('active');
  if(el&&el.classList)el.classList.add('active');
  const titleKey=pageTitles[id];
  if(titleKey)document.getElementById('page-title').textContent=t(titleKey);
  // lazy renders
  if(id==='queue')renderFullQueue();
  if(id==='campaigns')renderCampaigns();
  if(id==='scripts'){renderScriptLibrary();setScriptLang(scriptLang);}
  if(id==='objections')renderObjections();
  if(id==='analytics')renderAnalytics();
  if(id==='calllog')renderCallLog();
  if(id==='settings')renderSettings();
  if(id==='notifications')renderNotifications();
}

function selectQueueItem(id){
  const q=queueData.find(x=>x.id===id);if(!q)return;
  document.getElementById('call-name').textContent=q.name;
  document.getElementById('call-meta').textContent=`${q.phone} · ${q.area}`;
  const al=document.getElementById('call-asset-link');if(al){if(q.assetId){al.href=PORTFOLIO_BASE+'#/assets/'+q.assetId;al.hidden=false}else al.hidden=true}
  document.getElementById('call-avatar').textContent=q.initials;
  document.getElementById('score-fill').style.width=q.score+'%';
  document.getElementById('score-fill').style.background=q.score>=80?'var(--hot)':q.score>=50?'var(--warm)':'var(--cold)';
  document.getElementById('score-num').textContent=q.score;
  document.getElementById('score-num').className='score-num '+(q.score>=80?'score-hot':q.score>=50?'score-mid':'score-low');
  document.getElementById('score-tier').textContent=scoreTierLabel(q.score);
  document.getElementById('score-tier').className='qi-score '+scoreClass(q.score);
  document.getElementById('intent-tag').textContent=`${q.intent} · ${q.lang}`;
  document.getElementById('call-source').textContent=`${q.area}`;
  currentScore=q.score;currentIntent=q.intent.toLowerCase();
  setScript(q.score,q.intent.toLowerCase());
  renderQueueList();
}
function dialLead(id){selectQueueItem(id);showView('live',document.querySelector('.nav-item'));}
function dialNext(){const waiting=queueData.find(q=>q.status==='waiting');if(waiting)selectQueueItem(waiting.id);}

// MODALS
function showNewCallModal(){document.getElementById('new-call-modal').classList.add('open')}
function showEndCallModal(){endCurrentCall()}
function closeModal(id){document.getElementById(id).classList.remove('open')}
document.querySelectorAll('.modal-overlay').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')})});
function selectScore(btn,score){
  btn.parentElement.querySelectorAll('.btn').forEach(b=>{b.style.borderColor='';b.style.color='';b.style.background=''});
  btn.style.borderColor=score>=80?'var(--hot)':score>=50?'var(--warm)':'var(--cold)';
  btn.style.color=score>=80?'var(--hot)':score>=50?'var(--warm)':'var(--cold)';
  btn.style.background=score>=80?'var(--hot-bg)':score>=50?'var(--warm-bg)':'var(--cold-bg)';
}
function selectType(btn){
  btn.parentElement.querySelectorAll('.btn').forEach(b=>{b.style.borderColor='';b.style.color='';b.style.background=''});
  btn.style.borderColor='var(--accent)33';btn.style.color='var(--accent)';btn.style.background='var(--accent-bg)';
}
function startNewCall(){
  const name=document.getElementById('new-lead-name').value||'New Lead';
  closeModal('new-call-modal');
  document.getElementById('call-name').textContent=name;
  document.getElementById('transcript-area').innerHTML='';
  addToTranscript('system',`📞 Simulated call with ${name}. No call is placed.`);
  addToTranscript('agent','Hello, am I speaking with '+name+'?');
  setWaveStatus('speaking');
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
renderQueueList();
buildWaveform();
startCallTimer();
selectQueueItem(1); // header, score and script come from the sample queue, not hard-coded markup
renderQuickActions();
// Start transcript simulation
setTimeout(runTranscript,1200);
