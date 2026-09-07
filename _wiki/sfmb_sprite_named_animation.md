---
layout  : wiki
title   : SFMB - Named animation definition
summary : 
date    : 2025-10-20 15:24:24 +0900
updated : 2026-09-07 11:40:40 +0900
tag     : sfmb 
toc     : true
public  : true
parent  : sfmb_contribute_sprite
latex   : false
---
* TOC
{:toc}

The preview generator uses only the configured themes, in the order shown on this page,
plus each theme's `BaseTheme` inheritance chain. Each preview shows the theme used for that sample.
If no preview appears, none of the configured themes defines that named animation.

<!-- AUTOGEN:START named_animation -->

These are the animation names SFMB looks up by name when it draws an object.
Adding an animation with one of these names to the matching `.sprite` file overrides the default sprite index based animation.
The Sprite Editor offers the same list in the `New Animation` dialog.

`TurnAround` style names are optional. When an object has no `TurnAround` animation it keeps playing its walking animation while it turns.

<!-- AUTOGEN:START named_animation -->

# Enemies

## AggressivePiranhaPlant

Sprite file: `E_AggressivePiranhaPlant.sprite`

* Die
* Idle

## AngrySun

Sprite file: `E_AngrySun.sprite`

* Dive
* Idle

## BallNChain

Sprite file: `E_BallNChain.sprite`

* Ball
* Chain

## BanzaiBill

Sprite file: `E_BanzaiBill.sprite`

* Idle

## Blooper

Sprite file: `E_Blooper.sprite`

* Die
* Idle
* Stacked
* Swim

## Bobomb

Sprite file: `E_Bobomb.sprite`

* Damaged
* DamagedIgnite1
* DamagedIgnite2
* Jump
* JumpIgnite1
* JumpIgnite2
* TurnAround
* TurnAroundIgnite1
* TurnAroundIgnite2
* Walk
* WalkIgnite1
* WalkIgnite2

## Boo

Sprite file: `E_Boo.sprite`

* Buddy1
* Buddy2
* Buddy3
* Idle
* Shy
* TurnAround
* TurnAroundBuddy1
* TurnAroundBuddy2
* TurnAroundBuddy3
* TurnAroundShy

## BoomBoom

Sprite file: `E_BoomBoom.sprite`

* Crouch
* Stomped
* Walk

## BoomerangBro

Sprite file: `E_BoomerangBros.sprite`

* AimWeapon
* Die
* Idle

## Bowser

Sprite file: `E_Bowser.sprite`

* AimFire
* DieBlooper
* DieBuzzyBeetle
* DieGoomba
* DieHammerBros
* DieKoopa
* DieLakitu
* DieSpiny
* Idle
* TurnAround

## BowserJunior

Sprite file: `E_BowserJunior.sprite`

* AimFire
* Idle
* ShellSpin
* TurnAround

## BulletBill

Sprite file: `E_BulletBill.sprite`

* Idle
* IdleRed

## BuzzyBeetle

Sprite file: `E_BuzzyBeetle.sprite`

* Die
* EmptyShellSpin
* ShellIdle
* ShellSpin
* TurnAround
* Walk

## CannonBall

Sprite file: `E_Cannon.sprite`

