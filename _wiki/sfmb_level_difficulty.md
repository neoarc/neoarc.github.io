---
layout  : wiki
title   : SFMB - Difficulty calculation
summary : 
date    : 2022-04-13 09:49:10 +0900
updated : 2026-08-13 02:13:39 +0900
tag     : sfmb
toc     : true
public  : true
parent  : sfmb_betatest
comment : true
latex   : false
---
* TOC
{:toc}

# How difficult work?

- Level difficulty is automatically calculated from the clear count and the death count of the level (=Clear rate).
- `Clear rate = Cleared / (Cleared + Failed) x 100`
- A level that has never been cleared by anyone has no clear rate, so it is treated as `incompleted` and shown with an unknown difficulty icon.

## Exact value

| Level | Name | Clear rate | Tooltip in game |
|:---:|:---|:---|:---|
| 1 | EASY | 50 ~ 100 % | `ClearRate 50~100%` |
| 2 | NORMAL | 20 ~ 50 % | `ClearRate 20~50%` |
| 3 | HARD | 5 ~ 20 % | `ClearRate 5~20%` |
| 4 | EXPERT | 1 ~ 5 % | `ClearRate 1~5%` |
| 5 | HELL | 0.5 ~ 1 % | `ClearRate 0.5~1%` |
| 6 | HELL+ | 0 ~ 0.5 % | `ClearRate 0~0.5%` |
| 7 | (incompleted) | never cleared | - |

- A boundary value belongs to the harder level. For example a clear rate of exactly 20 % is `HARD`, not `NORMAL`.
- Level 1 ~ 6 each have their own icon. It is used by the stage list, the stage detail panel and the difficulty filter.
- Level 7 (`incompleted`) means nobody has cleared the level yet. It has no icon of its own.
- Independently of the value above, a level that has almost no play record (cleared 1 time or less, and no death recorded) is drawn with the unknown difficulty icon.
- The names `EASY` ~ `HELL+` are the same names Challenge mode uses for its six difficulties.

## Side note - Mario Maker

- 20 ~ 100 % : EASY
- 8 ~ 20 % : NORMAL
- 1 ~ 8 % : EXPERT
- 0 ~ 1 % : SUPER EXPERT
