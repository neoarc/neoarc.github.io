---
layout  : wiki
title   : SFMB - Named animation definition
summary : 
date    : 2025-10-20 15:24:24 +0900
updated : 2026-09-02 11:49:36 +0900
tag     : sfmb 
toc     : true
public  : true
parent  : sfmb_contribute_sprite
latex   : false
---
* TOC
{:toc}

The preview generator uses the default `SMB` theme unless another theme is specified.
Named animations are theme-specific, so an animation without a preview is not defined by the generated theme.

<!-- AUTOGEN:START named_animation -->

These are the animation names SFMB looks up by name when it draws an object.
Adding an animation with one of these names to the matching `.sprite` file overrides the default sprite index based animation.
The Sprite Editor offers the same list in the `New Animation` dialog.

`TurnAround` style names are optional. When an object has no `TurnAround` animation it keeps playing its walking animation while it turns.

<!-- AUTOGEN:START named_animation -->

# Enemies

## AngrySun

* Dive
* Idle

## BallNChain

* Ball
* Chain

## BanzaiBill

* Idle

## Blooper

* Die
* Idle
* Stacked
* Swim

## Bobomb

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

* Crouch
* Stomped
* Walk

## BoomerangBro

* AimWeapon
* Die
* Idle

## Bowser

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

* AimFire
* Idle
* ShellSpin
* TurnAround

## BulletBill

* Idle
* IdleRed

## BuzzyBeetle

* Die
* EmptyShellSpin
* ShellIdle
* ShellSpin
* TurnAround
* Walk

## CannonBall

`CannonBall` and the [`Cannon`](#cannon) event object share the same `E_Cannon.sprite` file.
Keep the named animations for both objects in that file.

* CannonBall
* CannonBallRed

## ChainChomp

* Chain
* Die
* Idle
* Stake

## ChainChompStake

* Stake

## CharginChuck

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

* Die
* Idle
* TurnAround

## DryBone

* Falter
* Stomped
* TurnAround
* Walk

## DryBowser

* AimFire
* Idle
* TurnAround

## Eerie

* Idle

## FireBro

* Die
* Idle
* ThrowFire

## FishBone

* Idle
* SwimDash
* TurnAround

## Galoomba

* Die
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Goomba

* Die
* Stomped
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Goombrat

* Die
* Stomped
* SwimDash
* SwimIdle
* TurnAround
* Walk

## Grinder

* Idle

## HammerBro

* AimWeapon
* Die
* Idle

## HeavyBoomerangBro

* AimWeapon
* Die
* Idle
* ThrowWeapon

## HeavyFireBro

* Die
* Idle
* ThrowFire

## HeavyIceBro

* AimWeapon
* Die
* Idle
* ThrowWeapon

## IceBro

* AimWeapon
* Die
* Idle

## JumpingPiranhaPlant

* Chomp
* Die
* Idle
* MouthOpen
* MouthOpenFall

## Koopa

* Die
* EmptyShellSpin
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Lakitu

* Cloud
* Die
* Hide
* Idle

## MagiKoopa

* Aim
* Fall
* FindTarget
* Idle
* Laugh
* Teleport
* ThrowMagicBlast

## MontyMole

* Die
* Idle

## PiranhaPlant

* Die
* Idle
* LookDown
* LookUp

## Podoboo

* Fly1
* Fly2
* Idle

## Pokey

* Body
* BodyBottom
* Head

## RedCheepCheep

* Die
* Idle
* TurnAround

## RedCheepCheepFly

* Die
* Idle

## RedKoopa

* Die
* EmptyShellSpin
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Rex

* SquishedWalk
* Stomped
* TurnAround
* TurnAroundSquished
* Walk

## RockyWrench

* AimWeapon
* Die
* Fall
* Idle

## RotoDisc

* Idle

## Sidestepper

* TurnAround
* Walk
* WalkAngry

## SledgeBro

* AimWeapon
* Die
* Idle
* ThrowWeapon

## SpikeTop

* Die
* Stomped
* SwimDash
* SwimIdle
* Walk

## Spiny

* Egg
* EmptyShellSpin
* Fly
* ShellAwake
* ShellSpin
* TurnAround
* Walk

## Stretch

* Die
* Hiding
* TurnAround
* Walk

## Thwomp

* Anger
* HorzAnger
* HorzNear
* Idle
* Near
* UpAnger
* UpNear

## Wiggler

* AngerBody
* AngerHead
* Body
* Head
* TurnAround
* TurnAroundAnger

## WigglerBody

* AngerBody
* Body

# Event objects

## Cannon

`Cannon` shares `E_Cannon.sprite` with the [`CannonBall`](#cannonball) enemy.

* Body
* BodyRed
* Head
* HeadRed

## CheckPointFlag

* Costume
* Hit
* Idle
* Luigi
* Mario
* Peach
* Toad

## FlagPole

* Body
* Costume
* Flag
* Head
* Luigi
* Mario
* Peach
* Toad

## OneWayWall

* Idle

# Items

## BigCoin

* Idle

## BoomerangFlower

* Idle

## Clock

* Idle

## CloudFlower

* Idle

## DoorKey

* Idle

## DoorKeyCoin

* Idle

## Flowers

A shared base class for Fire Flower, Ice Flower, Bubble Flower and Superball Flower.
`Idle` works for each of their own sprite files (`I_FireFlower.sprite`, `I_IceFlower.sprite`, ...).
Boomerang Flower, Cloud Flower and Following Cloud have their own entries above.

Because the base class itself is not registered as an object type, the Sprite Editor does not offer this name in its `New Animation` dialog. Type it by hand.

* Idle

## FollowingCloud

* Idle

## GiantMushroom

* Idle

## Heart

* Idle

## HeartContainer

* Idle

## MagicOrb

* Idle

## Moon3UP

* Idle

## Mushroom

* Idle

## PoisonMushroom

* Idle

## PropellerMushroom

* Idle
* Propeller

## RottenMushroom

* Idle

## StaticCoin

* Idle

## Suits

A shared base class for Frog Suit, Hammer Suit, Tanooki Suit and Penguin Suit.
`Idle` works for each of their own sprite files.

Because the base class itself is not registered as an object type, the Sprite Editor does not offer this name in its `New Animation` dialog. Type it by hand.

* Idle

## SuperLeaf

* Idle
* InItemBox

## SuperStar

* Idle

## TurtleShell

* Idle

# Vehicles

## Cloud

* Cloud

## Yoshi

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
