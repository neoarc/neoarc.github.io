---
layout  : wiki
title   : SFMB - Technologies 
summary : 
date    : 2025-10-22 14:18:48 +0900
updated : 2026-06-10 00:00:00 +0900
tag     : sfmb
toc     : true
public  : true
parent  : sfmb_betatest
latex   : false
---
* TOC
{:toc}

# 서론

이 문서에서는 SFMB 개발에 사용된 기술을 나열하고 설명한다.

# 개발 툴

- 오랜 기간 개발한 만큼 꾸준히 최신버전의 개발툴로 교체해왔다.
	- Visual Studio 2015
	- Visual Studio 2017
	- Visual Studio 2019
	- Visual Studio 2022
- Visual Studio Code
	- vscode의 경우, 서버나 bot 개발시에만 사용하고 있다.

# 프로그래밍 언어

- C++ 17
- Javascript (NodeJS)

# 게임 엔진

## 기초 라이브러리

### NaLib

- 게임이 아닌 곳에도 활용될 것으로 예상되는 기초 코드들을 묶은 라이브러리로 직접 만들어 사용하였다.
- 전 직장에서의 경험을 통해 크로스 플랫폼을 염두에 두고 개발하였다.
- "Na"는 NeoArc를 줄여 클래스의 Prefix로 사용한 것이다. ~~나트륨을 의미하는 것이 아님~~
- 사실상 NaLib이 SFMB의 여러 핵심 코드를 가지고 있으며, SFMB는 이것을 활용하는 형태로 구현되어 있다.

### ExtLib

- 오픈 소스 라이브러리를 가져다가 묶은 것이다.
- Box2D
	- 앵그리버드 등에 사용된 유명한 2D 물리엔진
	- 게임의 물리엔진 교체에 사용해보려고 가져왔지만, 사용되지 못했다.
- catch2
	- 단위 테스트 프레임워크
- cppcodec
- cxxopts
- dirent
	- 파일시스템 관련 라이브러리
	- 게임 초기 구현시 사용되었으나, 모던 C++를 사용하게 됨에 따라 필요없게 되었다.
- fmt
	- 문자열 포맷 라이므러리
- JsonLib
- libpng
- magic_enum
- MemoryModule
- miniz
- miniz-cpp
- msgpack
- PicoSHA2
- zlib
- discordbuddy
	- BatteryShark가 구현한 discordbuddy를 포팅하여 직접 구현한 것
- discord-rpc
- discord-sdk
	- Discord Rich Presense 연동을 위해 사용
- rapidjson
	- discord 라이브러리에서 사용되기 때문에 포함되었다.
- curl
	- 네트워킹 라이브러리
- DirectX 9.1
- OpenGL
- SDL
- FMOD
- BASE

## 랜더 엔진

- 최초에는 DirectX 9.1을 기준으로 구현했다가, OpenGL을 지원해보기 위해 추상화하게 되었다.
- 다음의 기능들을 각각의 랜더러에 맞도록 구현하였다.
	- 레터 박스 (그려질 내용의 비율을 유지하고 그 외의 부분은 검은 바탕 출력)
	- 비트맵 로딩 (bmp, png)
	- 텍스쳐의 일부분을 원하는 위치에 그리기
		- 회전하기
	- 커스텀 텍스쳐 생성
	- 픽셀 셰이더를 통한 효과
	- Windows 폰트로 텍스트 출력

### 픽셀 셰이더

- 주로 색상 변환에 사용되고 있다.
- 아직 초보 수준의 구현

## 스프라이트 처리

- 필요한 테마에 적합한 텍스쳐를 로딩하고, .sprite 파일을 통해 스프라이트 시트의 분할 영역 데이터를 제어한다.
- HD 텍스쳐
	- 텍스쳐 파일명 + @2x 에 해당하는 파일이 존재하면 함께 로딩하여 HD 텍스쳐로 사용한다.
	- 2배 크기의 텍스쳐를 로딩하여 50% 로 축소하여 랜더링하는 것이다.
- 매 프레임마다 그려야 할 스프라이트 정보를 수집하고 Z-order별로 정렬하여 순서대로 랜더링

## 입력 처리

### DirectInput

