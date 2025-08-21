---
layout  : wiki
title   : SFMB - Nintendo Switch Pro 컨트롤러 설정 가이드
summary :
date    : 2022-01-14 00:00:00 +0900
updated : 2022-01-14 00:00:00 +0900
tag     : sfmb
toc     : true
public  : true
comment : true
parent  : [[sfmb_tutorial]]
latex   : false
---
* TOC
{:toc}

# 개요

본 문서는 Steam에서 자체적으로 지원하는 컨트롤러 구성 시스템을 활용해 SFMB를 위한 Nintendo Switch Pro 컨트롤러 (Pro-con, 프로콘)의 설정 방법을 소개합니다.

## 컨트롤러 설정하기

- JoyToKey, ScpToolKit 등 컨트롤러 호환을 위한 다른 프로그램이 설치되어 있다면, 해당 프로그램을 완전히 종료한 뒤 설정을 진행해주세요.
- 먼저, USB 또는 Bluetooth를 사용해 PC와 컨트롤러를 연결합니다.
- `Steam > 설정 > 컨트롤러 > 일반 컨트롤러 구성` 메뉴로 진입합니다.
  ![컨트롤러 설정 화면](https://user-images.githubusercontent.com/55905774/149447681-6d555c75-e76e-4585-b2b6-e3074ed1a5ed.png)
- 발견된 컨트롤러에 Nintendo Switch Pro 컨트롤러가 감지되는지 확인해주세요.
- `Switch Pro 설정 지원`, `Nintendo 버튼 레이아웃 사용` 옵션을 체크한 뒤 창을 닫습니다.
  ![컨트롤러 구성 화면](https://user-images.githubusercontent.com/55905774/149447766-8c73347a-ee5e-464b-9efa-abd6d4c7f277.png)
- 아래 링크를 브라우저에 복사 & 붙여넣기한 뒤 접속해주세요:
```
steam://controllerconfig/413080/2717023654
```
- 바인딩 구성 미리보기 화면이 뜨면, `바인딩 설정 적용` 버튼을 눌러줍니다.
  ![바인딩 구성 미리보기 화면](https://user-images.githubusercontent.com/55905774/149447879-224433c8-1e7b-4003-8e81-20eb47a7cd73.png)
- `완료` 버튼을 클릭해 창을 닫습니다.
  ![바인딩 구성 적용 화면](https://user-images.githubusercontent.com/55905774/149448029-7c28a1f3-dddf-410e-9949-fb98c145520a.png)
- SFMB 설치 폴더 내의 `MarioConfig.exe` 파일을 실행해줍니다.
- Controller 속성의 `Key for Spin-Jump`, `Key for Mid-air spin` 항목을 `0 (Use SpinJump key)`로 변경해줍니다.
  ![SFMB 설정 화면](https://user-images.githubusercontent.com/55905774/149448115-80cdd0fd-4659-457e-a387-e327e4947b2c.png)
- `Save` 버튼을 눌러 설정을 저장해줍니다.
- 설정이 끝났습니다!

## 기본 조작 방법

- 조작키의 기본값은 슈퍼 마리오 메이커 2의 기본 조작법을 베이스로 했으며, 다음과 같습니다.
    - `L스틱`, `십자키 ↑↓←→`: 캐릭터 조작 (좌우 이동, 위 올려다보기, 숙이기 등)
    - `X`, `Y`: 대쉬
    - `A`, `B`: 점프
    - `ZL`, `ZR`: 스핀 (Mid-air 스핀 포함)
    - `L`, `R`: 아이템 슬롯에서 아이템 꺼내기
    - `+`, `-`: 일시정지 메뉴 or 취소 키
    - `↑ + 점프`: 프로펠러 등 일부 특수 조작 

`Steam > 설정 > 컨트롤러 > 데스크톱 구성`에서 조작 키를 직접 커스텀할 수도 있습니다.

## 컨트롤러 보정하기

프로콘 연결 시 마우스 커서가 제멋대로 움직이거나 스틱 조작을 하지 않았는데도 캐릭터가 이동하는 경우 아래 과정을 따라 컨트롤러 보정을 진행해보세요.

1. `Steam > 설정 > 컨트롤러 > 일반 컨트롤러 구성` 메뉴로 진입합니다.
2. 발견된 컨트롤러 항목에서 Pro 컨트롤러를 선택하면, 우측에 상세 정보가 나타납니다. 여기서 `보정하기` 버튼을 클릭해주세요.
  ![컨트롤러 구성 화면 - 상세](https://user-images.githubusercontent.com/55905774/149448233-f4ed46cb-9315-48e0-82b8-f7f83730b167.png)
3. `전체 자동 보정 시작` 버튼을 클릭한 뒤, 화면의 지시에 따릅니다.
4. 보정 완료 메시지가 뜨면 `확인` 버튼을 눌러 창을 닫습니다.
