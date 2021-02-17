---
layout  : wikiindex
title   : wiki
updated : 2021-02-17 13:35:59 +0900
toc     : true
public  : true
comment : false
regenerate: true
---

## wiki items

[[first]]

[[second]]

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

