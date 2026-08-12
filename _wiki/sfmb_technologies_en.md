---
layout  : wiki
title   : SFMB - Technologies (EN)
summary : 
date    : 2025-10-22 14:18:48 +0900
updated : 2026-06-10 00:00:00 +0900
tag     : sfmb
toc     : true
public  : true
parent  : sfmb_betatest
latex   : false
---
* TOC
{:toc}

# Introduction

This document lists and explains the technologies used to develop SFMB.

# Development tools

- As development spanned a long time, the toolchain was continuously updated to newer versions.
	- Visual Studio 2015
	- Visual Studio 2017
	- Visual Studio 2019
	- Visual Studio 2022
- Visual Studio Code
	- Used only for server and bot development.

# Programming languages

- C++ 17
- Javascript (NodeJS)

# Game engine

## Core libraries

### NaLib

- A library of foundational code, written by hand, expected to be reusable beyond just the game.
- Developed with cross-platform support in mind, based on experience from a previous job.
- "Na" is short for NeoArc, used as a class prefix. ~~It does not mean sodium.~~
- In practice, NaLib holds much of SFMB's core code, and SFMB is built on top of it.

### ExtLib

- A bundle of open-source libraries.
- Box2D
	- The well-known 2D physics engine used in games like Angry Birds.
	- Brought in to try replacing the game's physics engine, but ended up unused.
- catch2
	- Unit testing framework
- cppcodec
- cxxopts
- dirent
	- Filesystem-related library
	- Used in the early implementation, but became unnecessary after moving to modern C++.
- fmt
	- String formatting library
- JsonLib
- libpng
- magic_enum
- MemoryModule
- miniz
- miniz-cpp
- msgpack
- PicoSHA2
- zlib
- discordbuddy
	- A hand-ported reimplementation of BatteryShark's discordbuddy
- discord-rpc
- discord-sdk
	- Used for Discord Rich Presence
- rapidjson
	- Included because the discord library uses it.
- curl
	- Networking library
- DirectX 9.1
- OpenGL
- SDL
- FMOD
- BASE

## Render engine

