---
layout  : wiki
title   : SFMB - Resource Coverage
summary : See which gameplay sprites are available for each Game Theme.
date    : 2026-08-30 01:34:07 +0900
updated : 2026-08-30 09:45:13 +0900
tag     : sfmb
toc     : false
public  : true
comment : true
parent  : [[sfmb_betatest]]
latex   : false
---

# Resource Coverage

The overview summarizes all resource coverage currently tracked for each Game Theme. More resource types will be included as their coverage checks are implemented.

<div id="sfmb-resource-coverage-overview" class="sfmb-coverage" aria-live="polite">
  <p class="sfmb-coverage-status">Loading resource coverage…</p>
</div>

<nav class="toc sfmb-coverage-toc" aria-label="Table of contents">
  <strong>Contents</strong>
  <ul>
    <li><a href="#resource-coverage">Resource Coverage</a></li>
    <li><a href="#sprite-coverage">Sprite Coverage</a>
      <ul>
        <li><a href="#sprite-coverage-characters">Character &amp; Power-up Sprites</a></li>
        <li><a href="#sprite-coverage-items">Item Sprites</a></li>
        <li><a href="#sprite-coverage-enemies">Enemy Sprites</a></li>
        <li><a href="#sprite-coverage-map-objects">Map Object Sprites</a></li>
        <li><a href="#sprite-coverage-vehicles">Vehicle Sprites</a></li>
        <li><a href="#sprite-coverage-effects">Effect Sprites</a></li>
      </ul>
    </li>
    <li><a href="#music-coverage">Music Coverage</a></li>
    <li><a href="#sound-effect-coverage">Sound Effect Coverage</a></li>
  </ul>
</nav>

# Sprite Coverage

These tables are generated from the sprite resources currently present in the game repository. A check means that the Game Theme provides the sprite directly or inherits it from its declared Base Theme. An X identifies a sprite that is still needed. A triangle marks a partially populated multi-frame resource that may be intentional but should be reviewed. Each Game Theme heading shows its complete and partial sprite counts for that table.

Costume characters and Nyle Luigi are not included. They do not belong to the standard Game Theme character sprite sets tracked here.

Items, enemies, map objects, and vehicles can be supplied either through an extended sprite such as `I_...`, `E_...`, `O_...`, or `V_...`, or through their representative frame in a shared sprite sheet. Effects use representative frames from the shared `Effect` sprite. Shared-sheet frames are checked against the Game Theme's default stage theme, and a frame only counts when its image area contains visible pixels.

<div id="sfmb-sprite-coverage" class="sfmb-coverage" aria-live="polite">
  <p class="sfmb-coverage-status">Loading sprite coverage…</p>
</div>

# Music Coverage

Coverage tracking for Game Theme music has not been implemented yet.

# Sound Effect Coverage

Coverage tracking for Game Theme sound effects has not been implemented yet.
