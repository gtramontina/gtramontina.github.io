---
title: "Event Sourcing"
description: "A simple approach to building scalable and maintainable systems"
tags: post
date: 2025-09-09T07:00:00Z
layout: post.html
draft: true
---

# Event Sourcing

{% svgbob  caption="Decide function; Signature: <code>Command → State → Event(s)</code>" %}
    Command  .--------.
*----------->|        |  Events
     State   | Decide |--------->
 ----------->|        |
             '--------'
{% endsvgbob %}

{% svgbob  caption="Evolve function; Signature: <code>State → Event → State</code>" %}
      State  .--------.
 ----------->|        |  State
      Event  | Evolve |--------->
 ----------->|        |
             '--------'
{% endsvgbob %}

{% svgbob  caption="Decider diagram" %}
    Command  .--------.
*----------->|        |  Events
     State   | Decide |---------╮
 ╭---------->|        |         |
 |           '--------'         |
 ^           .--------.  Event  |
 |   State   |        |<--------╯
 +-----<-----| Evolve |  State
 |           |        |<--------╮
 v           '--------'         |
 ╰------------------------------╯
{% endsvgbob %}

{% svgbob  caption="Query function; Signature: <code>Query → State → View</code>" %}
    Filters  .--------.
*----------->|        |  View
     State   | Query  |--------->
 ----------->|        |
             '--------'
{% endsvgbob %}

{% svgbob  caption="Command Handling Data Flow" %}
        .---------.                        .-----------.
  .----/ Command /<---* 🯅                 ( Event Store )<-----.
  |   '---------'                          '-----+-----'       |
.~+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+~~~~~~~~~~~~~+~.
: | .~~~~~~~~~~~~~~.                             |             | :
: | :Decider {d}   :                             |             | :
: | :  .--------.  :                             v             | :
: | :  |Initial |  :    .---------------..-------------------. | :
: | :  |        +--+-> / Initial State // Historical Events /  | :
: | :  | State  |  :  '--------+------''---------+---------'   | :
: | :  '--------'  :           |                 |             | :
: | :    .---------+-----------'                 |             | :
: | :    |    ╭----+-----------------------------'             | :
: | :    v    v    :                                           | :
: | :  .--------.  :                                           | :
: | :  |        |  :            .---------------.              | :
: | :  | Evolve +--+---------->/ Current State /               | :
: | :  |        |  :          '-------+-------'                | :
: | :  '--------'  :                  |                        | :
: | :       ╭------+------------------'                        | :
: | :       v      :                                           | :
: | :  .--------.  :                                           | :
: | :  |        |  :             .------------.                | :
: '-+->| Decide |--+----------->/ New Events /-----------------' :
:   :  |        |  :           '------------'                    :
:   :  '--------'  :                                             :
:   '~~~~~~~~~~~~~~'                                             :
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
# Legend:
d = {fill: light-dark(#3333330e, #ffffff0e)}
{% endsvgbob %}

{% svgbob  caption="Query Handling Data Flow" %}
                        ╭--------------------------------------.
        .---------.     v                  .-----------.       |
  .----/ Filters /<---* 🯅                 ( Event Store )      |
  |   '---------'                          '-----+-----'       |
.~+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+~~~~~~~~~~~~~+~.
: | .~~~~~~~~~~~~~~.                             |             | :
: | :Querier {q}   :                             |             | :
: | :  .--------.  :                             v             | :
: | :  |Initial |  :    .---------------..-------------------. | :
: | :  |        +--+-> / Initial State // Historical Events /  | :
: | :  | State  |  :  '--------+------''---------+---------'   | :
: | :  '--------'  :           |                 |             | :
: | :    .---------+-----------'                 |             | :
: | :    |    ╭----+-----------------------------'             | :
: | :    v    v    :                                           | :
: | :  .--------.  :                                           | :
: | :  |        |  :            .---------------.              | :
: | :  | Evolve +--+---------->/ Current State /               | :
: | :  |        |  :          '-------+-------'                | :
: | :  '--------'  :                  |                        | :
: | :       ╭------+------------------'                        | :
: | :       v      :                                           | :
: | :  .--------.  :                                           | :
: | :  |        |  :              .--------.                   | :
: '-+->|  Query |--+------------>/  View  /--------------------' :
:   :  |        |  :            '--------'                       :
:   :  '--------'  :                                             :
:   '~~~~~~~~~~~~~~'                                             :
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
# Legend:
q = {fill: light-dark(#3333330e, #ffffff0e)}
{% endsvgbob %}

```javascript
export const CommandHandler = (eventStore) => (decider) => async (command) => {
	const { streamId } = command;
	const stream = await eventStore.read(streamId);
	const historicalEvents = await eventStore(streamId);
	const initialState = decider.initialState();
	const currentState = historicalEvents.reduce(decider.evolve, initialState);
	const newEventsOrRejection = decider.decide(currentState, command);

	if (!Array.isArray(newEventsOrRejection)) {
		const rejection = newEventsOrRejection;
		return rejection;
	}

	await eventStore.write(streamId, newEvents);
}
```

```javascript
// assign-teacher-to-course.js // decider

export const initialState = () => {
	return {}
};

export const evolve = (state, event) => {
	switch (event.type) {
		case 'COURSE_REGISTERED':
			return { ...state, courseId: event.courseId };
		case 'TEACHER_REGISTERED':
			return { ...state, teacherId: event.teacherId };
		case 'TEACHER_ASSIGNED_TO_COURSE':
			return { ...state, assignedOn: event.assignedOn };
		default:
			return state;
	}
};

export const decide = (command, state) => {
	if (!state.courseId) {
		return { rejected: 'Course ID is required' }
	}
	if (!state.teacherId) {
		return { rejected: 'Teacher ID is required' }
	}
	if (state.assignedOn) {
		return { rejected: 'Teacher already assigned to a course' }
	}

	return [{
		type: 'TEACHER_ASSIGNED_TO_COURSE'
		data: {
			courseId: command.courseId,
			teacherId: command.teacherId,
			assignedOn: command.assignedOn,
		},
	}];
};
```
