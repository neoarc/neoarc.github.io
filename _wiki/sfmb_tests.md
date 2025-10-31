---
layout  : wiki
title   : SFMB - Tests 
summary : 
date    : 2025-10-22 14:19:37 +0900
updated : 2025-11-01 00:53:25 +0900
tag     : sfmb
toc     : true
public  : true
parent  : sfmb_betatest
latex   : false
---
* TOC
{:toc}

# Introduction

- I prefer unit testing over complex live testing.
- This is because it's extremely difficult to precisely reproduce issues that occur under specific conditions in games.
	- This is due to the diverse positions and states of each object.
- Furthermore, since booting the game itself takes considerable time, repeatedly navigating to specific menus became tedious. Therefore, I implemented various unit tests for each part.
- This document aims to introduce the various unit tests I created and provide programs that allow you to run them (where possible).