- 조이스틱 입력 처리
	- 조이스틱 입력을 분석하여 키보드 입력으로 치환하고 있다.
- 키보드 입력 처리

### 마우스

- 마우스 입력은 단순히 마우스 메세지 (WM_MOUSE...)를 사용한다.
- UI 엔진에서 마우스 클릭을 버튼 클릭으로 변환하여 처리한다.

## 사운드 처리

### FMod

- mp3, ogg, wav 파일 재생에 사용된다.
- 다중 채널 동시 재생, 개별 볼륨 설정을 지원한다.
- Loop point를 지원한다.

### BASE

- 마리오 메이커와 다른 방식으로 음악 블록을 구현하기 위해 사용되었다.
- 사운드 폰트를 로딩하고 미디 음원을 재생할 수 있다.

## 장면

- State Machine으로 구현
- 주로, 장면에서 장면으로 전환을 처리한다.
	- 특정 시간이 흐르면 자동으로
	- UI를 통해
- 일부 장면 전환은 플레이어 객체가 요청하여 처리하기도 한다.
- 장면 전환시에는 별도의 전환 효과(페이드, 원형, 커튼 등)를 함께 출력한다.

## 네트워킹

- 게임 내 대부분의 네트워킹은 비동기로 처리하기 위해 트랜젝션 쓰레드에서 처리된다.
- 트랜젝션 쓰레드에서 네트워킹 작업이 끝나면 GameState 내에 구현된 콜백을 호출하는 방식

## 게임 오브젝트

- State Machine으로 구현
- 모든 게임 오브젝트가 공통된 상태 목록을 사용한다.
	- Idle
	- Walk
	- Jump
	- Swim
	- SpinJump
	- GroundPound
	- WallSlide
	- PropellerJump
	- Die
	- ...
	- 위와 같은 상태가 150가지 이상 정의되어 있다.
- 초기에는 Raw pointer를 직접 사용하는 형태로 구현했었으나, 알 수 없는 크래시의 추적에 한계를 느끼고 이후 구조를 개선하였다.

## 스테이지

- 게임 내 가장 많은 코드를 가진 클래스 중 하나
- 타일 맵 관리
- 맵 내 살아있는 객체 관리

## 카메라

- 스테이지의 어느 부분을 보여줄지 처리하는 클래스
- 땅의 흔들림이나 강제 스크롤도 카메라를 통해 처리하고 있다.

## 물리 엔진

- 내가 직접 구현한 것으로, 단순 무식하게 구현되었다.
- 여러번 위기에 도달했을때마다 성능 개선을 위해 구조를 크게 바꾸었다.
- 대략 다음과 같은 역할을 *매 프레임마다* 수행한다.
	- 스테이지 내 살아있는 모든 객체를 수집
	- 각 객체를 현재 속도에 기반하여 이동될 위치로 이동시킴
	- 각 객체들이 타일과 충돌하는지 판단
		- 충돌한다면 각 타일 타입에 따라 flag 세팅
			- 일반 타일
			- 점프 블록
			- 마림마 블록
			- 물
			- 용암
			- 독
			- 스타 블록/데스 블록
	- 각 객체들이 경사로와 충돌하는지 판단하여 위치/속도 보정
	- 각 객체들을 서로 비교하여 충돌하는지 확인 (N^2)
		- 기본적으로 AABB 로 검사하나, 원형 히트박스 또는 다중 히트박스를 가진 객체도 지원
		- 서로 충돌한 객체들의 목록을 생성하여 저장
	- 충돌한 객체들의 상태에 따라 피드백 처리
		- 충돌 상태만 기억하고 있거나 (기본)
		- 밀리거나 (둘중 하나가 겹치는 것을 허용하지 않는 물체일때)
		- 탑승하거나 (발판 등)
	- 각 객체를 원래 위치로 복원

## UI 엔진

- 직접 구현한 것으로 꼭 필요한 최소한의 컴포넌트와 최소한의 기능만 갖고 있다.
- 기본 컴포넌트
	- Panel
	- Container
	- Text
	- AreaText
	- Button
	- ImageButton
	- CheckBox
	- Edit
	- Spin
	- Rectangle (Image)
	- AnimationRectangle
	- Tooltip
	- Popup
	- List
	- VirtualList
	- ScrollForm
