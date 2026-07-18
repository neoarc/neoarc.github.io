---
layout  : wiki
title   : SFMB - How to make a game theme
summary : 
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_tutorial]]
latex   : false
date    : 2025-09-01 01:44:00 +0900
updated : 2026-07-18 14:40:00 +0200
---
* TOC
{:toc}

# How to make a Game Theme

## Cloning the Default Game Theme (SMB)
- In the map editor, click the `Manage GameThemes` button on the `home` tab.
- In the left list, select SMB, then click Clone selected theme at the bottom.
- Enter the name of your theme (e.g., SMBPlus) and clcik `Do it`.
  - A folder containing your copied assets will open.
 
## The structure of a Game Theme
- A game theme consists of the following components:
  - Theme settings (`/ThemeSettings.json`)
  - Sprite files (`/Sprite/`)
  - Music files (`/BGM/`)
  - Sound effect files (`/Soud/`)
    
This document briefly explains how to edit each component.
    
## Preparing Your Cloned Theme
- Remove every duplicate / recolor assets to start with a less cluttery easier to manage game theme.
  - Including:
    - `E_Bobomb` / `E_Bobomb{ThemeName}`
    - `E_Boo`
    - `E_BoomBoom`
    - Every `Effect{ThemeName}` other than the default / `Overworld`
    - Every `Enemy{ThemeName}` other than the default / `Overworld`
    - Every `MapObject{ThemeName}` other than the default / `Overworld`
    - Every `Npc{ThemeName}` other than the default / `Overworld`
  - These are all optional resources. If you wan't, you can readd them later.
- You can remove `AbilityFlag`, `AppUpdate`, `ChallengeMode`, `Design`, `Etc`, `BigCircle`, every `Font`, `MiniGame1`, `StageTag`, `StageWorld`, `Transition`, `UIElement`, `Costumes`.
- You can also remove every `Tile{ThemeName}`, `Layer{Name}` and music files other than the basic ones, like `Overworld`, `Undergorund`, `Underwater`, `Castle`, etc...
- You also don't need to support every player and powerup, you can remove all of them, except `MarioSmall` and `MarioBig`.
- In fact, in the ThemeSettings you can disable every object (powerups, items, vehicles, enemies, etc...), every player and its power ups, and remove every theme you don't want to support. This way it's much easier to reach a release ready state for your game theme, as you don't need to replace every asset in the game.
    
## Editing Theme Settings
- Theme settings can be edited in the Manage ThemeSettings menu.
- Each item shows a short description at the bottom when clicked.
- Try changing different options and see how they affect the game.
- For more details, check this detailed tutorial: [[sfmb_tutorial_theme_settings]]{How to use ThemeSettings}

## Editing Sprite Files
- In this game, sprites consist of `.sprite` files and `.png` files.
- To edit a `.sprite` file, you need the SpriteEditor tool.
- For more details, check this detailed tutorial: [[sfmb_tutorial_sprites]]{How to work with sprites}

## Editing Music Files
- BGM in this game consists of .ogg files and .bgm files.
- A .bgm file stores loop section information for the corresponding .ogg file, and it can be created using the TestSoundLoop.exe program.

## Editing Sound Effect Files
- If your theme uses the same sound effects as SMB, you can remove them.
