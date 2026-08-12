---
layout  : wiki
title   : SFMB - How to set up a Nintendo Switch Pro Controller
summary :
date    : 2022-01-14 00:00:00 +0900
updated : 2026-06-10 00:00:00 +0900
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

This wiki explains how to set up a Nintendo Switch Pro Controller (Pro-con) for SFMB using Steam's built-in controller configuration system.

# Before you start

- If you have other controller-compatibility software installed (e.g. JoyToKey, ScpToolKit), close it completely before continuing.
- Connect the controller to your PC via USB or Bluetooth.

# Setup

1. Open `Steam > Settings > Controller > General Controller Settings`.
  ![Controller settings screen](https://user-images.githubusercontent.com/55905774/149447681-6d555c75-e76e-4585-b2b6-e3074ed1a5ed.png)
2. Confirm that the Nintendo Switch Pro Controller appears in the detected controllers list.
3. Check `Switch Pro Configuration Support` and `Use Nintendo Button Layout`, then close the window.
  ![Controller configuration screen](https://user-images.githubusercontent.com/55905774/149447766-8c73347a-ee5e-464b-9efa-abd6d4c7f277.png)
4. Copy the link below into your browser and open it:
```
steam://controllerconfig/413080/2717023654
```
5. When the binding preview appears, click `Apply Configuration`.
  ![Binding preview screen](https://user-images.githubusercontent.com/55905774/149447879-224433c8-1e7b-4003-8e81-20eb47a7cd73.png)
6. Click `Done` to close the window.
  ![Binding applied screen](https://user-images.githubusercontent.com/55905774/149448029-7c28a1f3-dddf-410e-9949-fb98c145520a.png)
7. Run `MarioConfig.exe` from your SFMB installation folder.
8. Under Controller properties, set `Key for Spin-Jump` and `Key for Mid-air spin` to `0 (Use SpinJump key)`.
  ![SFMB config screen](https://user-images.githubusercontent.com/55905774/149448115-80cdd0fd-4659-457e-a387-e327e4947b2c.png)
9. Click `Save`. Setup is complete.

# Default controls

The default key bindings are based on Super Mario Maker 2:

- `L-Stick`, `D-Pad ↑↓←→`: Move (walk, look up, crouch, etc.)
- `X`, `Y`: Dash
- `A`, `B`: Jump
- `ZL`, `ZR`: Spin (including mid-air spin)
- `L`, `R`: Take an item from the item slot
- `+`, `-`: Pause menu / cancel
- `↑ + Jump`: Special actions such as the propeller

You can also customize the bindings yourself in `Steam > Settings > Controller > Desktop Configuration`.

# Calibration

If the mouse cursor moves on its own, or your character drifts without stick input, calibrate the controller:

1. Open `Steam > Settings > Controller > General Controller Settings`.
2. Select the Pro Controller in the detected controllers list. Details appear on the right; click `Calibrate`.
  ![Controller configuration detail](https://user-images.githubusercontent.com/55905774/149448233-f4ed46cb-9315-48e0-82b8-f7f83730b167.png)
3. Click `Start Full Autocalibration` and follow the on-screen instructions.
4. When the completion message appears, click `OK` to close the window.
