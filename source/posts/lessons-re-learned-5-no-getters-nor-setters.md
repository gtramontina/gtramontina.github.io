---
title: "Lessons (re)learned: 5. No Getters Nor Setters"
description: "Understanding encapsulation, coupling and cohesion"
tags: post
date: 2023-04-10T09:00:00Z
layout: post.html
---

# No Getters nor Setters

_Note: This post is part of the series [Lessons (re)learned](/posts/lessons-re-learned-0)._

A lot has been said about the perils of using _getters_ and _setters_—also known as _accessors_ and _mutators_—in object-oriented software. To cite a couple, [Allen Holub](https://holub.com/), back in 2003, published "[Why getter and setter methods are evil](https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html)" and [Yegor Bugayenko](https://www.yegor256.com/), a decade later, wrote "[Getters/Setters. Evil. Period.](https://www.yegor256.com/2014/09/16/getters-and-setters-are-evil.html)". However, a lot more has been said—or rather, suggested—encouraging the use of such (anti?)patterns. So much so that I'll refrain from linking here. Suffice to say that pretty much any OO example out there makes use if them.

The terms coupling, cohesion, encapsulation, information hiding, modularity all come up when discussing this topic. And there's a good reason for that: together, they enable malleability e evolvability to software systems. In other words, they help us build software that can be easily changed.

Majority, if not all, cases can be categorized as either a _command_ or a _query_—also known as [Command-Query Separation (CQS)](https://martinfowler.com/bliki/CommandQuerySeparation.html). This means that we're either probing the system for information or changing the system state.

In the conversation "[Understanding Coupling and Cohesion](https://www.youtube.com/watch?v=hd0v72pD1MI)", led by [J. B. Rainsberger](https://twitter.com/jbrains), the meaning of coupling and cohesion is explored. [Dale Emery](https://dhemery.com) points out something interesting:

> To couple means to fasten together. And to cohere means to stick together. (…) it seems to me that the difference is in whether the forces that bind the things are inherent in the things themselves or imposed externally.

I found this to be quite insightful. They also reference [Glenn Vanderburg](https://vanderburg.org/)'s "[Cohesion](https://vanderburg.org/blog/2011/01/31/cohesion.html)" blog post, in which the author explains _cohesion_ by contrasting it with _adhesion_, a more common term.

Also, in this same conversation, the late [Jim Weirich](https://en.wikipedia.org/wiki/Jim_Weirich) brings up [connascence](https://skillsmatter.com/skillscasts/896-jim-weirich-grand-unified-theory-of-software): a way of categorizing the different types of coupling. A more comprehensive collection of resources about it can be found at [connascence.io](https://connascence.io/pages/about.html).

This seems to be one of those habits that form real quick—especially when the great majority of examples out there make use of it—and can be hard to unlearn. So, I try to tame it. Whenever I feel like writing a getter or setter, I stop and ask myself:

* Why do I want to get this _data_ from this _object_?
* What do I want to _do_ with this _data_?
* Why do I want to set this _data_ in this _object_?
* Where do I want to keep this _behavior_?
* Given the _object_ already holds the _data_, can I [tell](https://web.archive.org/web/20070819141746/http://www.pragmaticprogrammer.com/ppllc/papers/1998_05.html) it to _do_ something instead?
