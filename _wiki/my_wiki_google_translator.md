---
layout  : wiki
title   : 구글 번역기 달았다
summary : 
date    : 2021-02-23 00:52:36 +0900
updated : 2021-02-23 01:22:08 +0900
tag     : google_translator gadget
toc     : true
public  : true
comment : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 왜?

* 내 위키 페이지의 일부는 나의 게임 커뮤니티용 자료로, 비공개+영어로 작성되어 있다. 
	* 이것들을 영어로 유지할지, 한국어로 재작성할지는 미정
* 페이지를 공개하자 (한글->영어)번역을 도와주겠다는 사람이 등장했다.
* 필요에 따라 영어로 작성하는 것도 좋겠지만, 역시나 빠르고 쉽게 쓰기 위한 위키에는 맞지 않는다
* 영어 페이지의 절반은 어짜피 번역기로 작성했다는 점

결론: 차라리 자동번역기나 하나 붙여놓자.

# 어떻게?

그냥 헤더에 우겨넣었다.
```html
<div class="site-title-right google_translate" id="google_translate_element"></div>
<script type="text/javascript">  
    function googleTranslateElementInit() { new google.translate.TranslateElement({
        pageLanguage: 'ko',
        includedLanguages: 'ko,en,pt,es,ja', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, 
        autoDisplay: true
    }, 'google_translate_element'); }  
</script>  
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"> 
</script>
```
Layout이 이상하게 깨지거나 헤더가 날라가는 등의 삽질 끝에 그나마 위화감이 덜한(?) 위치에 달아놓았다.

불편한 점은 번역하지 않기가 선택지에 보이질 않는데, 이 때문에 테스트 후 돌아오기가 성가시다.

어떻게 되겠지. ...
