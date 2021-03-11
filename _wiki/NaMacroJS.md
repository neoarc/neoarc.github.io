---
layout  : wiki
title   : NaMacroJS 
summary : 
date    : 2021-02-19 18:15:26 +0900
updated : 2021-03-11 12:15:50 +0900
tag     : my_project macro 자동화 매크로 
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

# What is it?

- NaMacro는 Google V8 엔진을 사용하는 Windows 용 매크로 플랫폼(...이 목표였던 응용프로그램) 이다.
- 이해가 안된다면 AutoIt이나 AutoHotkey를 떠올리면 되겠다.

# 개발 동기

- 이제는 잘 기억나지 않지만, 반복 작업을 위해 시도했던 여러가지 매크로 프로그램들이 하나같이 불편했기 때문이다.
	- MacroMedia (회사 이름인지 제품이름인지 가물가물)
		- 우선 유료 프로그램이고, Trial 버전을 제공했었다.
		- 기능은 강력하지만, 프로그램 자체가 너무 무거워 VM에서 구동하기가 어려웠다.
	- GMacro
		- 마우스 매크로용 프로그램으로 아주 단순한 UI로 구성되어있다.
		- 녹화후 반복구동에는 큰 지장이 없으나, 내용을 수정하기가 매우 불편하다.
	- AutoHotkey
		- 스크립트를 작성하여 구동하는 방식
		- 단축키 바인딩, UI 출력, 컴파일하여 exe파일로 배포 등 가장 강력
		- 자체 언어를 공부해야 한다.
- 내가 원한 것들을 AutoHotkey가 거의 다 갖고 있긴 했으나, 문제의 스크립트와 끝내 친해지지 못했다.

# 지원 기능

## 마우스 제어

- 마우스 커서의 위치를 얻거나 변경한다.

```javascript
// 마우스 커서의 현재 좌표를 출력한다.
alert(system.mouse.x + ',' + system.mouse.y)

// 100,100 좌표로 이동시킨다.
system.mouse.x = 100
system.mouse.y = 100
```

## 키보드 제어

- 키보드를 입력한다.

```javascript
// a키를 눌렀다 뗀 것처럼 이벤트를 발생시킨다.
// VK.a 는 애드온인 VirtualKey.js에 정의된 상수값
system.keyboard.down(VK.a);
system.keyboard.up(VK.a);
```

```javascript
// 문자열 "[space]"를 타이핑 한다.
system.keyboard.typeString("[space]");
```

- 핫키를 등록한다.

```javascript
// spacebar를 누르면 [space]가 입력되도록 한다.
system.keyboard.on(VK.space, function() {
    system.keyboard.typeString(" [space] ");
});
``` 

## 스크린 제어

- 스크린 내 특정 영역을 캡쳐한다.

```javascript
// 화면의 0, 0, 500, 500 을 캡쳐
var image = system.screen.capture(0, 0, 500, 500);
// 캡쳐한 이미지를 파일로 저장 (bmp, jpg, png)
image.save("./SavedImage.png");
```

- 이미지를 다른 이미지와 비교하거나 포함 관계를 파악한다.

```javascript
// image1 내에 image2 가 포함되었는지 찾아서 좌표를 반환한다.
var coord = image1.findImage(image2);
console.log(coord.x + ", " + coord.y);
```

## 프로세스 제어

- 특정 이름의 프로세스를 찾는다.

```javascript
// 실행중인 MSBuild.exe를 모두 찾는다.
var array = findProcesses("MSBuild.exe");
// 그 중 첫번째를 강제 종료한다.
if (array.length > 0)
    array[0].terminate();
```

## 윈도우 제어

- 특정 윈도우의 정보(좌표, 크기, 상태, ClassName 등)를 얻거나 변경한다.

```javascript
var windows = findWindows("메모장");
if (windows.length > 0) {
    // 창의 좌표
    console.log("coord = " + windows[0].x + ", " + windows[0].y);
    // 상태 값은 normal, maximized, minimized
    console.log("state = " + windows[0].state);
}
```

## JavaScript를 통한 스크립팅

- JavaScript로 스크립트를 작성한다.

# 개발 중단

- 아쉽게도 여러가지 이유로 2017년 즈음 개발이 중단된 상태다.

## 여러가지 이유?

- (작성중)