- 게임 전용 컴포넌트
	- AbilityFlagImage (능력 표시)
	- CountryFlagTextButton (나라 깃발 버튼)
	- UserAvatarButton / UserNameButton (유저 아바타/이름 버튼)
	- SingleStageButton / WorldStageButton (스테이지 버튼)
	- CustomGameButton
	- CommentDollEdit
- UI 화면을 손쉽게 배치하기 위한 별도의 편집 도구도 만들어 두었다.

# 게임

## 어플리케이션

### Windows

- Win32 응용프로그램으로 구현하였다.
- 윈도우를 생성하고 윈도우 핸들을 DirectX, OpenGL에 넘겨 랜더링되도록 했다.
- SDL의 경우는 윈도우를 생성하는 것부터 SDL이 처리하게 되어 있어서, 다른 방식으로 처리했다.

#### CustomURL Scheme

- "sfmb://" 프로토콜을 통한 여러 연동 기능 구현에 사용한다.
- 게임 실행시 CustomURL scheme을 등록한다. (레지스트리에 직접 등록)
- Force Update 및 Direct Play에 사용한다.

### MAC OS

- (오래되어 잘 기억나지 않지만) GLView를 가진 응용프로그램으로 개발하였다.
- GLView는 OpenGL을 지원하는 일종의 윈도우만 미리 만들어진 형태라고 보면 된다.

## 장면 (Scene)

- 게임은 다수의 장면으로 구성되며, 성격별로 묶으면 다음과 같다.

### 시작 / 시스템

- Logo
- Title
- RegisterUser
- Profile
- Credits
- AppUpdate
- GameThemeUpdate
- SystemAlert
- ErrorMessage

### 월드 / 스테이지 선택

- WorldStage
- WorldStageDirectPlay
- LocalStagePack
- EnterStage
- StageIntro / SkyIntro

### 플레이 중 이동 / 이벤트

- Enter/Exit Door, Pipe, Warp, Sky
- PageScroll
- Play
- NpcTalk / Speech
- MessageBlock
- ShapeChange
- LoseHP
- Die

### 클리어 / 종료

- Goal
- HitGoalBox / HitGoalOrb / HitGoalPost
- FlagDown
- CutBridge
- RescuePrincess
- SingleStageClear / SingleStageGameOver
- GameOver
- TimeUp

### 그 외 모드 / 기능

- ChallengeMode / ChallengeSummary
- MiniGame
- Gallery / Showcase
- ReportStage
- ShowUserList
- ManageDevice
- Pause
- AvatarPaint
	- 자신만의 아바타를 그릴 수 있는 그림판 기능이 직접 구현되어 있다. (캔버스 144 x 144)
	- Pencil, Eraser, Bucket 도구
	- 색상 팔레트
	- Undo / Redo (최대 10단계)
	- 그리드 표시 토글
	- 여러 슬롯 + 슬롯 간 복사
	- 애니메이션 지원
	- 프리셋 제공
	- 내보내기

# 맵 에디터

## 툴바

- 최초에는 툴바를 가진 MDI 형태의 프로그램으로 작성했었다.
- 툴바 버튼이 점점 많아짐에 따라 아이콘 구분이 어렵고, 정돈되지 않은 느낌이 강해 툴바를 리본바로 대체하였다.

### 리본바 동적 구성

- MFC의 디자인 툴을 통해 리본바를 만들지 않고, 코드레벨에서 동적으로 메뉴를 구성한다.
	- 아이콘으로 사용할 비트맵도 DesignPalette 이미지에서 동적으로 생성
- 메뉴 구성은 서버에서 보내준다.
	- 즉, 오프라인 크랙을 통해 플레이할 수 없도록 설계했다. (7.0 부터)

#### Design Palette 동적 전환

- 각 테마마다 보여줘야 하는 아이콘이 달라지기 때문에, 활성화된 스테이지가 변경될 때마다 리본바 전체의 아이콘을 새로 로딩한다.
- 모든 버튼 컨트롤을 수집한 후, 새로 만든 비트맵으로 교체하는 방식
- 이 기능을 구현하기 위해 기본 리본 버튼을 사용하지 않고 직접 만든 클래스를 사용한다.

