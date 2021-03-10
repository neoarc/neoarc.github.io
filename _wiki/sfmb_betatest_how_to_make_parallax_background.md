---
layout  : wiki
title   : How to make parallax background in SFMB
summary : 
date    : 2021-03-02 23:44:35 +0900
updated : 2021-03-09 13:31:56 +0900
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
- This wiki explains how to make parallax backgrounds using Theme version 2, since many of you haven't heard of it, there are plenty of options in theme version 2, such as: auto scroll background, custom scroll ratio, infinite custom sky color and background object, animated background, etc.... This wiki doesn't include all of these, but you can easily figure it out for yourself. I hope it helps!  

# 1. Preparing files
1. File names must begin with a Layer and end with a number. *eg.* `LayerOverworld1`
2. Copy a `.sprite` file from somewhere, *eg.* `Resources\GameThemes\SMAS\Sprite\LayerOverworldSky.sprite`.
- Each layer png must have a `.sprite` file with the same name as png.

# 2. Sprite editor
3. Open the one you want to start with. *eg.* `LayerOverworld1.sprite`
5. If everything right, you need to see the picture in the SpriteEditor. 
- ![3](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678525-0e5e5d00-7bbe-11eb-9aa6-08c3ec84c983.png)
6. Click the first sprite frame.
8. Double click on the image.
- Make sure the entire image is selected.
- ![4 2](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678507-0b636c80-7bbe-11eb-9ee9-6157f94d8f75.png)
7. Rewrite the offset to `0`.
- ![4 1](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678524-0e5e5d00-7bbe-11eb-90b8-45606f601478.png)
8. Delete the animation
9. Add a new one with a name to refer to later. like overworld1 i recommend putting a number on each end because sometimes it doesn't work without it.
- ![5](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678521-0dc5c680-7bbe-11eb-89e5-641f80611c49.png)
10. Do the same with the others. 
- However, the clouds on the png. should also be as high as in the game *eg.* `NSMBWii`.
- ![6](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678519-0dc5c680-7bbe-11eb-84d0-381bb8c356a2.png)

# 3. Map editor
9. Press the **Manage GameThemes** button in the mapeditor.
- ![7](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678518-0d2d3000-7bbe-11eb-8af8-74484d40bd37.png)
11. You need to set the `Theme Version` to **2**
- ![8](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678517-0c949980-7bbe-11eb-8269-8ab5fd57b2f6.png)
13. Press the **Edit ThemeDefinitions**.
- You can only rewrite if you have permission for the theme or it’s a custom theme.
12. Press **Background Layer**. 
13. You must enter here the names you entered for the animation names.
- ![9](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678506-0acad600-7bbe-11eb-9336-ffb279060458.png)
- Just a few tips:
	1. If you are making a parallax background, I recommend setting the layers to `bottom`, since the `top and bottom` work pretty weird at the moment. If you are doing it well, it will look the most natural. but since it is set to `bottom`, try to make the cloud png as high as possible. (like SMAS clouds - maybe higher)
		- ![tipp1](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678513-0c949980-7bbe-11eb-996d-b70dc6786e50.png)
	3. I also recommend that you have a separate sky layer that is just as high as the game window and set to `top and bottom`, or clear the sky color from the picture and set a custom sky color in the editor because the color of the sky will change with wind and rain
		- ![tipp2](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678503-0a323f80-7bbe-11eb-874a-4fb85e6f0e29.png)
	5. But this is just my(author, not wiki owner) opinion, surely it can be solved differently to look nice, this must be experienced.
14. Adjust the scroll ratio around as it is in the original game, or as you like.
- ![10](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678512-0bfc0300-7bbe-11eb-8a9d-03736c36f45d.png)
16. Now you have to enter the same names for the layers in order (the first one is at the back) separated with commas without spaces.
- ![11](/post-img/_wiki/sfmb_betatest_how_to_make_parallax_background/109678510-0bfc0300-7bbe-11eb-950b-fca590cb76a7.png)

# FarBackground
16. If you make a parallax background, then farbackground is basically just a preview. You have to includes all layers in one png, and if you want to save space, have an image size of 512x127.
13. But these are also just the basics, there are still plenty of options in `Theme Version 2`.

# Fin.
If something is not understandable, DM to author(Marci599#6148), and if I available I will try to help.

