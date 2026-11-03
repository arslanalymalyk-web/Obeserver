# Graph Report - Obeserver  (2026-11-03)

## Corpus Check
- Corpus is ~25,116 words - fits in a single context window. You may not need a graph.

## Summary
- 200 nodes · 266 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `showView()` - 33 edges
2. `showView()` - 19 edges
3. `sendCopilot()` - 11 edges
4. `addToTranscript()` - 10 edges
5. `Observer AI Voice Agent (single-file mockup)` - 9 edges
6. `Ponytail Help` - 8 edges
7. `sendCopilotSpoken()` - 8 edges
8. `AIEngine.scoreLead()` - 8 edges
9. `calcAll()` - 7 edges
10. `tryVoiceCommand()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `renderNBA()` --conceptually_related_to--> `COPILOT_SYSTEM prompt`  [AMBIGUOUS]
  observer-re-platform-v10.html → observer-re-platform-v10.html  _Bridges community 2 → community 3_
- `getCalcAIAnalysis()` --shares_data_with--> `calcAll()`  [INFERRED]
  observer-re-platform-v10.html → observer-re-platform-v10.html  _Bridges community 7 → community 2_
- `scriptsLibrary` --conceptually_related_to--> `scriptsEN (English script set)`  [INFERRED]
  observer-voice-agent.html → observer-voice-agent.html  _Bridges community 5 → community 1_
- `Handoff-to-human logic` --conceptually_related_to--> `triggerHandoff()`  [INFERRED]
  observer-voice-agent.html → observer-voice-agent.html  _Bridges community 4 → community 5_
- `showView()` --references--> `Pipeline view`  [EXTRACTED]
  observer-re-platform-v10.html → observer-re-platform-v10.html  _Bridges community 3 → community 0_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Human handoff flow** — observer_voice_agent_handoff_logic, observer_voice_agent_triggerhandoff, observer_voice_agent_confirmhandoff, observer_voice_agent_handoffalert, observer_voice_agent_transcriptqueue [EXTRACTED 0.85]
- **AIEngine scoring, intent, NBA and orchestration** — observer_re_platform_v10_scorelead, observer_re_platform_v10_extractintent, observer_re_platform_v10_rankactions, observer_re_platform_v10_orchestration [EXTRACTED 0.95]
- **Voice command to Claude reply flow** — observer_re_platform_v10_togglevoiceinput, observer_re_platform_v10_handlevoiceresult, observer_re_platform_v10_tryvoicecommand, observer_re_platform_v10_sendcopilotspoken, observer_re_platform_v10_speak [EXTRACTED 0.95]
- **Live call simulation engine** — observer_voice_agent_runtranscript, observer_voice_agent_addtotranscript, observer_voice_agent_waveform, observer_voice_agent_calltimer [INFERRED 0.85]
- **Payment plan calculator with Claude analysis** — observer_re_platform_v10_selectplan, observer_re_platform_v10_calcall, observer_re_platform_v10_plan_comparison, observer_re_platform_v10_getcalcaianalysis, observer_re_platform_v10_api_claude [INFERRED 0.85]
- **Score-driven script routing** — observer_voice_agent_score_routing, observer_voice_agent_setscript, observer_voice_agent_scriptsen, observer_voice_agent_scriptsar, observer_voice_agent_intent_branch [INFERRED 0.85]

## Communities (17 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (35): agents dataset, applyLang(), callTranscript / callWhisper / callObjections datasets, channelROI dataset, complianceItems + auditLog, followUpTemplates dataset, Live simulation setIntervals, nextWhisper() / endCallDemo() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (26): Call Analytics view, Observer AI Voice Agent (single-file mockup), callLogData, Call Log view, campaigns dataset, Campaigns view, dialLead()/dialNext(), Live Call Center view (+18 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (22): /api/claude proxy endpoint, Claude model claude-sonnet-5-5, copilotHistory conversation state, Copilot [bracket] nav action tokens, AI Copilot panel (FAB + chat), COPILOT_SYSTEM prompt, esc(), getCalcAIAnalysis() (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (21): avatarHTML(), budgetTier(), explainScore(), Lead scoring feature, leads dataset, openLead(), Pipeline stage probabilities, PROPERTY_LIBRARY + listingFor() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (17): addToTranscript(), confirmHandoff(), endCurrentCall(), handleObj() objection quick handlers, Handoff alert banner, objectionsAR, objectionsEN, renderQuickActions() quick actions (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.24
Nodes (11): applyLang()/toggleLang() RTL switch, Bilingual EN/AR support, Handoff-to-human logic, Intent branches (buyer/investor/tenant), renderSettings(), Score routing tiers (80+/50-79/0-49), scriptsAR (Arabic script set), scriptsEN (English script set) (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (10): AIEngine module, AIEngine.extractIntent(), intentLeads message threads, JOURNEYS per-lead cascade state, Multi-channel orchestration cascade, ORCHESTRATION speed-to-lead cascade, renderIntentGrid(), renderOrchestration() (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (9): calcAll(), Dubai fee model (4% DLD, 2% agency), EMI amortization formula, gccDevelopers dataset, loadDevInCalc(), Plan comparison table (best ROI), renderGCCDevelopers() / filterGCC(), GCC Developers view (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (8): Band (Claude Code), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (3): fs, http, path

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (4): 1. Map first, 2. Look for, 3. Check before you report, 4. Output

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (4): 1. Understand first, 2. Look for, 3. Check before you report, 4. Output

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (4): Before you write, Levels, Ponytail, The smallest complete change

### Community 14 - "Community 14"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

## Ambiguous Edges - Review These
- `COPILOT_SYSTEM prompt` → `renderNBA()`  [AMBIGUOUS]
  observer-re-platform-v10.html · relation: conceptually_related_to

## Knowledge Gaps
- **33 isolated node(s):** `Dashboard view`, `All Leads view`, `Intent Detection view`, `Next Best Action view`, `Live Call Assistant view` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 74 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `showView()` connect `Community 0` to `Community 2`, `Community 3`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `sendCopilot()` (e.g. with `speak()` and `sendCopilotSpoken()`) actually correct?**
  _`sendCopilot()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Dashboard view`, `All Leads view`, `Intent Detection view` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06218487394957983 - nodes in this community are weakly interconnected._
- **Why does `sendCopilot()` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1168091168091168 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `COPILOT_SYSTEM prompt` and `renderNBA()`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._