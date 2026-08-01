---
layout: ../../layouts/MarkdownLayout.astro
title: Why Small Language Models Might Be the Future | Likith Shetty
description: The case for small language models — cheaper inference, on-device deployment, easier specialisation, manageable compliance, and the agentic architectures they unlock.
---

# Why Small Language Models Might Be the Future

Over the past few years, the world of artificial intelligence has been captivated by a singular pursuit — making language models as large as humanly (and computationally) possible. GPT-4, Gemini, Claude, LLaMA — each new release seems to come with a bigger parameter count, a larger training dataset, and an ever-growing appetite for compute. The implicit assumption driving this race has been clear: scale is the path to intelligence.

But quietly, a counter-narrative has been building. Researchers, startups, and even the companies building the biggest models have started investing serious effort into small language models (SLMs) — models with a fraction of the parameters, a fraction of the cost, and, increasingly, a surprising fraction of the capability. And as the AI landscape matures beyond the initial wave of excitement, there are compelling reasons to believe that these smaller models might define the next chapter of AI more than their colossal counterparts ever could.

## The Problem with Going Big

To understand why small models matter, it helps to understand the costs of going big.

Training a frontier large language model (LLM) is staggeringly expensive. We are talking about hundreds of millions of dollars in compute costs, months of training on thousands of GPUs, and electricity bills that rival those of small cities. Running these models in production — inference — is not cheap either. Every time a user sends a prompt to a state-of-the-art model, it requires significant server resources, which translates directly into cost per query.

This creates a bottleneck. Only a handful of companies on the planet have the capital and infrastructure to train and serve these models. That concentration of power raises questions about access, equity, and sustainability. If AI is going to transform every industry, every workflow, and every corner of the global economy, it cannot remain the exclusive province of five or six tech giants operating massive data centers.

There is also the environmental cost. The energy required to train and run large models is enormous. As the world becomes more conscious of carbon footprints and sustainability, building ever-larger models starts to look less like progress and more like a problem.

And then there is a subtler issue: diminishing returns. While scaling laws have shown that larger models tend to perform better on benchmarks, the gains have started to plateau for many practical tasks. Going from 7 billion to 70 billion parameters might yield only marginal improvement on the specific task a business actually cares about — like classifying customer support tickets or extracting key dates from contracts. You are paying ten times the cost for five percent more accuracy.

## What Are Small Language Models, Exactly?

There is no hard line that separates a “small” model from a “large” one, but generally, small language models fall in the range of 1 billion to around 13 billion parameters. Some push this boundary to 30 billion, but the spirit of the category is clear: these are models designed to be efficient, deployable, and practical rather than maximally capable on every conceivable benchmark.

Notable examples include Microsoft’s Phi series, Meta’s smaller LLaMA variants, Google’s Gemma models, Mistral’s 7B model, and a growing ecosystem of open-source efforts. Many of these models have demonstrated remarkable performance on specific tasks, sometimes rivaling or even matching models ten times their size when fine-tuned appropriately.

The key insight is that raw parameter count is not the only lever for performance. Training data quality, architecture innovations, distillation techniques, and task-specific fine-tuning can all dramatically improve what a small model can do. A well-trained 3-billion-parameter model with high-quality data can outperform a sloppy 70-billion-parameter model on real-world tasks.

## The Case for Small: Five Reasons SLMs Could Define the Future

### 1. They Run Everywhere

Perhaps the most transformative advantage of small models is that they can run on devices that large models simply cannot. A 3B-parameter model can run on a modern smartphone. A 7B model fits comfortably on a laptop with a decent GPU. A 13B model can operate on a single consumer-grade workstation.

This is not a minor technical detail — it is a paradigm shift. When AI can run locally on a user’s device, it eliminates the need for a constant internet connection, removes latency from cloud round-trips, and keeps sensitive data on the device where it belongs. Imagine a doctor in a rural clinic using an AI assistant that runs entirely on a tablet, with no patient data ever leaving the building. Imagine a factory floor where AI-powered quality inspection happens at the edge, in real time, with no dependency on cloud infrastructure.

On-device AI is not a niche use case. It is potentially the dominant deployment pattern for the next decade, and small models are the only ones that make it feasible.

### 2. They Are Dramatically Cheaper

Cost matters. For every flashy demo of a large model composing poetry or passing a bar exam, there are thousands of mundane but critical business applications where the question is not “can AI do this?” but “can we afford for AI to do this at scale?”

Small models slash inference costs by an order of magnitude or more. If you are processing millions of documents, summarizing thousands of customer interactions, or running AI checks on every transaction in a financial system, the difference between a $0.01 query and a $0.001 query is the difference between a viable product and a money pit.

