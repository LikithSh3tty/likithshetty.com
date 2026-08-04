---
layout: ../../layouts/MarkdownLayout.astro
title: DriftBell — an ML drift watchman that asks before it acts | Likith Shetty
description: A model-drift agent that investigates why accuracy slid, then freezes mid-execution and waits for a human. LangGraph checkpoints to SQLite, n8n owns every irreversible action.
schema:
  '@context': https://schema.org
  '@type': SoftwareSourceCode
  name: DriftBell
  description: An ML drift watchman that investigates before it acts, and asks you first. A LangGraph agent diagnoses model drift, freezes at a human approval gate, and resumes from disk by thread_id.
  codeRepository: https://github.com/LikithSh3tty/DriftBell
  url: https://likithshetty.com/open-source/driftbell/
  programmingLanguage:
    - Python
    - JavaScript
  runtimePlatform: Docker
  license: https://opensource.org/licenses/MIT
  author:
    '@type': Person
    name: Likith Shetty
    url: https://likithshetty.com
  keywords: MLOps, model drift detection, LangGraph, n8n, human-in-the-loop, population stability index, champion challenger, MCP
---

# DriftBell

**An ML drift watchman that investigates before it acts, and asks you first.**

[Repository](https://github.com/LikithSh3tty/DriftBell) ·
[Demonstration](https://driftbell.vercel.app) ·
[More projects](/open-source/)

Production models fail quietly. The data shifts, accuracy slides, and nobody
notices for weeks. DriftBell watches for that shift, works out *why* it
happened, and rings your phone before anything changes.

## The interesting problem isn't the drift maths

Population Stability Index and a two-sample Kolmogorov–Smirnov statistic are
undergraduate statistics. The hard part is the pause.

Retraining a production model is a decision somebody should sign off on. But a
human takes hours to answer, and most automation can't wait that long without
either blocking a worker or forgetting what it was doing. So the usual outcome
is that the approval step gets dropped, and the system either retrains
unsupervised or pages someone who has to redo the analysis by hand.

DriftBell freezes the agent mid-execution, writes its entire reasoning state to
disk, and picks up exactly where it stopped when you tap **Approve** — even if
the process died in between.

```
drift detected → agent investigates → proposal → 🔔 you approve → retrain → promote
     n8n              LangGraph        LangGraph       n8n           n8n       n8n
```

## Two layers, deliberately

A canvas can't loop, and an agent shouldn't hold your credentials.

**n8n** owns the macro plane: schedules, integrations, the audit trail, and the
approval you tap on your phone. **LangGraph** owns the micro plane: cycles,
conditional edges, self-critique, and checkpointed state.

Every irreversible action lives in n8n. The agent only ever proposes. Even the
champion-versus-challenger comparison happens on the canvas rather than inside
the agent — so the thing that decides whether a model gets promoted is not the
thing that wanted it promoted.

## How a process hands off to a process that doesn't exist yet

`human_gate` calls LangGraph's `interrupt()`, which raises out of the graph
entirely. By that point the checkpointer has already written every message,
every tool result and the proposal to SQLite against a `thread_id`. On the n8n
side, a Telegram `sendAndWait` node parks the execution — not polling, not
looping, just stopped — until a button is tapped. Whichever branch that
produces calls `POST /resume` with the same `thread_id`.

Neither side knows how long the other took. And the process holding that state
can die:

```
process A paused: awaiting_approval
--- process A exited, memory gone ---
process B sees: ['human_gate']
process B resumes: {'status': 'approved', 'action': 'RETRAIN', ...}
```

There's a test for exactly this. It runs a graph to the gate, drops every
reference to it, constructs a brand-new graph and checkpointer against the same
file, and resumes. It passes because nothing is held in the Python object — the
only channel between the two graphs is the file on disk.

## It argues with itself before it commits

`reason` may emit tool calls, routing back through `tools` and around again
against real run history, feature statistics, the model registry and past
incidents. Then `critique` asks the model whether its own evidence is
sufficient, looping back up to `MAX_ITERATIONS` times before forcing a verdict
of RETRAIN, IGNORE or ESCALATE.

A verdict of IGNORE skips the gate entirely. Nobody gets paged for a non-action
— which is what makes the pages that *do* arrive worth reading.

## Yesterday's outage makes today's diagnosis more sceptical

Any workflow failure classifies itself, alerts Telegram, and records an
incident. The agent's system prompt tells it that a drift alert coinciding with
an ingestion incident is usually a bug rather than genuine drift, and
`get_pipeline_incidents` is one of its four tools.

So a pipeline failure today makes tomorrow's diagnosis more cautious. That loop
— operational failure feeding back into analytical judgement — is the part I'd
keep if I rebuilt it.

## What the hosted page actually is

[driftbell.vercel.app](https://driftbell.vercel.app) is a **demonstration, not
a hosted service.** Nothing runs behind it, deliberately: there is no backend
deployed there that could hold a credential.

The page is drawn as a chart recorder's sheet. Pale marks are the pre-printed
form — every node of the graph, printed before anything ran. The ink is the
pen's own record, drawn only where the run actually reached. It stops at
`human_gate` with blank paper below it, because nothing has happened there yet.

The events are the agent's real ones, captured by driving the actual graph;
only the pacing between them is added. And one of the tests re-runs the graph
and asserts the recording still walks the same path — so a change to the agent
can't quietly leave the demo showing a run that no longer happens.

Point it at a reachable agent and the same page drives it for real.

## Also in there

- **MCP server** — Claude Desktop or any MCP client can read model status and
  trigger a retrain through the same workflow a human approval triggers.
  Bearer-authenticated.
- **A chatbot that answers from the agent's own reasoning**, fusing exact
  numbers from a query with rationales from a vector store. Ask *"why was
  churn_clf retrained?"* and it quotes what the agent actually concluded.
- **Drift maths in plain JavaScript** inside the n8n Code node — no numpy, no
  scipy, nothing to install in the automation layer.
- **69 tests, all offline.** `LLM_PROVIDER=stub` is a scripted model that walks
  every edge including both cycles, so the suite needs no API key and no
  network.

## What it costs

Nothing. LangGraph, FastAPI, n8n and SQLite are open source, the LLM runs on a
free tier or locally, and the agent runs on your own machine.

## What's wrong with it

Found by using it, not imagined while designing it.

A retrain incorporates no new information — fixed seeds mean every challenger is
the same model on the same data, so `v13` and `v14` match to four decimals.
Determinism made the promotion decision testable; this is the bill for that.
Promotion also gates on F1 alone: going v12 → v14 raised F1 from 0.781 to 0.835
but dropped accuracy from 0.842 to 0.757, and the gate makes that trade without
recording it.

The error handler structurally cannot report the agent's own death, since
incidents live in the agent's database. And the Cloudflare quick tunnel is the
most fragile part — ours expired after about fourteen hours and took Telegram
approvals and MCP with it, silently.

[Full write-up, workflows and limitations in the repository.](https://github.com/LikithSh3tty/DriftBell)
