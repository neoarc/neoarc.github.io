---
layout  : wiki
title   : SFMB - How to make parallax or simple backgrounds
summary : 
date    : 2021-03-02 23:44:35 +0900
updated : 2022-08-23 08:23:23 +0900
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_tutorial]]
latex   : false
---
* TOC
{:toc}

# Summary
- This wiki explains how to make parallax or simple backgrounds using Theme version 2, since many of you haven't heard of it. There are plenty of options in theme version 2, such as: auto scroll backgrounds, custom scroll ratio, infinite custom sky colors and background objects, animated backgrounds, etc.... This wiki doesn't include all of these, but you can easily figure them out by yourself. I hope it helps!  

# 1. Preparing files
1. File names must start with the word "Layer" and then end with something that has to do with the background part itself. *e.g.* `LayerOverworld1` or `LayerSkyNight`.
2. Create a new sprite in the Sprite Editor or copy an existing one from somewhere, *e.g.* `Resources\GameThemes\SMAS\Sprite\LayerOverworldSky.sprite`.
	- Each layer png must have a `.sprite` file with the same name as the png.

# 2. Sprite editor
1. Open the one you want to start with. *e.g.* `LayerOverworld1.sprite`
2. If everything is right, you can see your background layer in the Sprite Editor. 
	- ![3](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678525-0e5e5d00-7bbe-11eb-9aa6-08c3ec84c983.png)
3. Create a new sprite frame if it doesn't exist, and then click on it.
4. Click on the `Full image` button.
5. Make sure the offset is `0`.
	- ![4 1](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678524-0e5e5d00-7bbe-11eb-90b8-45606f601478.png)
6. Delete the animation if it exists. (you only need it if you want to animate)
	- ![5](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678521-0dc5c680-7bbe-11eb-89e5-641f80611c49.png)
8. Do the same with the others.
	- However, if you're working with clouds, you can push them up by changing the y offset in the Sprite Editor.
	- ![cloud offset](https://user-images.githubusercontent.com/40640441/118363332-25450680-b594-11eb-93f1-a62958c315f4.png)

# 3. Map editor
1. Press the **Manage GameThemes** button in the Map Editor.
	- ![7](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678518-0d2d3000-7bbe-11eb-8af8-74484d40bd37.png)
2. You need to set the `Theme Version` to **2**
	- You can only rewrite it if you have permission for the theme or if it’s a custom theme.
	- ![8](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678517-0c949980-7bbe-11eb-8269-8ab5fd57b2f6.png)
3. Click the **Edit ThemeDefinitions** button.
4. Click **Background Layer**. 
5. You need to enter the file names here without the word "layer". *e.g:* `overworld1`.
	- ![9](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678506-0acad600-7bbe-11eb-9336-ffb279060458.png)
	- Just a few tips:
		1. I recommend setting most layers to `bottom` and if possible, set the clouds and underground parts to `bottom & repeat`. If you do it right, it will look the most natural.		
		2. I also recommend that if you're working with parallax, create a separate sky layer that is just as high as the game window and set it to `top and bottom`, **OR** clear the sky color from the background and set a custom sky color in the editor because then the color of the sky will change with wind, rain and lightnings.
			- ![tipp2](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678503-0a323f80-7bbe-11eb-874a-4fb85e6f0e29.png)
		4. But this is just my (author, not wiki owner) opinion, surely it can be solved differently to make it look nice, this must be experienced.
6. Adjust the scroll ratio around as it is in the original game, or as you like.
	- There is an option to make the scroll ratio x and y different, but this can cause a very unnatural look and should only be used in very specific cases.
	- ![10](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678512-0bfc0300-7bbe-11eb-8a9d-03736c36f45d.png)
7. Now you have to enter the same names for the layers in order (the first one is at the back) separated by commas without spaces.
	- ![11](/post-img/wiki/sfmb_betatest_how_to_make_parallax_background/109678510-0bfc0300-7bbe-11eb-950b-fca590cb76a7.png)

# FarBackground
- FarBackground is an obsolete way of creating backgrounds, please try to avoid them.
- If you're replacing farbackgrounds, be sure to include a file called `FarBackground{the name of the theme}.png.removed`

# Fin.
1. These are just the basics, there are still plenty of options in `Theme Version 2`.
2. If something is not understandable, DM to author (marci599), and if I'm available I will try to help.
