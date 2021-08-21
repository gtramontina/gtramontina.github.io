---
title: "Lessons (re)learned: 1. No Primitives"
description: "Fighting primitive obsession"
tags: post
date: 2021-03-18T01:00:00Z
layout: post.html
---

# No Primitives

_Note: This post is part of the series [Lessons (re)learned](/posts/lessons-re-learned-0)._

Here's a relatively well known code smell: [Primitive Obsession](https://wiki.c2.com/?PrimitiveObsession). It is always very tempting — and some claim "quicker" — to use primitives instead of creating new types. When we do this, we're probably missing an opportunity to model a concept of the domain we're working with — or, at least, to raise the abstraction level a little bit.

Writing validation routines is usually a good indication that we might have missed a concept. We'll need to _remember_ to always validate in every place we interact with that particular concept to ensure its correctness. If we have to remember, we're bound to forget.

It is very likely that our domain has rules around certain concepts, for example:

- **Age**: we probably want the concept of _age_ to be modeled in a way that it represents time being alive (in years, or perhaps months or weeks if it makes sense in our domain); it probably needs to be positive. It is not just any `number`.
- **Email**: it is very likely it needs to be in the `john@doe.com` format. Maybe we want to have a name attached to it in the form of `Jane Doe <jane@doe.com>`. So it is not just any `string`.
- **Money**: it needs a `Currency` (which itself is not only a `string`) in order for it to make sense. We may want to capture the `amount` in cents. Math operations can only be performed on moneys of the same currency. So `Money` is not just a `number`.

We can always compose them to raise the abstraction level even more and enrich our domain models. For example, an `Account` model could be raised as `SourceAccount` and `DestinationAccount` when dealing with bank account transfers.

Defining types also helps us to address certain types of [connascence](https://en.wikipedia.org/wiki/Connascence). Given the following example method:

```
save(productID string, name string)
// interface: save(string, string)
```

An honest mistake one can make is to invoke it with the order of the parameters reversed. If we raise the abstration level a bit and do:

```
save(id ProductID, name ProductName)
// interface: save(ProductID, ProductName)
```

Now we don't need to depend on knowing the internal variable names nor parameter order. This is especially beneficial on compiled languages or languages with type hints.

This subject also touches on the idea of making illegal states unrepresentable. I can't really recall where I first heard or read about it, but here's a couple of resources:
* [Effective ML Revisited](https://blog.janestreet.com/effective-ml-revisited/) by [Yaron Minsky](https://twitter.com/yminsky)
* [Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8) by [Richard Feldman](https://twitter.com/rtfeldman)

In [DDD](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) lingo, these models are known as [Value Objects](https://martinfowler.com/bliki/ValueObject.html) and are considered the building blocks of our domain. I've also seen these being called [Micro Types](https://markhneedham.com/blog/2009/03/10/oo-micro-types/) or [Tiny Types](https://darrenhobbs.com/2007/04/11/tiny-types/).
