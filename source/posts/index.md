---
title: Posts
commentsDisabled: true
siteClass: posts
layout: base.html
---

# Posts

<ul class="posts-list">
{% if site.isDevelopment %}{%- for post in collections.post | collectionDraft | reverse -%}
	<li class="post-entry draft-post">
		<code class="post-date"><time datetime="{{ post.data.date }}">{{ post.data.date | dateFormatYYYY_MM_DD }}</time>&nbsp;</code><a href="{{ post.url }}" title="{{ post.data.title }}" class="post-title">{{ post.data.title }}</a>
	</li>
{%- endfor -%}{% endif %}
{%- for post in collections.post | collectionLive | collectionNotDraft | reverse -%}
	<li class="post-entry">
		<code class="post-date"><time datetime="{{ post.data.date }}">{{ post.data.date | dateFormatYYYY_MM_DD }}</time>&nbsp;</code><a href="{{ post.url }}" title="{{ post.data.title }}" class="post-title">{{ post.data.title }}</a>
	</li>
{%- endfor -%}
</ul>