- Initially built around DirectX 9.1, then abstracted to try supporting OpenGL.
- The following features were implemented for each renderer:
	- Letterboxing (preserving the content's aspect ratio and filling the rest with black)
	- Bitmap loading (bmp, png)
	- Drawing a portion of a texture at a desired position
		- Rotation
	- Creating custom textures
	- Effects via pixel shaders
	- Text output with Windows fonts

### Pixel shaders

- Mostly used for color conversion.
- Still a beginner-level implementation.

## Sprite handling

- Loads the texture suited to the required theme, and uses the .sprite file to control the sub-region data of the sprite sheet.
- HD textures
	- If a file matching (texture filename) + @2x exists, it is loaded as an HD texture.
	- A 2x-size texture is loaded and rendered scaled down to 50%.
- Each frame, the sprites to be drawn are gathered, sorted by Z-order, and rendered in order.

## Input handling

### DirectInput

- Joystick input handling
	- Joystick input is analyzed and translated into keyboard input.
- Keyboard input handling

### Mouse

- Mouse input simply uses the mouse messages (WM_MOUSE...).
- The UI engine converts mouse clicks into button clicks.

## Sound handling

### FMod

- Used to play mp3, ogg, and wav files.
- Supports simultaneous multi-channel playback and per-channel volume.
- Supports loop points.

### BASE

- Used to implement music blocks differently from Mario Maker.
- Can load sound fonts and play MIDI music.

## Scene

- Implemented as a state machine.
- Mainly handles transitions from one scene to another.
	- Automatically after a certain time
	- Through the UI
- Some transitions are requested by the player object.
- During a transition, a dedicated effect (fade, circle, curtain, etc.) is also played.

## Networking

- Most in-game networking is processed on a transaction thread to keep it asynchronous.
- When a networking task on the transaction thread finishes, it calls a callback implemented within the GameState.

## Game objects

- Implemented as a state machine.
- All game objects share a common list of states.
	- Idle
	- Walk
	- Jump
	- Swim
	- SpinJump
	- GroundPound
	- WallSlide
	- PropellerJump
	- Die
	- ...
	- More than 150 such states are defined.
- Originally implemented with raw pointers, but after hitting limits tracking down mysterious crashes, the structure was later improved.

## Stage

- One of the classes with the most code in the game.
- Manages the tile map.
- Manages the live objects within the map.

## Camera

- The class that handles which part of the stage to show.
- Ground shaking and forced scrolling are also handled through the camera.

## Physics engine

- Built by hand, implemented in a brute-force way.
- Its structure was heavily reworked for performance whenever it hit a wall.
- Roughly, it does the following *every frame*:
	- Gathers all live objects in the stage
	- Moves each object to its target position based on its current speed
	- Checks whether each object collides with tiles
		- If it collides, sets flags per tile type
			- Normal tile
			- Jump block
			- Marimba block
			- Water
			- Lava
			- Poison
			- Star block / Death block
	- Checks whether each object collides with slopes and corrects position/speed
	- Compares objects against each other to check for collisions (N^2)
		- Uses AABB by default, but also supports circular hitboxes and objects with multiple hitboxes
		- Builds and stores a list of mutually colliding objects
	- Processes feedback based on the state of the colliding objects
		- Just remembers the collision state (default)
		- Pushed apart (when one object does not allow overlap)
		- Ridden on top (platforms, etc.)
	- Restores each object to its original position

## UI engine

- Built by hand, with only the minimal components and features needed.
- Basic components
	- Panel
	- Container
	- Text
	- AreaText
	- Button
	- ImageButton
	- CheckBox
	- Edit
	- Spin
	- Rectangle (Image)
	- AnimationRectangle
	- Tooltip
	- Popup
	- List
	- VirtualList
	- ScrollForm
- Game-specific components
	- AbilityFlagImage (ability display)
	- CountryFlagTextButton (country flag button)
	- UserAvatarButton / UserNameButton (user avatar/name button)
	- SingleStageButton / WorldStageButton (stage button)
	- CustomGameButton
	- CommentDollEdit
- A separate editing tool was also built to make laying out UI screens easier.

# Game

## Application

### Windows

- Implemented as a Win32 application.
- Creates a window and passes the window handle to DirectX / OpenGL for rendering.
- For SDL, window creation is handled by SDL itself, so it is done differently.

#### CustomURL Scheme

- Used to implement various integrations through the "sfmb://" protocol.
- The CustomURL scheme is registered on game launch (written directly to the registry).
- Used for Force Update and Direct Play.

### MAC OS

- (Hard to remember exactly, as it was long ago) Developed as an application with a GLView.
- A GLView can be thought of as a prebuilt window that supports OpenGL.

## Scenes

- The game is composed of many scenes; grouped by purpose:

### Startup / system

- Logo
- Title
- RegisterUser
- Profile
- Credits
- AppUpdate
- GameThemeUpdate
- SystemAlert
- ErrorMessage

### World / stage selection

- WorldStage
- WorldStageDirectPlay
- LocalStagePack
- EnterStage
- StageIntro / SkyIntro

### In-play movement / events

- Enter/Exit Door, Pipe, Warp, Sky
- PageScroll
- Play
- NpcTalk / Speech
- MessageBlock
- ShapeChange
- LoseHP
- Die

### Clear / end

- Goal
- HitGoalBox / HitGoalOrb / HitGoalPost
- FlagDown
- CutBridge
- RescuePrincess
- SingleStageClear / SingleStageGameOver
- GameOver
- TimeUp

### Other modes / features

- ChallengeMode / ChallengeSummary
- MiniGame
- Gallery / Showcase
- ReportStage
- ShowUserList
- ManageDevice
- Pause
- AvatarPaint
	- A paint feature for drawing your own avatar, implemented by hand. (canvas 144 x 144)
	- Pencil, Eraser, Bucket tools
	- Color palette
	- Undo / Redo (up to 10 steps)
	- Grid display toggle
	- Multiple slots + copy between slots
	- Animation support
	- Presets provided
	- Export

# Map editor

## Toolbar

- Originally written as an MDI application with a toolbar.
- As the toolbar buttons grew, the icons became hard to tell apart and felt cluttered, so the toolbar was replaced with a ribbon bar.

### Dynamic ribbon construction

- Rather than building the ribbon bar with MFC's designer, the menus are constructed dynamically at the code level.
	- The bitmaps used as icons are also generated dynamically from the DesignPalette image.
- The menu layout is sent from the server.
	- That is, it was designed so the game cannot be played via an offline crack. (since 7.0)

#### Dynamic Design Palette switching

- Because each theme needs different icons, the entire ribbon bar's icons are reloaded whenever the active stage changes.
- It gathers every button control and replaces them with newly generated bitmaps.
- For this, it uses a hand-built class instead of the default ribbon button.

## Property window

- Uses MFC's PropertyGrid.
- By inheriting the NaPropertyObjectBase class, the properties of any implemented object can be shown easily.
- Custom PropertyItem classes were implemented as needed for certain property value types.
	- Bool : shows a checkbox instead of selecting true/false
	- Enum(int) : actually an int value, but shown as meaningful text rather than a magic number
	- Color(int) : clicking opens a custom color picker
	- Extended : shows the value field as a button that opens a separate editor on click

## Status bar

- Shows information needed while editing, such as the current cursor position (tile coordinates), the active stage info, and the selected object.

## Document window

- The inside of the MDI Document is drawn directly by the game engine.
- For high performance, only a single frame is rendered when a WM_PAINT message occurs.

## Dialogs

- The map editor has many dedicated windows for managing themes and various resources.

### Theme / background

- Theme management window (clone game theme, manage theme settings)
- Theme definition window (sky color, parallax background, background objects, etc. / see [[sfmb_tutorial_theme_settings]])
- Theme selection window
- Custom theme selection window

### Pixel art management window

- Import from a file
- Favorites
- Animation frame selection
- A paint feature is implemented by hand.
	- Pencil, Eraser, MagicEraser, Bucket, ColorPicker tools
	- Color palette / color spectrum
	- Undo / Redo
	- Grid display toggle
	- Canvas size change

### Pixel art creation window

- Creates a new pixel art by selecting a canvas size.

### Custom enemy / block management window

- Custom enemy management / gallery / favorites
- Character definition editing
- Custom block management

### Costume / character / ability selection window

- Costume selection
- Character selection
- Weapon position selection
- Voice type selection

### AbilityFlag selection window

- Select the ability flags (AbilityFlag) an object will have
- Manage ability presets

### Music / sound window

- Background music selection
- Sound effect selection
- Music block helper / tuner

### Others

- Stage preview
- Sub-stage settings
- Object list
- Tag selection
- Tileset import
- Live text editing
- Creator comment

# Game server

- At first, online mode was serverless, with no server app.
- After a hack wiped out the entire server database, a server app was developed to prevent it from happening again.
- Implemented in Node.js
	- Express : communication with the game, stage upload handling
	- Firebase : stores users, stages, leaderboards, ban lists, etc.
	- Integrates with Google Sheets, Discord
	- The operating environment is split into alpha / beta
- The cloud setup process is documented in [[make_nodejs_server_on_oracle_cloud]].

# Discord bot

- A separate bot for running the beta-test community (Discord server), also implemented in Node.js.
	- discord.js : slash commands, modal input handling
	- canvas, gifencoder : profile card, GIF image generation
	- Commands are split by permission level (regular / moderator / admin, etc.)
