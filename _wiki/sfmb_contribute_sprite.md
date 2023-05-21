---
layout  : wiki
title   : Contribution - sprite part
summary : 
date    : 2023-05-22 01:42:47 +0900
updated : 2023-05-22 03:24:13 +0900
tag     : sfmb 
toc     : true
public  : true
comment : true
parent  : 
latex   : false
---
* TOC
{:toc}

# Sprite

* A sprite is a combination of an image file (.png), which is a collection of image fragments, and an information file (.sprite), which contains data about how to cut and use that image.
* All images in the game are implemented as sprites.
* .sprite file consists of several Sprite frames and several named animations.

# Sprite contribution

* You can fix bad sprites that exist in game, or add sprites that don't exist.
* After making any modifications or additions, upload them through the `ResourceCommitter` program.
	* Download from `#resource-sprite` on the Discord server	
	- The sprite you upload may be rejected.
	- Approved Sprites are usually reflected in the next update.

# Sprite frame

* A sprite frame is the smallest unit of image contained in a sprite.
* For example, the MarioSmall sprite contains a picture of Mario standing, a picture of him walking, a picture of him running, and so on, each of which is a sprite frame.

# Animations

* In-game animations are represented in two ways. index-based & named.

## Index-based animation

* This method animates based on the index of the sprite frame.
* For example,
	- When Mario is standing, we use index 0.
	- When Mario walks, index 1, 2, and 3 are used, in that order.
* These sprite indices are hardcoded into the game code. This is the old way.
* For a definition of index-based sprites, see the [[sfmb_sprite_index]]{link}

## Named animation

* This was added because different game themes require different number of frames for animation.
* You can define a specific named animation in the .sprite file.
* For example,
	- When Mario walks, the "Walk" animation is used.
	- This "Walk" could be 1,2,3, or 1,2,3,4,5,6,7, depending on the theme.
* This is a new way of doing things, but it is only used in some sprites.
	- Player characters (Mario, Luigi, Toad, ...)
	- Enemy characters
	- Background layers on stages
	- Helmets
	- Yoshi
	- NPCs
	- Not yet supported: MapObject, Item, Bullet, Effect

# Editing Sprites

* Image files (.png) are primarily edited using Asesprite (feel free to use whatever you like)
* Data files (.sprite) are edited using `SFMB SpriteEditor`.
	- Download from `#resource-sprite` on the Discord server

# How to use SpriteEditor

* (To be written)



