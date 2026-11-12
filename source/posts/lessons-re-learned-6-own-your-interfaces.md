---
title: "Lessons (re)learned: 6. Own Your Interfaces"
description: "Owning dependencies"
tags: post
date: 2021-03-19T06:00:00Z
layout: post.html
draft: true
---

# Own Your Interfaces

_Note: This post is part of the series [Lessons (re)learned](/posts/lessons-re-learned-0)._

In [_Growing Object-Oriented Software, Guided by Tests_](https://www.amazon.com/dp/0321503627), chapter 8, "[Building on Third-Party Code](https://learning.oreilly.com/library/view/growing-object-oriented-software/9780321574442/ch08.html)", [Steve Freeman](https://www.linkedin.com/in/stevefreeman/) and [Nat Pryce](https://www.linkedin.com/in/natpryce/) suggest to "Only Mock Types That You Own" ("Don’t Mock Types You Can’t Change"). Steve had already touched on this idea in a 2004 [blog post](https://web.archive.org/web/20040307041407/http://stevef.truemesh.com/archives/000194.html), where he credited [Joe Walnes](https://www.linkedin.com/in/joewalnes/) for it.

While this is an easy punchline to remember, how to address it, in practice, is what actually matters. In the book, the authors suggest writing an [adapter](https://refactoring.guru/design-patterns/adapter) layer for the third-party code, and this is what I want to expand on.

## The Adapter Pattern

The intent of the adapter pattern, as described by The Gang of Four (GOF) in their book [_Design Patterns: Elements of Reusable Object-Oriented Software_](https://www.amazon.com/dp/0201633612), is as follows:

> Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn’t otherwise because of incompatible interfaces.

From a very high level, it looks like this: instead of interacting directly with the third-party software—be it a library or an SDK installed via your ecosystem package manager, or a service that you need to interact with over the network—, you create an adapter that provides a more focused interface for your application to interact with.

{% svgbob fontSize=11, scale=0.8, caption="Before and after using the adapter pattern" %}
 Before
                   .~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
                   :                      Application Layer :
 .--------------.  :                        .-------------. :
 |  "3rd-party" |<-+----------------------->| Core Logic  | :
 '--------------'  :                        '-------------' :
                   ╰~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

-------------------------------------------------------------
 After
                   .~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
                   :                      Application Layer :
 .--------------.  :  .---------------.     .-------------. :
 |  "3rd-party" |<-+->|{a} Adapter    |<--->| Core Logic  | :
 '--------------'  :  '---------------'     '-------------' :
                   ╰~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
# Legend:
a = { fill: light-dark(#3333330e, #ffffff0e); }
{% endsvgbob %}

The chapter describing the pattern later adds:

> _How much adapting does Adapter do?_ Adapters vary in the amount of work they do to adapt Adaptee to the Target interface. There is a spectrum of possible work, from simple interface conversion—for example, changing the names of operations—to supporting an entirely different set of operations. The amount of work Adapter does depends on how similar the Target interface is to Adaptee’s.

My answer to the question of "_how much adapting does Adapter do?_", in this case, comes as a result of the other three lessons learned ([Isolate Nondeterminism](/posts/lessons-re-learned-2-isolate-nondeterminism), [Reduced Integration Surface](/posts/lessons-re-learned-3-reduced-integration-surface) and [Inject Dependencies](/posts/lessons-re-learned-4-inject-dependencies)): approach the integration from _your_ perspective. Think about what is it that _your_ system needs, design that interface, then adapt the third-party system to that interface.

*[GOF]: Gang of Four: Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides
*[SDK]: Software Development Kit

## Designing Your Interfaces

Many are familiar with the SOLID principles, introduced by [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) in an article titled [_Design Principles and Patterns_](https://web.archive.org/web/20020217194239/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.PDF). One of the principles—and one that I base this lesson on—is the Liskov Substitution Principle, which itself was based on [Barabara H. Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov) and [Jeanette M. Wing](https://en.wikipedia.org/wiki/Jeannette_Wing)'s [_A Behavioral Notion of Subtyping_](https://dl.acm.org/doi/pdf/10.1145/197320.197383) '94 TOPLAS article.

Whether you're designing a concrete type or an interface (using certain languages' constructs), what I mean by interface here is your _type's surface area_; how other types interact with it and its observable behavior. In other words, not only the signature but also pre and post conditions, and invariants. These are ideas associated with Design by Contract, first described by [Bertrand Meyer](https://bertrandmeyer.com/bio/) in a technical report, and later published as a chapter in the book [_Object-Oriented Software Construction_](https://bertrandmeyer.com/wp-content/upLoads/OOSC.pdf).

One aspect to keep in mind when designing interfaces is to avoid leaking implementation details. And the third-party, in this situation, is an implementation detail. [Joel Spolsky](https://www.joelonsoftware.com/about-me/), in his article [_The Law of Leaky Abstractions_](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) discourses about this in detail.

Without further ado, here are some of the guidelines I like to follow when designing an interface.

### Signature

Own the functions and methods.

### Behavior

### Errors

Own the errors. Make them part of your interface. If the third-party system or library emits errors, have your own understanding of what these errors mean and own them; give them meaning.

* metadata

*[SOLID]: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles
*[TOPLAS]: ACM Transactions on Programming Languages and Systems
