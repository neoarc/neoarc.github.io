---
layout  : wiki
title   : How to make parallex background in SFMB
summary : 
date    : 2021-03-02 23:44:35 +0900
updated : 2021-03-03 00:43:23 +0900
tag     : sfmb_betatest
toc     : true
public  : false
comment : false
parent  : [[sfmb_betatest_tutorial]]
latex   : false
---
* TOC
{:toc}

# Summary
- TODO

# 1. Preparing files
1. File names must begin with a Layer and end with a number. *eg.* `LayerOverworld1`
2. Copy a `.sprite` file from somewhere, *eg.* `Resources\GameThemes\SMAS\Sprite\LayerOverworldSky.sprite`.
- Each layer png must have a `.sprite` file with the same name as png.

# 2. Sprite editor
3. Open the one you want to start with. *eg.* `LayerOverworld.sprite`
4. If everything right, you need to see the picture in the SpriteEditor. 
5. Click the first sprite frame.
6. Double click on the image.
- Make sure the entire image is selected.
7. Rewrite the offset to `0`.
8. Do the same with the others. 
- However, the clouds on the png. should also be as high as in the game *eg.* `NSMBWii`.

# 3. Map editor
9. Press the **Manage GameThemes** button in the mapeditor.
10. You need to set the `Theme Version` to **2** 
11. Press the **Edit ThemeDefinitions**.
- You can only rewrite if you have permission fot the theme or it’s a custom theme.
12. Press **Background Layer**. 
13. You must enter here the names you entered for the animation names.
- Just a few tips:
	1. If you are making a parallax background, I recommend setting the layers to `bottom`, since the `top and bottom` work pretty weird at the moment. If you are doing it well, it will look the most natural. but since it is set to `bottom`, try to make the cloud png as high as possible. (like SMAS clouds - maybe higher)
	2. I also recommend that you have a separate sky layer that is just as high as the game window and set to `top and bottom`, or clear the sky color from the picture and set a custom sky color in the editor because the color of the sky will change with wind and rain
	3. But this is just my opinion, surely it can be solved differently to look nice, this must be experienced.
14. Adjust the scroll ratio around as it is in the original game, or as you like.
15. Now you have to enter the same names for the layers in order (the first one is at the back) separated with commas without spaces.

# FarBackground
16. If you make a parallax background, then farbackground is basically just a preview. You have to includes all layers in one png, and if you want to save space, have an image size of 512x127.
13. But these are also just the basics, there are still plenty of options in `Theme Version 2`.

# Fin
If something is not understandable, DM to me(Marci599#6148), and if I available I will try to help.