This cost efficiency also democratizes AI. Startups, small businesses, nonprofits, and developers in emerging markets can build and deploy AI-powered applications without needing deep-pocketed cloud computing contracts. The barrier to entry drops from “raise a Series B” to “spin up a modest server.”

### 3. They Are Easier to Specialize

General-purpose intelligence is impressive, but most real-world applications do not need a model that can do everything. They need a model that does one thing exceptionally well.

Small models are far easier to fine-tune for specific domains and tasks. The compute required to fine-tune a 7B model on your company’s proprietary data is a tiny fraction of what it would take to fine-tune a 70B model. Techniques like LoRA (Low-Rank Adaptation) and QLoRA have made this even more accessible, allowing teams to customize models with minimal hardware.

This has profound implications. A legal tech company can take a small base model, fine-tune it on millions of legal documents, and end up with a model that understands legal language better than any general-purpose giant — at a fraction of the cost. A healthcare startup can do the same with clinical notes. A manufacturing firm can train a small model to understand its specific quality control vocabulary.

The future of AI is not one model to rule them all. It is an ecosystem of specialized small models, each deeply attuned to its domain.

### 4. Privacy and Compliance Become Manageable

Data privacy is one of the biggest obstacles to enterprise AI adoption. Many organizations — in healthcare, finance, government, and legal — operate under strict regulations about where data can go and who can see it. Sending sensitive data to a third-party cloud API is often a non-starter, regardless of how good the model on the other end might be.

Small models solve this problem by making local and on-premise deployment practical. When the model runs within your own infrastructure, your data never leaves your control. Compliance becomes dramatically simpler. Security audits are more straightforward. The entire risk profile changes.

This is not hypothetical. Many enterprises today are choosing smaller, self-hosted models over more capable cloud-based alternatives precisely because of data governance requirements. As regulations tighten globally — think the EU AI Act, evolving HIPAA interpretations, and data sovereignty laws — this advantage will only grow.

### 5. They Enable a New Architecture: Agentic AI and Model Composition

One of the most exciting developments in AI is the move toward agentic systems — AI architectures where multiple models collaborate, each handling a different part of a complex task. An orchestrator model might break a problem into subtasks, route each subtask to a specialized model, and synthesize the results.

In this architecture, you do not need every model to be a frontier giant. You need models that are fast, efficient, and excellent at their specific job. A small model that is great at code generation works alongside another small model that excels at data extraction, coordinated by a lightweight routing model. The system as a whole can match or exceed the performance of a single monolithic model, while being more flexible, cheaper, and easier to maintain.

This composable, modular approach mirrors how complex software systems have always been built — not as one massive monolith, but as a collection of specialized, interoperable components. Small models are the microservices of the AI world.

## The Counterarguments — and Why They Are Weakening

Skeptics of the small model thesis raise valid points. Large models have emergent capabilities that smaller models lack — the ability to reason across long contexts, handle ambiguous instructions, and generalize across wildly different tasks. For open-ended, creative, or highly complex work, large models still hold a clear advantage.

But this argument is weakening for three reasons.

First, the techniques for compressing large model capabilities into smaller architectures are improving rapidly. Distillation, quantization, pruning, and architectural innovations are closing the gap faster than many expected.

Second, the bar for “good enough” in most applications is lower than people think. Businesses do not need a model that scores 95 on a benchmark if a model that scores 88 costs one-tenth as much and runs locally. Perfect is the enemy of deployed.

Third, the infrastructure around small models — fine-tuning tools, deployment frameworks, hardware optimization — is maturing quickly. What was difficult a year ago is routine today. The ecosystem is catching up.

## Looking Ahead

The AI industry is entering a new phase. The initial gold rush of scaling — where progress was measured in parameter counts and benchmark scores — is giving way to a more nuanced era where efficiency, accessibility, and practical deployment matter as much as raw capability.

Small language models sit at the center of this transition. They are the models that will run on your phone, power your company’s internal tools, operate in hospitals and courtrooms and factories, and form the building blocks of the agentic AI systems that will define the next generation of software.

This is not to say that large models will disappear. They will continue to push the frontier of what is possible, serving as the research labs and general-purpose engines for tasks that truly demand their scale. But the workhorse of everyday AI — the model that quietly transforms how billions of people work, learn, and create — will very likely be small.

The biggest impact of AI will not come from the biggest models. It will come from the models that actually get deployed.

---

Originally published on [Medium](https://medium.com/@shettylikith.rajesh/why-small-language-models-might-be-the-future-c714fcea4548).
