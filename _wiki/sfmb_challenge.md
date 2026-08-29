---
layout  : wiki
title   : SFMB - Challenge
summary : How Challenge selects stages and handles lives, skips, rewards, and leaderboards.
date    : 2026-08-29 00:00:00 +0900
updated : 2026-08-29 16:46:02 +0900
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_main_menus]]
latex   : false
---
* TOC
{:toc}

# About Challenge

Challenge is a continuous run through a shuffled selection of eligible Stage World stages. The player chooses a difficulty and life setting, then tries to clear as many stages as possible before the run ends.

![Challenge selected on the SFMB main menu](/post-img/wiki/sfmb_main_menus/challenge.png)

The Challenge screen shows the route ahead, the next stage, remaining lives, stages cleared, stages skipped, and NeoCoin collected during the run.

> **TODO**
<!-- Add current screenshots of a bonus stage, the leaderboard, and the Challenge Summary. -->

# Starting a Challenge

After the Stage World data has loaded:

1. Select a difficulty.
2. Select a life setting.
3. Press **Play** to generate and begin the run.

![Challenge difficulty and life-mode selection screen](/post-img/wiki/sfmb_challenge/difficulty-and-options.png)

The available difficulties are **Easy**, **Normal**, **Hard**, **Expert**, **Hell**, and **Hell+**. Challenge uses the calculated difficulty assigned to each Stage World stage; it does not make the stage itself easier or harder.

## Life Settings

| Life setting | Starting lives | NeoCoin rewards |
|:---|:---:|:---:|
| Default | Depends on difficulty | Yes |
| 20 | 20 | No |
| 50 | 50 | No |
| Infinite | Infinite | No |
| Hardcore | 1 | No |

The **Default** setting starts with:

| Difficulty | Lives |
|:---|---:|
| Easy | 3 |
| Normal | 5 |
| Hard | 10 |
| Expert | 40 |
| Hell | 75 |
| Hell+ | 99 |

Only the Default life setting grants Challenge milestone rewards. The other settings can still be used for practice and their own leaderboard records.

# How Stages Are Selected

Challenge builds its candidate list from stages uploaded to Stage World. In the regular beta build, a stage must:

* Match the selected calculated difficulty
* Have a Moderator rating of at least 4
* Have been cleared at least five times
* Use Game Themes that are available and enabled in the player's Game Theme preferences
* Not have a disqualifying tag

Stages tagged **Broken**, **Buggy**, **Automatic**, **Troll**, **Music**, or **Exclude from challenge** are excluded. Stages using expired, removed, or rebuilding Game Themes are also excluded.

The remaining stages are shuffled before the run begins. Challenge may insert special bonus stages into the route after it is submitted to the server.

> **Note:** Changing your installed or preferred Game Themes changes which stages can qualify for your next Challenge run.

# During a Run

Each selected stage is downloaded or updated automatically before it starts. After clearing it, return to the Challenge route and select **Continue** to proceed to the next stage.

![Challenge route showing the next selected stage](/post-img/wiki/sfmb_challenge/route.png)

The run keeps track of:

* Remaining lives
* Stages cleared
* Stages skipped
* NeoCoin collected
* Deaths, ignored 1UPs, and enemies defeated for the final summary

Bonus stages are minigames placed between normal stages. Their results may add lives before the route continues.

Leaving a run for the title screen ends the current attempt. The game warns before doing so and then displays the Challenge Summary; the run cannot be resumed afterward.

# Skipping a Stage

Select **Skip this level** from the pause menu to move past the current stage. A normal manual skip costs NeoCoin according to the selected difficulty:

| Difficulty | Skip cost |
|:---|---:|
| Easy | 15 NeoCoin |
| Normal | 15 NeoCoin |
| Hard | 15 NeoCoin |
| Expert | 15 NeoCoin |
| Hell | 100 NeoCoin |
| Hell+ | 200 NeoCoin |

A skipped stage increases the run's skip count and does not count as a clear. If a stage cannot be loaded because it is no longer available, Challenge may offer a separate skip so the route can continue.

# Rewards

When playing with the **Default** life setting, clearing stages can award NeoCoin at server-defined milestones. Earned rewards are shown in a **Milestone reward** popup and added to the run's collected total.

Reward amounts and milestones may be changed on the server, so this page does not list fixed values.

# Leaderboards

The leaderboard can be opened from the Challenge screen. Records are separated by:

* Difficulty
* Life setting: Default, 20, 50, Infinite, and Hardcore

Each entry shows the player, number of stages cleared, number skipped, and record date. Rankings prioritize the run's clears after accounting for skips, then the total number of clears.

# Challenge Summary

A completed, abandoned, or failed run ends at the Challenge Summary. It records:

* Difficulty and life setting
* Stages cleared and skipped
* Deaths
* 1UPs ignored
* Enemies defeated
* NeoCoin collected

Returning to the title screen from the summary clears the finished run and prepares Challenge for a new attempt.

# Related Guides

* [[sfmb_main_menus]]{Main Menus} — Overview of Challenge and the other title-screen menus.
* [[sfmb_stage_world]]{Stage World Guide} — How community stages are browsed and played individually.
* [[sfmb_level_difficulty]]{Level Difficulty} — How Stage World difficulty is calculated.
* [[sfmb_stage_rating]]{Stage Rating} — How Stage Moderators rate stages.
* [[sfmb_exp_and_coin_table]]{EXP & Coin Table} — Other sources of EXP and NeoCoin.
