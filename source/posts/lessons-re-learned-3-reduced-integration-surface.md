---
title: "Lessons (re)learned: 3. Reduced Integration Surface"
description: "Keeping dependencies under control"
tags: post
date: 2021-03-18T03:00:00Z
layout: post.html
---

# Reduced Integration Surface

_Note: This post is part of the series [Lessons (re)learned](/posts/lessons-re-learned-0)._

Integrations with third-party systems are also sources of [nondeterminism](/posts/lessons-re-learned-2-isolate-nondeterminism). We should always strive to keep our dependencies at a minimum. The essence of sustainable software development is dependency management. Internal and external.

We must approach integrations from our needs' perspective. With that in mind, we can [design interfaces](/posts/lessons-re-learned-0/#todo_own-your-interfaces) – upon which our system depend on – that satisfy those needs. Then, instead of making remote calls or using the provider's SDK directly from where we perform business logic, we can hide this integration behind concrete implementations of those interfaces. With this approach, we can create [test doubles](http://xunitpatterns.com/Test%20Double%20Patterns.html) to excercise our business logic with different scenarios and makes changing providers, from a coding point of view, a relatively simple task – granted these interfaces are well thought out and designed.

Another important quality to strive for when designing these interfaces is to communicate only one intent per method. This will guide the concrete implementations to have a single code path per method – no if/else branches. This minimizes the need for complex integration tests at this layer. We might as well decide to not test these concrete implementations directly and let the higher level end-to-end tests excercise them.
