---
layout  : wiki
title   : SFMB - Getting Started
summary : How beta testers install, launch, update, and configure SFMB.
date    : 2026-08-29 00:00:00 +0900
updated : 2026-08-29 00:00:00 +0900
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_betatest]]
latex   : false
---
* TOC
{:toc}

> **New to the beta server? Read the [[sfmb_betatest_community_rules]]{Community Rules} first.**
>
> The rules explain how a new server member becomes a Beta Tester and how to receive the downloader and download the game. Complete that process before continuing with this guide.

# Before You Start

SFMB is currently distributed to accepted beta testers. Before launching the game, make sure that:

* You are using Windows, the officially supported and tested platform.
* The Discord desktop app is installed and running.
* Discord is signed in with the account connected to your SFMB beta access.
* You have a working Internet connection.

SFMB may also run under Wine, but this is an unofficial setup. Wine environments are not supported or included in development testing, and the developer cannot take responsibility for problems specific to running the game this way.

# Install SFMB

Follow the Beta Tester promotion and download instructions in the [[sfmb_betatest_community_rules/#for-newbies]]{Community Rules}. `MarioDownloader` is delivered to each user privately by SFMB-Bot. Use only the downloader provided this way, and do not download game builds from unofficial sources.

You may install SFMB on more than one computer. However, the same account cannot run the game on multiple computers at the same time: starting another session invalidates the session already running on the other computer.

# Launch and Sign In

1. Start the Discord desktop app and sign in with your beta tester account.
1. Run `Mario.exe`.
1. Wait while SFMB verifies your Discord account and beta access.
1. After login succeeds, allow the updater to finish if an update is available.

SFMB does not use a separate game password. If you lose access to the Discord account linked to SFMB, contact the developer to have another Discord account linked to your game account.

If the game cannot verify you, first check that Discord is running with the correct account and that the account still has access to the beta community.

> **Note:** In some cases, a firewall or Internet service provider (ISP) may prevent the game from connecting to the SFMB server. If your Discord account and beta access are correct but the game still cannot connect, check your firewall settings and network connection. Trying another network can help determine whether the ISP or current network is blocking the connection.

# Updates and File Recovery

After login succeeds, SFMB checks for updates and downloads files that are missing or out of date. Updates do not proceed if the game cannot log in.

If an installed file was deleted or damaged, try one of these methods:

* [Run a force update](sfmb://forceupdate).
* Run `Mario.exe -forceupdate` from the command line.

If `Mario.exe` itself is missing, neither method can start the updater. Run `MarioDownloader` again to restore the game files.

# Configure the Game

Run `MarioConfig.exe` to configure SFMB. It includes settings for:

* Keyboard and controller input
* Sound effect and music volume
* Window size and display behavior

Nintendo Switch Pro Controller users can also follow the [[sfmb_how_to_setup_pro_controller]]{Pro Controller Setup Guide}.

# First Steps In-Game

After SFMB opens successfully, see [[sfmb_main_menus]]{Main Menus} for an overview of the title screen and its major features, including stages, creation tools, profile statistics, community menus, the Shop, and the Inventory.

# If Something Goes Wrong

Check the following before asking for help:

1. Discord is open and signed in with the correct account.
1. Your Internet connection is working.
1. Any pending game update has finished.
1. You have tried a force update if files appear to be missing.

See [[sfmb_trouble_shooting]]{Troubleshooting} for known fixes or [[sfmb_frequently_asked_question]]{Frequently Asked Questions} for general information.
