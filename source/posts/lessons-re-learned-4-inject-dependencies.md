---
title: "Lessons (re)learned: 4. Inject Dependencies"
description: "Applying inversion of control and dependency inversion"
tags: post
date: 2021-07-28T07:30:00Z
layout: post.html
---

# Inject Dependencies

_Note: This post is part of the series [Lessons (re)learned](/posts/lessons-re-learned-0)._

When writing software following the object-oriented [paradigm](https://en.wikipedia.org/wiki/Programming_paradigm), [dependency injection](https://martinfowler.com/articles/injection.html) remains one useful technique, regardless of language.

As mentioned in the post titled [Reduced Integration Surface](/posts/lessons-re-learned-3-reduced-integration-surface), managing dependencies is key to sustainable software development. One practice that helps us better do that is to separate _construction_ logic from _business_ logic. Usually, construction takes place in the software entry point, where we declare and wire up the entire dependency graph.

One interesting effect of injecting dependencies is that it makes them explicit. In turn, we get better insights on the [levels of abstraction](https://en.wikipedia.org/wiki/Abstraction_layer) and [code smells](https://wiki.c2.com/?CodeSmell), such as [data clumps](https://martinfowler.com/bliki/DataClump.html) and [feature envy](https://wiki.c2.com/?FeatureEnvySmell).

Applied properly, dependency injection gives us better modularity and helps us abide by the [dependency inversion principle](https://martinfowler.com/articles/dipInTheWild.html).

[Alistair Cockburn](https://twitter.com/totheralistair), on a talk named [Hexagone](https://youtu.be/th4AgBcrEHA), suggests that we call this property _configurable dependency_ (which he attributed to [Gerard Meszaros](https://twitter.com/gerardmes)) instead. His rationale is that the name _dependency injection_ encourages doing it wrong first and then flipping and fixing it.

Back in 2008, [Miško Hevery](https://twitter.com/mhevery) gave a [series](https://www.youtube.com/user/GoogleTechTalks/search?query=The%20Clean%20Code%20Talks%20Misko) of talks at Google. In one in particular, titled [Global State and Singletons](https://youtu.be/-FRm3VPhseI), Miško debunks common misconceptions in the [Q&A](https://youtu.be/-FRm3VPhseI?t=1879) section.
