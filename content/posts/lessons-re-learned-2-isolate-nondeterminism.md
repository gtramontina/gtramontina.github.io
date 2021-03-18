---
title: "Lessons (re)learned: 2. Isolate Nondeterminism"
description: "Pushing nondeterminismt to the edges of the system"
date: 2021-03-18T02:00:00Z
draft: true
---

# Isolate Nondeterminism

_Note: This post is part of the series [Lessons (re)learned](lessons-re-learned-0.html)._

Every system has sources of nondeterminism. We need to identify them and push them off to the boundaries, leveraging [dependency injection](lessons-re-learned-0.html#todo_inject-dependencies) in order to make use of them. Not controlling these sources of nondeterminism usually leads to test flakiness. _Time_ and _random_ are two very common sources of nondeterminism. In fact, any language-provided static functions are likely to be nondeterministic. [Third-party integrations](lessons-re-learned-3-reduced-integration-surface.html) are definitely sources of nondeterminism.

[Dave Farley](https://www.davefarley.net/), from [Continuous Delivery](https://www.continuousdelivery.com/), released a really nice video titled "[BDD Testing Time](https://www.youtube.com/watch?v=Xa6UEHyEyzQ)". The technique demontrated there can be applied to other sources of nondeterminism as well.

This idea flows naturally if we're practicing [TDD](https://www.amazon.com.au/Test-Driven-Development-Kent-Beck/dp/0321146530). It will have a nice side effect of making our codebase more modular and composable.

[Gary Bernhardt](https://twitter.com/garybernhardt) has a really nice screencast titled [Functional Core, Imperative Shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell) where he presents a very interesting way of thinking about this.
