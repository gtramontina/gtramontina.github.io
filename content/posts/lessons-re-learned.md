---
title: "Lessons (re)learned"
description: "Keeping track of lessons learned on software development"
date: 2020-12-27T08:28:36Z
draft: true
---

# Lessons (re)learned

---

**Summary:**

- [Fight Primitive Obsession](#fight-primitive-obsession)
- [Inject Nondeterminism](#inject-nondeterminism)
- [Integrations](#integrations)
- [Dependency Injection](#dependency-injection)
- [No Getters](#no-getters)
- [Own your interfaces](#own-your-interfaces)
- [Make Illegal States Unrepresentable](#make-illegal-states-unrepresentable)

---

Every now and again I am reminded of certain software development lessons I've already learned and, for reasons I'm yet to document, I keep re-learning. Groundhog Day feelings.

Writing these lessons down is my attempt at retaining this knowledge long(er) term; to reduce the time spent going in circles only to learn the same lesson again. When the code is giving us the same ol' hints, we, most certainly, can apply the same ol' techniques.

There are overlaps with common [code smells](https://wiki.c2.com/?CodeSmell), [well known good practices](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) and [other practices](https://web.archive.org/web/20150104153931/www.xpteam.com/jeff/writings/objectcalisthenics.rtf). I don't mean to give them new names or anything. Instead, I want to put them words that I can refer to later and quickly remember.

Each little lesson has some notes and links to where I believe I first learned about it. Some of them are directly related to one another.

Without further ado, lets get to the lessons.

## No Primitives

Here's a relatively well known code smell: [Primitive Obsession](https://wiki.c2.com/?PrimitiveObsession). It is always very tempting — and some claim "quicker" — to use primitives instead of creating new types. When we do this, we're probably missing an opportunity to model a concept of the domain we're working with — or, at least, to increase the abstraction level a little bit.

It is very likely that our domain has rules around certain concepts, for example:

- **Age**: we probably want the concept of _age_ to be modeled in a way that it represents time being alive (in years, or perhaps months or weeks if it makes sense in our domain); it probably needs to be positive. It is not just any number.
- **Email**: it is very likely it needs to be in the `john@doe.com` format. We may want to have a name attached to it in the form of `Jane Doe <jane@doe.com>`. So it is not just any string.
- **Money**: it needs a `Currency` (which itself is not only a string) in order for it to make sense. We may want to capture the `amount` in cents. Math operations can only be performed on moneys of the same currency. So `Money` is not just a number.

We can always compose them to increase the abstraction level and enrich our domain models.

Writing validation functions is a good indication that we might have missed a concept. We'll need to remember to call them in every place we interact with that particular concept to ensure its correctness. This connects to another lesson: [Make Illegal States Unrepresentable](#make-illegal-states-unrepresentable).

In [DDD](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) lingo, these models are known as [Value Objects](https://martinfowler.com/bliki/ValueObject.html) and are considered the building blocks of our domain. I've also seen these being called [Micro Types](https://markhneedham.com/blog/2009/03/10/oo-micro-types/) or [Tiny Types](https://darrenhobbs.com/2007/04/11/tiny-types/).

## Nondeterminism On The Outskirts

Every system has sources of nondeterminism. We need to identify them and push them off to the boundaries, leveraging [dependency injection](#inject-dependencies) in order to make use of them. Not controlling these sources of nondeterminism usually leads to test flakiness. _Time_ and _random_ are two very common sources of nondeterminism. In fact, any language-provided static functions are likely to be nondeterministic.

[Dave Farley](http://www.davefarley.net/), from [Continuous Delivery](https://www.continuousdelivery.com/), released a really nice video titled "[BDD Testing Time](https://www.youtube.com/watch?v=Xa6UEHyEyzQ)". The technique demontrated there can be applied to other sources of nondeterminism as well.

## Limited Integrations

Integrations with third-party systems are also sources of nondeterminism. We should always strive to keep our dependencies to a minimum. The essence of sustainable software development is dependency management. Internal and external.

We must approach integrations from our needs' perspective. When assessing service providers, we have a need — or a set of needs — that has to be satisfied.

## Inject Dependencies

## No Getters nor Setters

This speaks to encapsulation and cohesiveness

## Own your interfaces

https://web.archive.org/web/20110515131818/http://stevef.truemesh.com/archives/000194.html
https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627

## Make Illegal States Unrepresentable

https://blog.janestreet.com/effective-ml-revisited/

## Only one return type (no exceptions, no null)
