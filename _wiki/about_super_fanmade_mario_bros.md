---
layout  : wiki
title   : SFMB = Super fanmade Mario Bros.
summary : 
date    : 2021-02-18 19:15:52 +0900
updated : 2021-06-17 10:20:03 +0900
tag     : my_project sfmb
toc     : true
public  : true
parent  : [[index]]
latex   : false
comment : true
---
* TOC
{:toc}

# SFMB

- SFMB는 Super fanmade Mario Bros. 의 약자로, 말그대로 팬이 만든 슈퍼 마리오 게임을 의미한다.
- 최초의 프로젝트명은 MarioV3 으로, 이는 내가 3번째로 마리오 따라 만들어보기를 시도함을 의미한다.
- MarioV1은 대학생 때, MarioV2는 전 직장때 시도했는데 이에 대한 자세한 내용은 기회가 되면 작성하기로 하자.

# 최초의 목표

- 최초의 목표는 무려 40여년 전에 출시된 슈퍼 마리오1을 똑같이 만들어보는 것이었다. 별다른 이유는 없었다.
- 단지 당시 첫번째 회사를 그만두고 집에서 놀고 있었고, 심심풀이 삼아 만들던 [[about_neoarc_macro_js]] 외에 또다른 즐길거리를 떠올리던중 아내의 권유로 시작하게 되었다. (감사!)

# 개발 환경 및 언어

- Visual Studio 2015 에서 개발을 시작했고 개발 언어는 C++ 이다.
- 2021년 현재는 Visual Studio 2019 를 사용중이며 C++ 17이 주 언어이다.
	- 보조 언어로 Javascript - node.js를 사용한다.

# 사용된 기술 또는 라이브러리

- DirectX 9.0
- OpenGL
- FMod
- Direct Input
- 자동 업데이트
- Custom URL scheme
- Discord 연동
- Serverless 구조
- Node.js
- MFC

# 버전별 히스토리

## 1.0

- 원작 슈퍼 마리오1에 근사한 수준이 완성됐다.
- 게임과 동시에 게임에서 사용할 데이터를 작성하기 위해 몇가지 툴을 같이 개발해야 했다.
	- 맵 에디터
	- 스프라이트 에디터

## 2.0

- 사람들의 의견에 따라 테마를 변경하는 기능이 추가되었다.
- 이미지, BGM, 효과음 세트를 준비해두면, 통째로 교체하여 다른게임처럼 보이도록 할 수 있게 됐다.
- 외관은 다르지만, 실제 동작은 동일했다.

## 3.0

- 유저들이 맵 에디터로 만든 스테이지 파일을 공유 서버를 통해 공유하는 기능이 추가됐다.
- 모튼 버전을 통틀어 가장 큰 변화로 볼 수 있다.
- Firebase를 활용하여 서버리스 온라인 게임이 된 셈이다.

## 4.0

## 5.0

## 6.0

- 6.3 또는 6.4에 누군가에 의해 서버가 해킹되었다.
	- 여담으로 이 '누군가'는 1달정도 후에 나와 접촉하여 사과했고, 지금은 친구가 되었다.
- Firebase의 주요 데이터가 모두 삭제되었다.

## 7.0

- 온라인 플레이를 위한 코드를 전부 새로 작성하였다.
	- 따라서 서버리스 구조가 아닌 node.js로 구동되는 서버가 존재하는 Client-Server구조가 되었다.

# 쇼케이스 동영상

- [플레이리스트](https://youtube.com/playlist?list=PLy48mgZDzAElTjONXjFogisRyBGDtEdZj)
- (작성중)
