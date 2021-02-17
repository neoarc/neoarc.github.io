---
layout  : wikiindex
title   : wiki
updated : 2021-02-17 12:23:41 +0900
toc     : true
public  : true
comment : false
regenerate: true
---

## wiki items

[[first]]

...

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

