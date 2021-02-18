---
layout  : wikiindex
title   : wiki
toc     : true
public  : true
comment : false
regenerate: true
---

## test

* [[test-2021-02-18]]
    * aa
    * bb
    * cc

---

## blog posts
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

