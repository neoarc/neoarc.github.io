---
layout  : wiki
title   : Oracle Cloud Free tier에 Node.js 서버 구축하기
summary : 
date    : 2021-12-21 23:03:23 +0900
updated : 2021-12-22 01:42:43 +0900
tag     : nodejs
toc     : true
public  : true
comment : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 개요

이 글을 읽는 사람이면 이미 알고 있겠지만, 나는 간단한 게임 서버를 운영중이다. 엄격한 실시간을 요하는 게임이 아니어서 REST-ful API 서버 수준의 node.js로 만든 허접한 서버로, Synology NAS에 node.js docker image를 다운로드하여 실행해둔 것이다. 

그런데, 몇가지 문제로 골머리를 앓고 있다.

## 문제점

* 집에서 서버를 돌리고 있다는 점
	* 집 인터넷이 덤으로 느려진 느낌을 받는다.
	* 유저들이 대부분 북미/남미쪽 외국인이라 지연시간이 크다.
* 내 NAS에서 서버를 돌리고 있다는 점
	* NAS 하드디스크가 받는 부하가 크다. (업데이트)
	* NAS가 받는 부하도 크다.

물론, 문제점만 있는 것은 아니다.

## 장점

* 서버가 개발환경의 로컬 네트워크에 존재한다.
	* 업데이트 마다 FTP로 업로드하는 등의 수고가 줄어든다.
* 서버 제어가 간편하다.
	* Synology NAS + Docker 조합 = 훌륭한 UI

## 문제점 해소를 위해...

앞서 설명한 부담을 덜어보기 위해 생각하고 있던 것들은 다음과 같다.

* NAS 추가구입 : 서버 운영을 위한 NAS를 추가로 구입하여 별도로 운영한다.
	* 추가 비용 필요
	* 집 인터넷을 공유한다는 점은 변하지 않음
* 유료 호스팅 : 그냥 돈 내고 유료 서비스를 통해 서버를 운영한다.
	* 고정 지출 발생 - 재밌자고 하는 일에 굳이 돈을 쓸 필요까지...
* 무료 호스팅 : 무료 서비스를 찾아 그곳에 서버를 올린다.
	* 예전에 Glitch에 서버를 올렸던 경험을 떠올려보면 끔찍하다. 느리고, 끊기고, ...

그러던 중 발견하게 된 것이 Oracle Cloud Free tier 이다.

# Oracle Cloud Free tier

언제부터인지 모르겠으나 오라클에도 AWS와 유사한 클라우드 PC 서비스가 존재하고, 개인당 1개의 평생 무료 인스턴스를 생성할 수 있다. 물론 Free tier에서 선택할 수 있는 사양이나 OS는 제한된다.

## 인스턴스 생성

인스턴스를 생성하려하면 다양한 옵션이 제공된다. 아쉽게도 Windows는 무료 티어에서 사용할 수 없고, 리눅스나 Cent OS 중에서 골라야하는데, 리눅스 전문가가 아니라는 가정하에 이 때 Oracle Linux를 선택하면 낭패를 볼 수 있다. ~~사실 나는 반년 전 Oracle Linux를 선택했다가 nodejs 만 간신히 설치하고 더이상 진행할 수 없어서 묵혀뒀다가 이번에 다시 서버를 구성하게 된 것이다~~

* Canonical Ubuntu를 선택한다. (이 글 작성당시 20.04 버전)
* CPU는 AMD (VM.Standard.E2.1.Micro)를 선택했다. 별다른 이유는 없음

인스턴스를 생성하는 과정에 SSH 접속을 위한 SSH 키를 다운로드하는 항목이 있는데, 여기서 **전용 키**를 저장해두자.

생성을 누르면 다음화면으로 넘어가고, 어느정도 기다리면 인스턴스가 실행된다. 가입한 직후에는 이 단계에서 1일 이상 걸렸던 걸로 기억하지만, 한번 했던 계정이면 금방 진행된다.

## SSH로 접속하기

인스턴스 생성후 표시된 화면에 인스턴스의 공용 IP가 표시된다. 이 주소를 통해 인스턴스에 접속하여 이런저런 것들을 할 수 있다. ~~개인적으로 서버 관련 지식이 없다시피 해서 이 부분에서 가장 고생했다.~~ 일단 나는 SSH 접속을 위해 PuTTY를 사용했다. Windows 10 인경우 ssh 명령을 기본으로 제공하므로 그것을 사용해도 무관하지만, 나는 해본적 없으므로 설명은 생략.

