// Voice-agent prompt + Claude call. The prompt lives server-side so a browser cannot change it or forge history.
const LANG_NAME = { en: 'English', ar: 'Arabic (Gulf-friendly Modern Standard Arabic, written in Arabic script)' };

function systemPrompt({ agency, lang, lead }) {
  const ctx = lead
    ? `What the agency already knows about this lead: type ${lead.type}, budget ${lead.budget || 'unknown'}, area ${lead.area || 'unknown'}, timeframe ${lead.timeframe || 'unknown'}, financing ${lead.financing || 'unknown'}, source ${lead.source || 'unknown'}.`
    : 'You have no prior information about this lead.';
  return `You are the voice assistant for ${agency}, a real-estate agency in the UAE, on a phone call with a lead.
Speak ${LANG_NAME[lang]} by default, but if the client switches to English or Arabic, follow them.
This is spoken aloud: reply in 1-3 short sentences, plain words, no markdown, no lists, no emojis.
Goal: be warm, find out what they want (buy, sell or rent; budget; area; timeline; cash or mortgage) one question at a time, then offer to book a viewing or a call with a human agent.
${ctx}
Rules: say you are an AI assistant if asked. Never invent listings, prices, availability or promises; if you do not know, offer a human agent. If the client asks to stop being called or to speak to a person, agree politely and end the topic. Do not ask for card numbers, passwords or ID numbers.`;
}

async function askClaude({ system, messages }) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw Object.assign(new Error('ANTHROPIC_API_KEY not configured'), { code: 503 });
  const r = await fetch(process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    // Model and max_tokens are fixed here so a browser caller cannot raise cost.
    body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 300, system, messages }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error('the AI service is unavailable right now'), { code: 502 });
  const text = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
  if (!text) throw Object.assign(new Error('empty reply from the AI service'), { code: 502 });
  return text;
}
module.exports = { systemPrompt, askClaude };
