---
layout  : wiki
title   : SFMB - How to work with sprites
summary : 
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_tutorial]]
latex   : false
date    : 2021-06-22 01:37:00 +0900 
updated : 2025-09-15 20:00:00 +0100
---
* TOC
{:toc}

# Summary

This wiki explains how to download and use the MM SpriteEditor program, and how to work with sprite resources (`.png` & `.sprite` files)

# MM SpriteEditor

## What is it?

Some people think that the MM SpriteEditor is a sprite creator program, like Aseprite, but that’s not the case. The purpose of the MM SpriteEditor is to configure compatible spritesheets (e.g., `Item.png`) and sprites (e.g., `LayerOverworld.png`). These configurations are saved into a `.sprite` file with the same name as the spritesheet (e.g., `Item.png` -> `Item.sprite`). But what does “configure” actually mean, you may ask.

A spritesheet consists of multiple sprites. These sprites can appear in different positions on the sheet, with different sizes. The main goal of the sprite editor is to set these up.
- ![img](https://github.com/user-attachments/assets/328752f2-dab0-4576-9c4a-fa539688960d)
- ![img](https://github.com/user-attachments/assets/0ca6aaef-a367-4a72-8ac8-dadc3c12e691)

In addition, here you can also configure things like:
- How much the subject should be offset on the X and Y axis compared to its original origin.
- Where the helmets (`Buzzy`, `Spiny`, `Pumpkin` and `Santa`) of the player should be placed for each sprite frame, and in what direction and angle they should face.
- Where their propellers should be positioned and whether they appear in front of the player, behind, or not at all.
- Where the wing(s) of enemies should be placed.
- Speed, frame count, and loop type of custom-made or predefined animations.

There are also cases where an image doesn’t contain a spritesheet but only a single sprite, like unanimated background layers (e.g., `SMB` `LayerOverworld.png`).

And of course, there are exceptions when it’s not possible to create a `.sprite` file for a spritesheet or a sprite, since its configuration is hardcoded in the game itself (e.g., `TileOverworld`).

## Download & Setup

### Where

- For beta testers: pinned messages in the `#resource-sprite` text channel.
- For DEMO users: pinned in the `#demo-game-themes` forum channel.

### How

1. Download the latest version.
1. Move it into your `Mario Multiverse` folder next to `Mario.exe`.
1. Open it there.
1. Make sure to check for updates by pressing the `Check update` button on the `Options etc.` tab.
	- ![img](https://github.com/user-attachments/assets/318f8bf7-61f0-4d72-975e-205e41bc0927)
1. Open a `.sprite` file.
	- You can use the open button inside the SpriteEditor program.
    	- ![img](https://github.com/user-attachments/assets/c4ceff03-9cd6-4d79-96c4-be5b391aaa4f)
	- Or you can associate `.sprite` files with SpriteEditor and open them directly.
		<details>

		<summary>Show how</summary>
		
      <ol>
        <li><img src="https://github.com/user-attachments/assets/9e5bf572-143a-4a2c-83d2-b85064b0c123" alt="img"></li>
        <li><img src="https://github.com/user-attachments/assets/80a06ea0-5968-45cc-b674-11d22bee628a" alt="img"></li>
        <li><img src="https://github.com/user-attachments/assets/98e02d1d-02e4-4483-9b14-931fe2b1b2b2" alt="img"></li>
      </ol>
      


	- You can also click on the program icon to open recently used sprites.
1. It's also possible to create a `.sprite` file from a `.png` with the `new` button, but sometimes it's easier to just copy-paste an existing one.
1. If done right, you should see the spritesheet or sprite displayed.
	- ![img](https://github.com/user-attachments/assets/5749a6e4-7d7f-458c-b9ed-5f9b76ae31e3)

    
### Setup layout

- You can rearrange the panes (sub-windows) by grabbing the top of its border and dragging it.
- While dragging, small arrow icons will appear. If you drag one pane into it, it will attach to the edge of that another pane.
- ![gif1](https://user-images.githubusercontent.com/40640441/122874734-9e720f00-d333-11eb-991e-88491c2b0a44.gif)

## Panes

There are several docking panes (sub-windows) in SpriteEditor.

### Preview pane

- Here you can see the animations and sprites with the set offset.
- The intersection of the two lines is the origin of the current subject.
  - ![img](https://github.com/user-attachments/assets/7b282998-2d05-447d-bf1e-0db48674501f)

### Properties pane

- This is where the properties of `Sprite Frames` or `Animations` appear when you click on them.

### Sprite frames pane

- If you click on one, it will appear in the `Preview` window with the set offset and area, and its properties will appear in the `Properties` window.
- Here you can set the area where the sprite is, but this happens automatically when you `double-click` on it.
  - ![gif2](https://user-images.githubusercontent.com/40640441/122875522-aaaa9c00-d334-11eb-9995-283d946766fb.gif)
- You can also set the offset here, but this is easier with the small arrow icons in the `Home` tab. With the offset you can shift the sprite from the center of the origin on the X and Y axes.
  - ![gif3](https://user-images.githubusercontent.com/40640441/122875978-3de3d180-d335-11eb-82b1-6342ad9ae62f.gif)

	<details>
	<summary>Show common origins</summary>

    <ul>
      <li>Center Bottom:
      <ul>
      <li>Players</li>
      <li>Enemies</li>
      <li>Background Objects</li>
      <li>Items</li>
      <li>So most things that interact with the ground</li>
      </ul>
      </li>
      <li>Left Top (x:0; y:0):
      <ul>
      <li>Background Layers</li>
      <li>Fonts</li> 
      <li>So most UI-related resources</li>
      </ul>
      </li>
    </ul>
	</details>

### Animations pane

- If you click on one

  - ![img](https://github.com/user-attachments/assets/0c133ea2-7ca3-463e-9bac-3c8f612485c3)
  - the animation will appear in the `Preview` pane.
    - ![Animation](https://github.com/user-attachments/assets/ebeff39c-dcf3-433f-ab64-726ee5244f2a)
  - and its properties will appear in the `Properties` pane.
    - `FirstFrame` -> Set which frame to start from.
    - `FrameCount` -> How many of the following sprite frames it should use.
    - `Delay     ` -> Delay between frames (`-1` means to use the default).
    - `LoopType  ` -> Whether it should loop or play once.
- You can also create your own animations, but the names of animations are defined in the game.
  - Some by the ThemeSettings
    - e.g. Background Objects, Background Layers
  - And some by internal game code
    - e.g. Players, Enemies
- Sometimes you only create an "animation" to reference a sprite (from a spritesheet) in the ThemeSettings editor. That means you don't create a real animation with frames, you just name a sprite to reference it later.
  - e.g. Background Objects.
- Some spritesheets don't support animations at all. Those use predefined sprite frame indexes for specific sprites.
  - e.g. `Enemy.sprite` or `Helmet.sprite`.
  	- For example, in the `Helmet.sprite` file, the `sprite frame` with index 7 is always the front-facing spiny helmet sprite no matter what.
  - You can read the full list on this page: [[sfmb_sprite_index]]{Sprite indexes}

## Hotkeys

- `Double-click`: Auto select area and offset of sprite
- `CTRL` + `Scroll wheel`: Zoom
- `W`, `A`, `D`, `X` keys: Move offset

# Workflows

- If you make changes to the `.png` files, make sure to press `Reload Image` on the `Home` tab in the SpriteEditor, so it displays the latest version of the spritesheet image.
- If you are working with HD sprites (@2x)
	- Check the `Load HD Texture` checkbox on the `Options etc.` tab.
	- If you are ripping sprites, use this tool to automate some of the steps: [Sprite rips to MM sprite resources](https://github.com/Marci599/sprite-rips-to-mm-sprite-resources)
- Regularly check for updates by pressing the `Check update` button on the `Options etc.` tab.
- Don’t forget to save regularly!

## Player sprites

- For all possible animations, you can check existing player `.sprite` files.
- When working with player sprites, you not only need to create and configure each `Sprite frame` and `Animation`, but also the helmet and propeller offsets. But before you do that, make sure that the `Helmet` resource (`.png` & `.sprite` files) is already created and configured.

### Helmets

- Click on the `Helmet` item and select a `Sprite frame` in the `Sprite frames` pane. If this doesn't make the helmet display in the `Preview` pane, click on one of the arrows in the `Home` tab.
  - ![img](https://github.com/user-attachments/assets/bc0d255c-f6d7-4669-848e-9ec7af0e2ea6)
  - ![img](https://github.com/user-attachments/assets/e55a72f9-b8dd-4ea8-b39f-5fbc521abdd6)
  - You can change which helmet is displayed by changing the selected item in the `Helmet preview`.
    - ![img](https://github.com/user-attachments/assets/a987aa88-67a7-4159-84b6-a35cfed83819)
- To change the helmet offset, use the arrow icons on the `Home` tab.
- You also need to define what direction the player is facing (if the head is visible) by selecting an item in `Face direction for Helmet`, so the correctly oriented helmet can be displayed.
  - ![img](https://github.com/user-attachments/assets/406bc0e0-5885-4f5b-b421-65998ffc698a)
- You can also change the angle of the helmet by adjusting the `FaceAngle` field in the `Properties` pane.
  - e.g. when the player is looking up or ground pounding
    - ![img](https://github.com/user-attachments/assets/858c1490-b047-400b-a267-ea7d2955a57b)

### Propeller

You only need to set this when configuring players with the propeller power-up.

- Click the `Propeller` item to work with it.
- It's basically the same as helmets, but without face directions.
- You can change its Z-order (to be behind or in front of the player sprite) or hide it completely for specific situations.
  - ![img](https://github.com/user-attachments/assets/570e226a-1103-4b83-8f39-40264c6c8a07)

## Enemies
- By default enemies have one full enemy spritesheet, that contains all the enemy sprites.
- If you don't want to use the full enemy spritesheet, you can create individual spritesheets for each enemy, by naming the sprite `E_{EnemyName}`.
	- e.g. `E_FireBro` or `E_Bowser`.
	- You can still keep the full enemy sprite sheet, because if there isn't an `E_{EnemyName}` override for an enemy, it will defualt back to the full enemy spritesheet.
   
- When working with enemies (either with the full enemies spritesheet or the individual enemy spritesheets), you need to configure their wing position(s) for each `Sprite frame`.
- Click the desired `Wing` item to work with it.
  - ![img](https://github.com/user-attachments/assets/c9855c3c-fad6-4e19-a101-e6ba478118d8)
  - `Wing1` is the left wing (default), `Wing2` is the right wing (can be set to display as a left wing) (optional).
  - You can set the offset of each wing separately.
- The workflow is very similar to helmets, but with different options.
- You can decide the `Wing style` of the sprite to display in-game:
  - ![img](https://github.com/user-attachments/assets/314c2e53-23a7-45e0-9cbd-3e0ab539c41c)
  - `Default` -> decided by the game.
  - `None   ` -> doesn’t display wings even if set.
  - `Single ` -> only displays `Wing1`.
  - `Double ` -> displays one left and one right wing.
  - `Double2` -> displays two left wings.
 
## Items
- By default items have one full item spritesheet, that contains all the item sprites.
- If you don't want to use the full item spritesheet, you can create individual spritesheets for each item, by naming the sprite `I_{ItemName}`.
	- e.g. `I_Coin` or `E_FireFlower`.
	- You can still keep the full item sprite sheet, because if there isn't an `I_{ItemName}` override for an item, it will defualt back to the full item spritesheet.


## Background layers

- Background layers must be named as the following: `Layer{DescriptiveName}`
	- e.g. `LayerOverworldHills`
- **Avoid using `FarBackground{something}.png` resources, it's obsolete!**
- You can set at what height the `Sprite frames` should display in-game by changing their `OffsetY` values
	- e.g. for clouds that appear and start repeating higher.
    - `OffsetY`: `0` means fixed to ground.
- You should always keep the `OffsetX` at `0`
	- ![img](https://github.com/user-attachments/assets/fe44f2ae-7d43-4505-aa65-cc25735acb1b)
- You can set the speed of the animation by adjusting the `Delay` in the `Properties` pane.
  
### Create new background layer

#### Static background layer

1. Add one `Sprite frame`.
2. Click the `Full image` button on the `Home` tab to automatically set the sprite area as the entire image and reset the offsets to zero.
   - ![img](https://github.com/user-attachments/assets/70f218dc-7967-4732-9cf9-911ab68dd3bd)

   
#### Animated background layers
1. Add a `Sprite frame` for each frame and adjust the area for each, while keepeing the `OffsetX` at `0` and set `OffsetY` as needed.
2. Make sure all `Sprite Frames` have the same size (width and height).
3. Add an animation and name it the same as the file.
    - e.g. File name: `LayerUnderground`, Aniamtion name: `Underground`
5. Set frame count of the `Animation` to the number of `Sprite Frames`.
    - ![img](https://github.com/user-attachments/assets/d6d0256f-98fe-4e1c-bf10-26245d868b39)


       
### Modify existing background layer

#### Static background layer

1. Select the first (and only) `Sprite Frame`.
2. Check and note the currently set `OffsetY`.
3. Click the `Full image` button on the `Home` tab to automatically set the sprite area as the entire image and reset the offsets to zero.
4. Re-enter the old `OffsetY`.
   
#### Animated background layer

1. Adjust the area of each `Sprite Frame` and adjust `OffsetY` if needed.
2. Make sure all `Sprite Frames` have the same size (width and height).
3. Adjust frame count of the `Animation` if you changed the number of `Sprite Frames`.

If you want to change how and what background layers appear in-game, please check this detailed tutorial: [[sfmb_tutorial_theme_settings]]{How to use ThemeSettings}.

# Fin.

That’s not all, but other things might be easier to figure out if you experiment with them. That’s one of the best ways to learn!

If something is still not clear, DM me, the author (**Marci599**) on Discord and I will try to help!


