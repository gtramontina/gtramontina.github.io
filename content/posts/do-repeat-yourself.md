---
title: "Do Repeat Yourself"
description: "Understanding the DRY principle"
date: 2020-02-23T10:27:57Z
---

# Do Repeat Yourself

One of the first software development principles programmers learn is the DRY principle: Don't Repeat Yourself. One can think of it as being quite self-explanatory, without requiring to go beyond "remove duplication" to claim understanding of it. Is that enough, though? What is duplication, anyway?

## Historia

Let's start from the beginning. [Andrew Hunt](https://twitter.com/pragmaticandy) and [David Thomas](https://twitter.com/pragdave) first introduced this principle in their 1999 [_The Pragmatic Programmer: From Journeyman to Master_](https://pragprog.com/book/tpp/the-pragmatic-programmer) book (an updated [20th Anniversary Edition](https://pragprog.com/titles/tpp20) is also available). A must-read, if you ask me. It states the following:

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

This tip, number 11, is given amidst a section named _The Evils of Duplication_, where the authors explain the dangers of having duplicated knowledge within a system. The DRY principle is not as much about _code_ as it is about _knowledge_. Any kind of knowledge, but especially domain knowledge. Sure, this knowledge will eventually become code. But the point is that there should be only one representation of it in code.

## The Confusion

It's very easy for us, developers, especially beginners and [expert-beginners](https://daedtech.com/how-developers-stop-learning-rise-of-the-expert-beginner/), to misinterpret and obsess over it. We can go hours removing every bit of duplicated code, applying all the design patterns we know, thinking how smart we are, until there is not a single duplicated word left. This is very dangerous! In fact, we should be extra careful when refactoring to abstractions. [Sandi Metz](https://www.sandimetz.com/), in [_The Wrong Abstraction_](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction), summarizes very clearly saying that "duplication is far cheaper than the wrong abstraction", so "prefer duplication over the wrong abstraction".

At the same time, Robert C. Martin ("Uncle Bob"), in his well-known [_Clean Code_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) book, emphasizes the idea that "duplication is the primary enemy of a well-designed system". And so do a lot of other influential programmers, like [Kent Beck](https://twitter.com/KentBeck) and [Ron Jeffries](https://twitter.com/RonJeffries). So what gives?

## Doppelgängers

Turns out that there's one important fact we have to be aware of: there are different kinds of duplication. Uncle Bob touches on this very point in his most recent book [_Clean Architecture_](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164). There is _true duplication_, where the duplicates require the exact same changes, at the same times, for the same reasons – this is the kind we should cast away from our codebases. And there is false, or _accidental duplication_. This kind of duplication, we better let them be and just observe from afar.

How do we know which kind of duplication are we looking at, then? Years before publishing the Clean Architecture book, Bob hinted on this subject when he wrote "[An Accidental Doppelgänger in Ruby](http://www.informit.com/articles/article.aspx?p=1313447)", in 2009. In this post, he poses the question:

> (…) if the implementation of two functions is identical, yet their intent is completely different, is it still duplicate code?

His conclusion, in this specific case, was: yes. The solution arose from paying good attention to the _intent_ and the _levels of abstraction_ of the code he was dealing with. Being able to immediately recognize when you are going up and down in the abstractions in a single method is a powerful skill to develop. It helps you identify missing abstractions and domain concepts earlier in the case of true duplication. As for accidental, or coincidental, duplication, understanding the real intent and purpose of the code is fundamental. It goes hand in hand with the Single Responsibility Principle, from the SOLID principles presented by Uncle Bob himself in [_Agile Software Development, Principles, Patterns, and Practices_](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445/). So, asking questions like…

- How often would this piece of software change compared to the other?
- What are the reasons for changing one or the other?
- Who'd request such changes? The design team, the finances team?
- What purpose does this code serve?
- Which part of the architecture does it belong?

… can help identify, or prevent accidental duplicates.

It can be very tempting to pass along and use the same model or data structure across different architectural boundaries because they _look_ the same at this point in time. As an example, the persistence and the presentation models can look the same in the very beginning of a project. This is an accidental duplication. It is only a coincidence that, at this very moment, they look exactly the same. Give them a few weeks and you'll see them evolve along different paths.

## Conclusion

If you find yourself writing "just another if-else clause", it is very likely that you're dealing with a bad abstraction. It's like trying to push a square peg into a round hole. You may be able to squeeze an edge or two in, but it is wasted effort. Once you realize that, you are better off backing up and choosing a different peg. Sandi Metz, in the aforementioned blog post, explains how we usually end up in these situations and how to recover from them, acknowledging the [sunk cost fallacy](https://en.wikipedia.org/wiki/Sunk_cost#Loss_aversion_and_the_sunk_cost_fallacy).

One piece of advice that it is worth following is "The Rule of Three". Made popular by Martin Fowler in [_Refactoring: Improving the Design of Existing Code_](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672), and attributed to [Don Roberts](https://www.evansville.edu/majors/eecs/biodr47.cfm). It goes like this:

> The first time you do something, you just do it. The second time you do something similar, you wince at the duplication, but you do the duplicate thing anyway. The third time you do something similar, you refactor.

Before DRY'ing up your code and refactoring it into abstractions, make sure you're facing a real duplication. If you're unsure, don't be hasty. Observe it for some time. Following The Rule of Three, asking similar the questions to the ones presented earlier and talking to your colleagues about this subject can vastly improve your software design skills and the maintainability of your codebase.

Use the acronyms and catchphrases as reminders of certain principles or rules of thumb. But make sure you actually understand what lies behind those phrases. Remember to always take the extra step in learning a given subject.
