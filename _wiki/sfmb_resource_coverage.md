---
layout  : wiki
title   : SFMB - Resource Coverage
summary : See which gameplay sprites are available for each Game Theme.
date    : 2026-08-30 01:34:07 +0900
updated : 2026-09-08 00:00:00 +0900
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

- **Check:** complete resource, including Base Theme inheritance
- **Triangle:** partially populated resource or partial Stage Theme coverage; hover or tap for details
- **X:** missing resource
- **Frame count:** actual standalone frames or visible shared-sheet frames; `?f` when unresolved
- **Sources:** `Resources/Sprite` and `Resources/GameThemes/<theme>/Sprite`
- **Shared sheets:** visible representative frames for items, enemies, map objects, vehicles, and effects
- **Tiles:** all declared Stage Themes, `TileSprite` aliases, and Overworld fallback
- **Tile grouping:** separate hazards and liquids, combined slopes, logical left/center/right Semisolid parts
- **Exclusions:** costume characters and Nyle Luigi
- **Boss Bridge:** Map Objects coverage rather than the legacy tile slot

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

## Tile Sprites

<div id="sfmb-sprite-coverage-tiles" class="sfmb-coverage sfmb-coverage-section" aria-live="polite">
  <p class="sfmb-coverage-status">Loading tile coverage…</p>
</div>

# Music Coverage

Coverage tracking for Game Theme music has not been implemented yet.

# Sound Effect Coverage

Coverage tracking for Game Theme sound effects has not been implemented yet.
