---
layout: ../../layouts/MarkdownLayout.astro
title: InVision — indoor navigation from a photo of a shopfront | Likith Shetty
description: Indoor positioning without beacons or wifi surveys. CLIP visual retrieval fused with OCR signage text places you among 104 mall units, then a graph routes you across floors with exact multi-stop ordering.
schema:
  '@context': https://schema.org
  '@type': SoftwareSourceCode
  name: InVision
  description: Indoor mall navigation from a photograph of a shopfront. CLIP visual retrieval fused with OCR signage text locates the shopper among 104 directory units, then a 268-node graph routes across floors with turn-by-turn directions and exact multi-stop ordering.
  codeRepository: https://github.com/LikithSh3tty/Indoor-Mall-Navigation
  url: https://likithshetty.com/open-source/invision/
  programmingLanguage: Python
  license: https://opensource.org/licenses/MIT
  author:
    '@type': Person
    name: Likith Shetty
    url: https://likithshetty.com
  keywords: indoor positioning, visual place recognition, CLIP, OCR, image retrieval, wayfinding, Dijkstra, Held-Karp, multimodal fusion, RapidOCR
---

# InVision

**Indoor mall navigation from a photograph of a shopfront.**

[Repository](https://github.com/LikithSh3tty/Indoor-Mall-Navigation) ·
[More projects](/open-source/)

Indoor positioning is the awkward gap in navigation. GPS stops at the door, and
every alternative wants infrastructure: beacons bolted to ceilings, wifi
fingerprints resurveyed every time a shop refits, a floor plan nobody has in a
machine-readable form.

But a shopping mall already carries a dense, maintained, human-readable position
signal on every wall. It's called signage.

Photograph any shopfront, and InVision works out which unit of the directory
you're standing at, then routes you from there to wherever you want to go,
across floors and escalators.

```
photo → CLIP embedding ─┐
                        ├─→ fused score → unit id → graph route → directions
photo → OCR signage ────┘
```

## Why one signal isn't enough

Visual similarity alone confuses the many storefronts that are glass, white, and
lit identically. Signage text alone fails whenever a logo mark eats the first
letter, or a survey shot frames two shops at once.

So both channels run, and get fused per unit at **0.7 visual to 0.3 text**.

The visual channel embeds the query with `openai/clip-vit-base-patch32` and takes
each unit's *best* cosine similarity across its gallery — so a unit photographed
once isn't penalised against one photographed fourteen times.

The text channel is the part I'd point at. RapidOCR returns tokens with bounding
boxes, and tokens get ranked **by text height**, on the reasoning that the
tallest lettering on a shopfront is the brand name. Matching against unit names
and aliases is deliberately tolerant of the character clipping OCR introduces: a
substring match on words of four letters or more, or a sequence ratio of at least
0.82.

## Knowing when not to answer

Signage scoring above 0.42 decides the answer outright, overriding the visual
channel — a legible brand name is stronger evidence than any amount of
glass-and-white similarity.

That override is **withheld** when a second unit scores within 0.02 of it. That
case is the survey shot framing two shopfronts at once, and answering
confidently there would be answering the wrong question. It comes back as a close
call with the alternatives offered.

The same applies to fusion generally: a result is confident when the margin over
the runner-up is at least 0.03. Anything tighter is reported as unsure rather
than guessed.

Every threshold named above is a constant at the top of the module, not a number
buried inside an expression.

## What the ablation actually shows

Measured on the held-out split — 55 images over 83 recognisable units, with all
104 directory units as candidates:

| Configuration | top-1 | top-3 | top-5 | correct floor |
|---|---|---|---|---|
| Visual only (CLIP) | 58.2% | 74.5% | 80.0% | 83.6% |
| Text only (OCR) | 58.2% | 63.6% | 65.5% | 74.5% |
| Fusion 0.5 / 0.5 | 60.0% | 72.7% | 76.4% | 78.2% |
| **Fusion 0.7 / 0.3** | **67.3%** | **80.0%** | **87.3%** | **87.3%** |
| Fusion 0.85 / 0.15 | 65.5% | 80.0% | 83.6% | 89.1% |

**These numbers are optimistic, and the evaluation script says so before it
prints them.** Every held-out image was captured seconds from its own gallery
images, at nearly the same angle and under the same lighting. An honest figure
needs photographs taken on a different day, in different light, through the crowd
a real shopper photographs through.

So the finding here is the ablation, not the absolute accuracy: the text channel
is worth **nine points of top-1** and seven of correct-floor, and it earns most of
that exactly where the visual channel is weakest.

## Routing

The graph is built from the printed directory, not from the photographs — 268
nodes covering shopfront units, walkway points, gates and escalator banks on
every level. Dijkstra over walking-equivalent metres produces turn-by-turn
directions with landmarks and floor changes.

A consequence worth noting: a unit with photographs can be *recognised*, but a
unit without can still be *routed to*. Coverage of the directory and coverage of
the gallery are separate problems.

Give it up to eight stops and it solves the visiting order exactly with
Held-Karp, which on a two-row floor plan regularly beats nearest-next by a
comfortable margin. Each floor on the route renders as an SVG of the real layout
with the walk drawn on it.

It also holds position between routes, so walking to one shop and then thinking
of another doesn't need a second photograph — and every position records *how* it
was learned: recognised, declared, assumed after a route, or carried over. Shoot
a second shopfront mid-walk and it judges that sighting against the planned line:
on route with distance remaining, or off route with a fresh plan from where you
actually are.

Directions are read aloud, because a shopper walking a corridor isn't looking at
a screen.

## Why the photographs aren't in the repository

The images were captured with the **written permission of mall management**, and
that permission is precisely why they aren't distributed.

Photographing shopfronts inside a private building isn't something you may simply
do. A letter went to the management office first, setting out what the project
was, what would be photographed, that no shoppers or staff were the subject, and
how the images would be used. Permission was granted on that basis, for that use.

Three reasons that constrains what ships:

- **The building is real, identifiable and occupied.** A complete photographic
  index of every shopfront on every floor, aligned to a floor plan and
  searchable, is exactly the artefact a security team would prefer didn't exist
  publicly. The routing graph makes it more useful still — which is the point of
  the project, and also the problem.
- **Incidental capture is unavoidable.** Corridor walks catch reflections,
  shoppers in the background, staff at counters. Nobody in those frames consented
  to publication, and none were the subject.
- **Permission was for a project, not for redistribution.** Publishing the set
  would exceed what was asked for and granted, whatever licence sits on the code.

So the repository ships derived artefacts instead: CLIP embeddings, gallery and
query indexes, OCR output, the directory and routing graph. Not the 732 MB of raw
corridor frames, not the curated images, not any frame containing a person.

The embeddings are 512-dimensional float vectors — enough to run and evaluate the
localiser, which is why everything in the repository works with no photograph
present, and not enough to reconstruct what they came from.

## The labels didn't exist either

The source photographs carry no labels. Six corridor walks, one burst per
storefront, nothing but a folder name and a timestamp. Store identity was
*recovered*, not recorded: segment each walk into runs of consecutive frames
showing the same shopfront via CLIP similarity, name each run from the tallest
signage text in its frames, then align the recovered stores against the printed
directory, which is the authority on what exists and where.

Anything ambiguous gets flagged rather than guessed — a single image, no legible
name, or a brand appearing on two corridors — and `/review` is a small interface
for stepping through frames in walk order and fixing the assignment.

The failure modes are in the dataset card rather than smoothed away: leading
characters absorbed by a logo mark (`ESTSIDE` for Westside, `DASICS` for Asics),
visually similar food-court stalls merged, generic facade words beating the brand
name.

If you want to run this on your own building: capture your own set, and ask
first.

[Full write-up and pipeline in the repository.](https://github.com/LikithSh3tty/Indoor-Mall-Navigation)