`CannonBall` and the [`Cannon`](#cannon) event object share the same `E_Cannon.sprite` file.
Keep the named animations for both objects in that file.

* CannonBall
* CannonBallRed

## ChainChomp

Sprite file: `E_ChainChomp.sprite`

* Chain
* Die
* Idle
* Stake

## ChainChompStake

Sprite file: `E_ChainChomp.sprite`

* Stake

## CharginChuck

Sprite file: `E_CharginChuck.sprite`

* BouncinIdle
* BouncinJump
* BouncinJumpSetup
* ClappinIdle
* ClappinIdleJump
* ClappinJump
* ClappinJumpClap
* ConfusedIdle
* ConfusedIdleBall
* ConfusedThrow
* ConfusedThrowJump
* DigginDig
* DigginDigSetup
* DigginIdle
* Idle
* LookoutJump
* LookoutRun
* LookoutTurn
* PassinIdle
* PassinKick
* SplittinIdle
* SplittinJump
* SplittinJumpSetup
* Stomped
* SwimDash
* SwimIdle

## CheepCheep

Sprite file: `E_CheepCheep.sprite`

* Die
* Idle
* TurnAround

## DryBone

Sprite file: `E_DryBone.sprite`

* Falter
* Stomped
* TurnAround
* Walk

## DryBowser

Sprite file: `E_DryBowser.sprite`

* AimFire
* Idle
* TurnAround

## Eerie

Sprite file: `E_Eerie.sprite`

* Idle

## FireBro

Sprite file: `E_FireBros.sprite`

* Die
* Idle
* ThrowFire

## FirePiranhaPlant

Sprite file: `E_FirePiranhaPlant.sprite`

* Die
* Idle
* LookDown
* LookUp

## FishBone

Sprite file: `E_FishBone.sprite`

* Idle
* SwimDash
* TurnAround

## Galoomba

Sprite file: `E_Galoomba.sprite`

* Die
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Goomba

Sprite file: `E_Goomba.sprite`

* Die
* Stomped
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Goombrat

Sprite file: `E_Goombrat.sprite`

* Die
* Stomped
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Goombud

Sprite file: `E_Goombud.sprite`

* Die
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Grinder

Sprite file: `E_Grinder.sprite`

* Idle

## HammerBro

Sprite file: `E_HammerBros.sprite`

* AimWeapon
* Die
* Idle

## HeavyBoomerangBro

Sprite file: `E_HeavyBoomerangBros.sprite`

* AimWeapon
* Die
* Idle
* ThrowWeapon

## HeavyFireBro

Sprite file: `E_HeavyFireBros.sprite`

* Die
* Idle
* ThrowFire

## HeavyIceBro

Sprite file: `E_HeavyIceBros.sprite`

* AimWeapon
* Die
* Idle
* ThrowWeapon

## IceBro

Sprite file: `E_IceBros.sprite`

* AimWeapon
* Die
* Idle

## JumpingPiranhaPlant

Sprite file: `E_JumpingPiranhaPlant.sprite`

* Chomp
* Die
* Idle
* MouthOpen
* MouthOpenFall

## Koopa

Sprite file: `E_Koopa.sprite`

* Die
* EmptyShellSpin
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Lakitu

Sprite file: `E_lakitu.sprite`

* Cloud
* Die
* Hide
* Idle

## MagiKoopa

Sprite file: `E_MagiKoopa.sprite`

* Aim
* Fall
* FindTarget
* Idle
* Laugh
* Teleport
* ThrowMagicBlast

## MontyMole

Sprite file: `E_MontyMole.sprite`

* Die
* Idle

## Muncher

Sprite file: `E_Muncher.sprite`

* Die
* Idle

## PiranhaPlant

Sprite file: `E_PiranhaPlant.sprite`

* Die
* Idle
* LookDown
* LookUp

## Podoboo

Sprite file: `E_Podoboo.sprite`

* Fly1
* Fly2
* Idle

## Pokey

Sprite file: `E_Pokey.sprite`

* Body
* BodyBottom
* Head

## RedCheepCheep

Sprite file: `E_RedCheepCheep.sprite`

* Die
* Idle
* TurnAround

## RedCheepCheepFly

Sprite file: `E_RedCheepCheep.sprite`

* Die
* Idle

## RedKoopa

Sprite file: `E_RedKoopa.sprite`

* Die
* EmptyShellSpin
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Rex

Sprite file: `E_Rex.sprite`

* SquishedWalk
* Stomped
* TurnAround
* TurnAroundSquished
* Walk

## RockyWrench

Sprite file: `E_RockyWrench.sprite`

* AimWeapon
* Die
* Fall
* Idle

## RotoDisc

Sprite file: `E_RotoDisc.sprite`

* Idle

## Sidestepper

Sprite file: `E_Sidestepper.sprite`

* TurnAround
* Walk
* WalkAngry

## SledgeBro

Sprite file: `E_SledgeBros.sprite`

* AimWeapon
* Die
* Idle
* ThrowWeapon

## SpikeTop

Sprite file: `E_SpikeTop.sprite`

* Die
* Stomped
* SwimDash
* SwimIdle
* Walk

## Spiny

Sprite file: `E_Spiny.sprite`

* Egg
* EmptyShellSpin
* Fly
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Stretch

Sprite file: `E_Stretch.sprite`

* Die
* Hiding
* TurnAround
* Walk

## Thwomp

Sprite file: `E_Thwomp.sprite`

* Anger
* HorzAnger
* HorzNear
* Idle
* Near
* UpAnger
* UpNear

## Wiggler

Sprite file: `E_Wiggler.sprite`

* AngerBody
* AngerHead
* Body
* Head
* TurnAround
* TurnAroundAnger

## WigglerBody

Sprite file: `E_Wiggler.sprite`

* AngerBody
* Body

# Event objects

## Cannon

Sprite file: `E_Cannon.sprite`

`Cannon` shares `E_Cannon.sprite` with the [`CannonBall`](#cannonball) enemy.

* Body
* BodyRed
* Head
* HeadRed

## CheckPointFlag

Sprite file: `O_CheckPointFlag.sprite`

* Costume
* Hit
* Idle
* Luigi
* Mario
* Peach
* Toad

## FlagPole

Sprite file: `O_FlagPole.sprite`

* Body
* Costume
* Flag
* Head
* Luigi
* Mario
* Peach
* Toad

## OneWayWall

Sprite file: `O_OneWayWall.sprite`

* Idle

# Items

## BigCoin

Sprite files: `I_10Coin.sprite`, `I_30Coin.sprite`, `I_50Coin.sprite`

* Idle

## BoomerangFlower

Sprite file: `I_BoomerangFlower.sprite`

* Idle

## Clock

Sprite file: `I_Clock.sprite`

* Idle

## CloudFlower

Sprite file: `I_CloudFlower.sprite`

* Idle

## DoorKey

Sprite file: `I_Key.sprite`

* Idle

## DoorKeyCoin

Sprite file: `I_KeyCoin.sprite`

* Idle

## Flowers

A shared base class for Fire Flower, Ice Flower, Bubble Flower and Superball Flower.
Sprite files: `I_FireFlower.sprite`, `I_IceFlower.sprite`, `I_BubbleFlower.sprite`, `I_SuperBallFlower.sprite`
`Idle` works for each of these files.
Boomerang Flower, Cloud Flower and Following Cloud have their own entries above.

Because the base class itself is not registered as an object type, the Sprite Editor does not offer this name in its `New Animation` dialog. Type it by hand.

* Idle

## FollowingCloud

Sprite file: `I_FollowingCloud.sprite`

* Idle

## GiantMushroom

Sprite file: `I_MegaMushroom.sprite`

* Idle

## Heart

Sprite file: `I_Heart.sprite`

* Idle

## HeartContainer

Sprite file: `I_HeartContainer.sprite`

* Idle

## MagicOrb

Sprite file: `I_MagicOrb.sprite`

* Idle

## Moon3UP

Sprite file: `I_3UP.sprite`

* Idle

## Mushroom

Sprite files: `I_Mushroom.sprite`, `I_1UP.sprite`

* Idle

## PoisonMushroom

Sprite file: `I_PoisonMushroom.sprite`

* Idle

## PropellerMushroom

Sprite file: `I_PropellerMushroom.sprite`

* Idle
* Propeller

## RottenMushroom

Sprite file: `I_RottenMushroom.sprite`

* Idle

## StaticCoin

Sprite file: `I_Coin.sprite`

* Idle

## Suits

A shared base class for Frog Suit, Hammer Suit, Tanooki Suit and Penguin Suit.
Sprite files: `I_FrogSuit.sprite`, `I_HammerSuit.sprite`, `I_TanookiSuit.sprite`, `I_PenguinSuit.sprite`
`Idle` works for each of these files.

Because the base class itself is not registered as an object type, the Sprite Editor does not offer this name in its `New Animation` dialog. Type it by hand.

* Idle

## SuperLeaf

Sprite file: `I_SuperLeaf.sprite`

* Idle
* InItemBox

## SuperStar

Sprite file: `I_SuperStar.sprite`

* Idle

## TurtleShell

Sprite file: `I_BlueShell.sprite`

* Idle

# Vehicles

## Cloud

* Cloud

## Yoshi

Sprite files: `V_Yoshi.sprite`, `V_YoshiRed.sprite`, `V_YoshiYellow.sprite`, `V_YoshiBlue.sprite`

* Attack
* BabyCarried
* BabyIdle
* BabySwallow
* Crouch
* Egg
* Fall
* FallPanic
* Hatch
* Idle
* IdleWait
* Jump
* JumpPanic
* Walk
* WalkPanic

# Player

Mario, Luigi, Toad and Peach share one animation list.
The names below are offered for every player sprite regardless of its power-up shape.

## PlayerSmall

* AirSpin
* Break
* CarryCrouch
* CarryFlutterJump
* CarryIdle
* CarryJump
* CarryLookUp
* CarryRun
* CarrySwim
* Climb
* ClimbBack
* ClimbBackIdle
* ClimbIdle
* Crouch
* CrouchFloat
* Die
* DieFreeze
* DropDash
* Float
* FlutterJump
* Glide
* GlideClimb
* GlideClimbTop
* GlideFall
* GlideSlide
* GlideTurn
* GroundPound
* Head
* Idle
* Jump
* Jump2
* Jump3
* Jump4
* JumpDown
* JumpDown2
* JumpDown3
* Kick
* LookUp
* PipeDown
* PipeUp
* Ride
* RideCommand
* Roll
* Run
* RunMax
* Sit
* Skid
* Slide
* SpinDash
* SpinJump
* Swim
* SwimIdle
* Walk
* WallSlide

## Shape specific animations

These are offered only when the sprite file name ends with the matching power-up name,
for example `MarioRaccoon.sprite` or `LuigiPenguin.sprite`.

* **Big** : ToGiant
* **Fire** : ThrowFire
* **Frog** : FrogSwimDown, FrogSwimIdle, FrogSwimSide, FrogSwimUp
* **Penguin** : PenguinSlide, PenguinSwimDown, PenguinSwimIdle, PenguinSwimSide, PenguinSwimUp
* **Propeller** : PropellerFall, PropellerJump, PropellerSpin
* **Raccoon** : Statue
* **Raccoon / Tanooki** : RaccoonAttack, RaccoonCarryCrouchFloat, RaccoonCarryFloat, RaccoonCrouchFloat, RaccoonFloat, RaccoonFly
* **Shell** : ShellRun, ShellSlide
* **Boomerang / Penguin / Ice / Bubble** : ThrowWeapon

<!-- AUTOGEN:END named_animation -->
