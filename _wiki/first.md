---
layout  : wiki
title   : first
updated : 2021-02-17 12:24:49 +0900
toc     : true
public  : true
comment : false
regenerate: true
---

## gVim + vimwiki 설치기
- gVim 포터블 버전과 인스톨러 버전이 있는데, 인스톨러 버전으로 설치
- [vim-plug](https://github.com/junegunn/vim-plug) 에서 plug.vim 파일을 gVim 설치 폴더의 autoload 폴더에 다운로드
- 설치 폴더에서 _vimrc 파일을 찾아 맨 아래에 다음과 같은 코드 삽입
```
call plug#begin()
Plug 'VundleVim/Vundle.vim'
Plug 'bling/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'vimwiki/vimwiki'
call plug#end()
```
- vim 실행 후 :PlugInstall 로 플러그인이 설치된다.
- 메뉴의 Vimwiki를 눌러보면, 홈 폴더를 생성하고, 위키 작성이 시작됨
- [vimwiki 활용](https://johngrib.github.io/wiki/my-wiki)
- 
