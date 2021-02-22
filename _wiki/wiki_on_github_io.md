---
layout  : wiki
title   : Windows 환경에서 Vimwiki + Jekyll + github.io 위키 구축하기
summary : 
date    : 2021-02-19 14:15:46 +0900
updated : 2021-02-19 15:20:10 +0900
tag     : wiki github.io vimwiki jekyll
toc     : true
public  : true
parent  : [[index]] 
latex   : false
---
* TOC
{:toc}

## 먼저

우선, 종립 님의 [[https://johngrib.github.io/wiki/my-wiki/]]{ Vimwiki + Jekyll + Github.io로 나만의 위키를 만들자 } 를 읽었다고 가정한다.

## 알아야 할 것들

### github.io?

- Github Page를 의미한다. 
- 본인의 Github과 연결되어 {Id}.github.io 형태의 도메인이 제공된다. 
	- 이것만으로도 매력적이다.
- Jekyll을 지원한다.
	
### Vimwiki?

- 리눅스 계열 콘솔 환경에서 사용하는 텍스트 에디터 Vim(오래전에 vi 명령으로 사용했던 것과 같은 것인지 모르겠다)의 플러그인이다.
- 위키를 돌아다니듯 파일을 넘어다니거나, 링크와 링크할 파일을 엔터 한번으로 생성하는 것이 가능하다.

### Jekyll?

- Jekyll에 대해서는 자세히 모른다.
- 종립님의 블로그 파일들을 열어보면 html 파일들이 일반 html이 아닌, React 스크립트나 jsp 처럼, 다른 언어가 섞여있는 것을 볼 수 있었다.
	- 이 파일들은 Jekyll을 통해 빌드하면 최종의 정적 웹페이지가 된다.
- 따라서 간단한 스크립트 언어로, 쉽게(?) 웹페이지를 띄울수 있다고 생각하면 되겠다.
- github.io도 Jekyll을 지원하고 있다.

### 시작해보자.

종립님의 블로그에 들어가보면, 이 세가지 조합으로 작동하는 블로그를 이미 완성되어 수년째 운영중이다. 따라서 사용 방법만 익히면 된다.

1. 우선 Github 사용자로써, Github Page를 생성해야 한다.
	- 오래되어 잘 기억은 나지 않으나, 이름이 {본인 Id}.github.io 인 공개 리포지터리를 만드는 것으로 시작한다.
	- 아마 Github Page를 검색하면 쉽게 따라해볼 수 있을 것이다.
2. 종립님의 블로그 스켈레톤을 Fork하여 내 Github Page에 커밋한다.
	- 스켈레톤이라는 명칭은 생소했다.
	- 살을 발라내고 뼈대만 남은 기초 상태로 이해된다.
	- 참고로 나는 스켈레톤으로 시도하다 잘 안되서, 종립님의 블로그를 다운받아 일단 커밋했다.
3. 구조를 살펴본다.
	- 대략, _wiki 와 _posts 하위에 작성한 md 파일이 위키에 자동으로 로드되는 것처럼 보였다.
	- 대문 역할인 index.md 는 직접 작성해야 하는 것 같았다.
4. 내용을 조금 수정하여 커밋해본다.
	- _wiki/index.md 파일에 [ [ test ] ] 와 같은 새로운 링크를 추가하고
		- 참고로 Vimwiki 환경에서 test 만 입력한 후 NORMAL 모드에서 엔터를 누르면 링크로 변경된다.
		- 아직 Vim이 없으므로 아래에서 다룬다.
	- _wiki/ 폴더의 아무 md 파일을 test.md로 복사해보았다.
	- test.md파일의 상단 헤더를 적절히 수정하고, 내용은 한 줄만 남기고 삭제했다.
	- 커밋해보고, 1분내로 내 Github Page에 들어가보면 수정한 내용이 적용된 것을 볼 수 있었다.
5. 알게된 것을 정리한다.
	- md 포맷으로 문서를 작성하여 커밋하면, 자동으로 페이지가 생성된다. 
	- 따라서 Vimwiki 편집환경이 완성되면, 문서를 쓰고 커밋만 하면 된다.
		- 또는 github에서 직접 파일을 수정하고 커밋해도 상관없긴 하다.

### 편집환경을 구축하자.

1. Vim이 필요하다.
	- Vim은 리눅스 콘솔환경 에디터이다.
	- 찾아보니 Windows 환경에서 동작하는 버전도 있다.
	- 나는 gvim이라는 GUI 버전을 설치하기로 했다.
2. gVim 만져보기.
	- gVim을 설치하고 실행해보면, Windows 사용자에게는 매우 낯선 에디터임을 알수 있다.
		- 나는 d:\vim 에 설치하고, d:\vim\vim82\gVim.exe 로 실행했다.
		- 기본 설치경로가 C:\Program Files\Vim 으로 입력되어 있는데, 이곳에 설치하면 여러가지로 성가셔진다.
	- 단축키나 UI, UX가 모두 리눅스의 것을 따르고 있다.
		- 창 크기나 창 위치도 저장되지 않을 뿐더러, CTRL+S 같은 익숙한 단축키도 먹히지 않는다.
4. vimrc 이란?
	- vim의 설정 파일이다.
	- 종립님의 블로그나 구글링등을 해보면 ~/.vimrc 를 열면 된다는데 뭘 말하는지 알 수 없었다.
	- gVim 환경에서는 gVim을 설치한 경로의 루트에 _vimrc 로 존재한다. 
		- 나의 경우 d:/vim/_vimrc 파일이다.
	- 우선 vimrc 파일은 이곳에 있음만 알아두자.
5. gVim + Vimwiki
	- 이제 vim의 플러그인인 Vimwiki를 설치해야 한다.
	- vim-plug 설치
		- vim에 플러그인은 설치하기 위해, 플러그인 매니저를 먼저 설치해야 한다. npm이나 apt-get 같은 것을 떠올리면 된다.
		- [[vim-plug]]{ https://github.com/junegunn/vim-plug }에 가보면, 친절한 설치 가이드가 있으나, gVim 따위는 있을리가 없다.
			- 특정 폴더에 가서 git으로 pull 하라느니, 이런 저런 방법이 많은데 알아들을 수 없으므로 무시한다.
		- vim-plug 페이지의 plug.vim 파일만 다운로드한 후, gVim 설치 폴더의 autoload 폴더에 집어넣는다.
			- 나의 경우 d:/vim/vim82/autoload
		- gVim을 다시 실행했을때 오류메세지가 없으면 성공. 참고로 플러그인이 잘못 설치되면 별도의 오류창이 팝업된다.
	- vimrc를 열어서, 맨 아래에 다음 코드를 붙여넣고 gVim을 다시 실행한다.

		```
call plug#begin()
Plug 'VundleVim/Vundle.vim'
Plug 'bling/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'vimwiki/vimwiki'
call plug#end()
		```

	- :PlugInstall 을 입력하면 위 스크립트에 적어둔 플러그인들이 설치된다. ~~사실 vimwiki 외에 뭐하는 플러그인인지 모르겠다.~~
	- gVim을 다시 실행해보면, 메뉴에 Vimwiki가 보일것이다.
		- 대략 첫번째 메뉴를 눌러보면, 위키 홈 폴더를 생성하겠다고 한다.
			- 나는 d:/MyProjects/neoarc.github.io 로 만들었다.
			- 기본 경로로 만들면 c:/Users/{윈도우 계정명}/ 의 하위에 생성될 것이다.
		- 생성하고나면 index.md 파일이 열린다.
	- vim에서 INSERT 모드로 아무런 텍스트(예: test)나 입력하고 NORMAL 모드에서 엔터키를 누르면, {해당 텍스트}.md 파일이 자동으로 생성되고 해당 파일이 열리는 것을 알 수 있다.
		- 대강 작성하고 커밋해보자.
		- index에 test 페이지가 추가된 것을 볼 수 있다. 하지만, test 링크에 들어가면 없는 페이지(404)가 출력된다.
6. gVim 설정 수정하기
삽질 끝에 알아낸 여러가지 문제는 대부분 gVim 기본 설정에서 비롯된다.
	- gVim은 시스템 언어(한국어 Windows의 경우 euc-kr)모드로 파일을 열고 쓴다.
	- Jekyll은 빌드시 시스템 언어값을 따른다.
		- 아마 Ruby 파일 파서의 동작 같다.
	- euc-kr로 작성된 파일을 Github Page에 커밋하면 404 오류가 발생한다.
	
	(이후 내용은 추후 작성)