## 속성창

- MFC의 PropertyGrid를 사용한다.
- NaPropertyObjectBase 클래스를 상속하여 구현한 모든 객체의 속성을 쉽게 보여줄 수 있다.
- 일부 속성값 타입에 대한 PropertyItem 클래스를 필요에 따라 직접 구현하였다.
	- Bool : true/false를 선택하는 대신 체크박스 표시
	- Enum(int) : 실제로는 int 값이지만, 매직 넘버로 보이지 않도록 의미에 해당하는 텍스트를 보여줌
	- Color(int) : 클릭하면 커스텀된 컬러 선택창이 표시된다.
	- Extended : value란을 버튼 형태로 표시하여, 클릭하면 별도의 편집창을 보여주는 방식

## 상태바

- 현재 커서 위치(타일 좌표), 활성화된 스테이지 정보, 선택된 객체 등 편집 중 필요한 정보를 표시한다.

## 문서창

- MDI Document 내부를 게임 엔진이 직접 그리는 형태
- 높은 성능을 내기 위해 WM_PAINT 메세지가 발생할 때, 1프레임만 랜더링한다.

## 각종 다이얼로그

- 맵 에디터에는 테마와 각종 리소스를 관리하기 위한 다수의 전용 창이 있다.

### 테마 / 배경 관련

- 테마 관리 창 (게임테마 복제, 테마 설정 관리)
- 테마 정의 창 (하늘색, 패럴랙스 배경, 배경 오브젝트 등 / [[sfmb_tutorial_theme_settings]] 참고)
- 테마 선택 창
- 커스텀 테마 선택 창

### 픽셀아트 관리 창

- 파일에서 불러오기
- 즐겨찾기
- 애니메이션 프레임 선택
- 그림판과 같은 그리기 기능이 직접 구현되어 있다.
	- Pencil, Eraser, MagicEraser, Bucket, ColorPicker 도구
	- 색상 팔레트 / 색 스펙트럼
	- Undo / Redo
	- 그리드 표시 토글
	- 캔버스 크기 변경

### 픽셀아트 생성 창

- 새 픽셀아트의 캔버스 크기를 선택해 생성한다.

### 커스텀 적 / 블록 관리 창

- 커스텀 적 관리 / 갤러리 / 즐겨찾기
- 캐릭터 정의 편집
- 커스텀 블록 관리

### 코스튬 / 캐릭터 / 능력 선택 창

- 코스튬 선택
- 캐릭터 선택
- 무기 위치 선택
- 목소리 종류 선택

### AbilityFlag 선택 창

- 객체가 가질 능력 플래그(AbilityFlag) 선택
- 능력 프리셋 관리

### 음악 / 사운드 창

- 배경 음악 선택
- 효과음 선택
- 음악 블록 도우미 / 음정 조절

### 그 외

- 스테이지 미리보기
- 하위 스테이지 설정
- 오브젝트 목록
- 태그 선택
- 타일셋 불러오기
- 실시간 텍스트 편집
- 제작자 코멘트

# 게임 서버

- 최초 도입시에는 서버리스(serverless)로 구현되어 서버 앱이 존재하지 않았었다.
- 해킹으로 서버 데이터베이스를 모두 날려먹은 후에 재발방지를 위해 서버 앱을 개발하게 되었다.
- Node.js로 구현
	- Express : 게임과의 통신, 스테이지 업로드 처리
	- Firebase : 유저, 스테이지, 순위표, 차단 목록 등 저장
	- 구글 스프레드시트, 디스코드 연동
	- 운영 환경은 alpha / beta로 분리
- 클라우드 구축 과정은 [[make_nodejs_server_on_oracle_cloud]] 참고

# 디스코드 봇

- 베타테스트 커뮤니티(디스코드 서버) 운영을 위한 별도의 봇. Node.js로 구현
	- discord.js : 슬래시 명령어, 모달 입력 처리
	- canvas, gifencoder : 프로필 카드, GIF 이미지 생성
	- 명령어를 권한 등급(일반 / 모더레이터 / 관리자 등)별로 분리 처리