순서대로 요약하면 다음과 같이 진행하면 된다.

* PuTTY 설치

구글링하면 쉽게 찾을 수 있다.

* PuTTYgen 실행
	* Conversions 메뉴 > ImportKey 선택
	* 앞서 다운로드해 둔 **전용 키** 파일을 선택
	* [선택] Key passphrase에 이 키가 사용될 때 입력할 암호 지정
		* 빈칸으로 두면 키가 사용될 때 암호 없이 로그인 된다.
	* Save private key 선택

여기까지 하면 PuTTY에서 사용하는 전용 private key 파일 (*.ppk) 파일이 생성된다.

* PuTTY 실행
* Session 카테고리에서
	* Host Name에는 ubuntu@{공용 IP}
	* Port는 22
	* Connection type은 SSH를 선택한다.
* Connection 카테고리의 SSH > Auth 에서 가장 아래의
	* Private key file for authentication에서, 위에서 만들어둔 private key 파일(*.ppk)을 지정한다.
* 다시 Session 카테고리로 돌아와
	* Saved Sessions 아래 빈칸에 적당한 이름을 입력하고,
	* Save 버튼을 클릭하여 지금껏 세팅한 내용을 저장한다.

이제 접속할 준비가 다 되었다.

* Connect 클릭
* PuTTY Security Alert 출력
	* 믿을 수 있는 호스트인지 물어보는 경고 -> Yes 선택
* 드디어 리눅스 콘솔 화면이 표시된다.

# 필수요소 설치

앞서 얘기한 오라클 리눅스와 우분투의 차이점으로, 우분투는 apt를 사용할 수 있다. 오라클 리눅스에도 추가로 설치할수 있는지는 모르겠다. apt가 없어 고생하지 말고 우분투를 설치할 것을 권장한다.

## node.js

처음에 node.js를 설치하려고 `sudo apt install nodejs`를 입력하면 E: Unable to locate package nodejs 같은 에러가 출력된다. 따라서 그 전에 리파지터리 목록을 먼저 업데이트 할 필요가 있다.

* `sudo apt update`
* `sudo apt install nodejs`
* `node -v`
	* v10.19.0 와 같이 nodejs 버전이 출력되면 성공

## nginx

웹서버를 띄우기 위해 apache2 나 nginx 를 설치해야 한다. 나의 경우 nginx를 설치하기로 했다.

* `sudo apt remove apache2`
* `sudo  apt install nginx`

nginx를 설정하는 작업은 이후에 진행한다.

## pm2

pm2는 nodejs용 프로세스 관리자이다. 여러개의 nodejs 인스턴스를 실행하고, 관리하는 것을 도와주는 강력한 프로그램이다. 콘솔창에서 바로 nodejs를 실행하면 실행된 상태로 블로킹되므로 연결을 끊지도 못하고 계속 그상태로 두어야 한다. 이런 삽질을 하지 않기 위한 것으로 이해하면 된다.

* `sudo apt install npm`
* `sudo npm install pm2 -g`
* `sudo pm2 list`

여기까지 진행했으면 멋진 pm2의 로고와 간단한 실행 예시가 출력된다. 실행된 인스턴스는 없으므로 테이블 헤더만 표시된다.

# 소스파일 업로드

오라클 서버에서 실행할 서버 소스파일을 업로드 해야한다. git에서 직접 clone 할 수도 있겠지만, 나의 경우 몇몇 설정파일이 필요하므로 로컬에 갖고 있는 소스를 FTP로 업로드하는 것을 선택했다.

## FileZilla

사이트 관리자 메뉴에서 다음과 같이 선택한다.

* 프로토콜: SFTP
* 호스트: 공개IP 주소
* 포트: 22
* 로그온 유형: 키 파일
* 사용자: ubuntu
* 키 파일: 앞서 만들어둔 PuTTY private key (*.ppk) 파일을 선택한다.

이렇게 적절히 입력하고 연결을 선택하면, 접속에 성공한다.

/home/ubuntu 디렉터리가 기본으로 표시된다. 업로드할 디렉터리를 생성하고, 소스파일을 업로드 하자.

# 소스파일 실행

`npm i` 등과 같이 nodejs 실행을 위한 기본 절차는 생략한다.

