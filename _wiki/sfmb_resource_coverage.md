---
layout  : wiki
title   : SFMB - Resource Coverage
summary : See which gameplay sprites are available for each Game Theme.
date    : 2026-08-30 01:34:07 +0900
updated : 2026-08-30 11:17:57 +0900
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_betatest]]
latex   : false
---
* TOC
{:toc}

# Resource Coverage

The overview summarizes all resource coverage currently tracked for each Game Theme. More resource types will be included as their coverage checks are implemented.

<div id="sfmb-resource-coverage-overview" class="sfmb-coverage" aria-live="polite">
  <p class="sfmb-coverage-status">Loading resource coverage…</p>
</div>

# Sprite Coverage

These tables are generated from the sprite resources currently present in the game repository. A check means that the Game Theme provides the sprite directly or inherits it from its declared Base Theme. An X identifies a sprite that is still needed. A triangle marks a partially populated multi-frame resource that may be intentional but should be reviewed. When frame data is available, the small number below the status shows the actual visible frame count; partial and missing resources show it against the expected total (for example, `2/4f`). Each Game Theme heading shows its complete and partial sprite counts for that table.

Costume characters and Nyle Luigi are not included. They do not belong to the standard Game Theme character sprite sets tracked here.

Items, enemies, map objects, and vehicles can be supplied either through an extended sprite such as `I_...`, `E_...`, `O_...`, or `V_...`, or through their representative frame in a shared sprite sheet. Effects use representative frames from the shared `Effect` sprite. Shared-sheet frames are checked against the Game Theme's default stage theme, and a frame only counts when its image area contains visible pixels.

## Character & Power-up Sprites

<div id="sfmb-sprite-coverage-characters" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading character and power-up coverage…</p>
</div>

## Item Sprites

<div id="sfmb-sprite-coverage-items" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading item coverage…</p>
</div>

## Enemy Sprites

<div id="sfmb-sprite-coverage-enemies" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading enemy coverage…</p>
</div>

## Map Object Sprites

<div id="sfmb-sprite-coverage-map-objects" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading map object coverage…</p>
</div>

## Vehicle Sprites

<div id="sfmb-sprite-coverage-vehicles" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading vehicle coverage…</p>
</div>

## Effect Sprites

<div id="sfmb-sprite-coverage-effects" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading effect coverage…</p>
</div>

# Music Coverage

Coverage tracking for Game Theme music has not been implemented yet.

# Sound Effect Coverage

Coverage tracking for Game Theme sound effects has not been implemented yet.