이 단계까지 왔으면 `node main.js` 처럼 실행하면 별 문제없이 잘 실행됨이 확인될 것이다.

## pm2

node를 통해 직접 실행하는 방법 대신 pm2를 통해 실행하려면 `pm2 start main.js`와 같이 입력하면 된다. 이때 직접 실행한것과 거의 동일한 결과가 출력될텐데, CTRL+C 등으로 빠져나와도 프로그램은 백그라운드에서 계속 실행되고 있다.

자세한 내용은 pm2를 구글링해보자.

백그라운드에서 잘 돌고 있는지는 `pm2 logs`를 입력한다. 최근의 콘솔 출력 15 line이 출력된다. 역시 CTRL+C로 빠져나온다.

# 포트개방, 방화벽

## nginx 포트포워딩

이제 서버는 실행가능하니 외부에서 서버에 접속할 수 있도록 작업을 해야한다.

* `sudo ls /etc/nginx/sites-enabled`
	* "default"가 출력됨을 확인
* `sudo nano /etc/nginx/sites-available/default`
	* nano 에디터가 실행된다.
* 스크롤을 내려 다음 라인을 찾는다.
	* `root /var/www/html;`
		* 이 라인을 삭제하거나 주석처리한다. (주석처리는 앞에 # 를 붙이면 된다)
		* 예) `# root /var/www/html;`
* 조금 아래의 `location / {`를 찾는다.
	* brace 사이에 `try_files $uri $rui/ =404;` 가 보일것이다.
		* 역시 삭제하거나 주석처리한다.
	* 그리고 brace 사이에 다음 내용을 삽입한다. (여기서 12345는 내 node 서버가 사용하는 포트번호이다)

		```
		proxy_pass http://localhost:12345;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		```

* CTRL+S
* CTRL+X

여기까지 했다면 콘솔로 되돌아왔을 것이다. `sudo nginx -t`를 입력하여 `test is successful`이 출력됨을 확인하자.

## Oracle Cloud 방화벽 설정

* Oracle Cloud 웹페이지에서 Networking / Virtual Cloud Networks 항목을 찾아 들어간다.
* 앞서 만든 인스턴스 이름을 클릭하고
* 서브넷 이름을 클릭하고
* Default Security List for {인스턴스명} 을 클릭하자.

여기까지 진행하면 몇가지 기본 수신 규칙들이 보일 것이다. 일단 80 포트를 개방해보자.

* 수신 규칙 추가
* 소스 CIDR: 0.0.0.0/0
* 대상 포트 범위: 80
* 수신 규칙 추가

같은 방법으로 443 포트도 개방하자.

## iptable

다시 ssh 콘솔에서 진행한다. (PuTTY 로 접속해둔...)

* `sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT`
* `sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT`
* `sudo netfilter-persistent save`
* `sudo systemctl restart nginx`

여기까지 진행했다면 이제 외부포트 80으로 접속했을 때, 내부포트 12345로 포워딩될 것이다. 따라서 내 node 서버의 포트는 그대로 유지해도 된다.

80 포트와 443 포트만 개방하는 이유는 cloudflare를 설정하게 될 경우 DDoS 공격을 방어하기 쉽기 때문(~~이라고 한다~~)

# 부하 확인

이제, 서버가 실행가능하고 외부에서도 접속 가능한 상태가 되었다. 남은 일은 내 서버가 Oracle Cloud 내에서 원할하게 돌아가는지 확인하는 일이다. Windows의 작업관리자와 유사한 htop을 설치해보자.

* `sudo apt install htop`
* `htop`

작업관리자 처럼 CPU나 메모리 등을 확인할 수 있다.

Free tier임에도 제법 많은 메모리를 지원하므로 무지막지한 서버가 아니라면 걱정하지 않아도 될 것으로 예상된다.

참고로 내 서버는 300메가정도의 데이터를 캐시하고 있지만 별로 문제되지 않는 것으로 보인다.

# 마치며

이것으로 드디어 내 NAS에서 서버를 돌리는 대신 Oracle Cloud에서 돌릴 수 있게 되었다. 당장 오늘 처음 해본 것이라, 자세히는 모르겠지만 분명 이 과정을 다 잊을 것이므로 시간내어 기록하게 되었다. 스크린샷도 추가하면서 글을 올릴까 했으나 딱히 스크린샷이 필요한 부분이 없어보인다.
