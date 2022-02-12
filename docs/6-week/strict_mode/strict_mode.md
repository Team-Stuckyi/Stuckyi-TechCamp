# Strict mode

#### 작성자 : [이슬기](https://github.com/abcabcp)

## 1.Strict mode란?
``` js
function foo(){
    x= 10;
}
foo();
console.log(x); // ?
```
- foo 함수 내에서 선언하지 않은 x 변수에 값 10을 할당했다.
- 전역 스코프에도 x의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x를 동적 생성한다. 이때 전역 객체의 x 프로퍼티는 마치 전역변수처럼 사용된다. 이를 암묵적 전역 이라 한다.
- 개발자의 의도와는 상관없이 발생한 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다.
- 따라서 반드시 var, let, const 키워드를 사용해 변수를 선언한 다음 사용해야 한다.
- 이를 지원하기 위해 ES5부터 strict mode가 추가 되었다.
- strict mode는 자바스크립트의 언어와 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.
- 비슷하게 ESLint 같은 린트 도구도 있는데, 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류 뿐 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅 해주는 도구임으로, strict mode 보다는 ESLint를 사용하도록 하자.
    - vscode 확장프로그램 -> ESLint 

## 2.Strict mode의 적용
- use strict("use strict" 혹은 'use strict')형태로 이뤄진 하나의 행을 쓰면 된다. (세미콜론 여부 상관 없음)
  
    ``` js
    "use strict"; //'use strict'
    ```
​
- 전역 의 선두에 선언할 수 있다.
    ``` js
    "use strict";

    function foo(){
        x= 10;  //Uncaught ReferenceError: x is not defined
    }
    foo();

    ```
- 함수 몸체의 선두에 추가할 수 있다.
    ```js
    function foo(){
        "use strict";
        x= 10;  //ReferenceError: x is not defined
    }
    foo();
    ```
- 코드의 선두에  "use strict";를 위치시키지 않으면 제대로     
     ```js
    function foo(){
        x= 10;  //에러가 발생하지 않는다.
         "use strict";
    }
    foo();
    ```

## 3.Strict mode가 발생시키는 에러

- 암묵적 전역
    ``` js
    (function (){
        "use strict";

        x = 1;
        console.log(x); //ReferenceError: x is not defined
    }())
    ```
    - 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.
- 변수, 함수, 매개변수의 삭제
    ``` js
    (function (){
        "use strict";

        var x = 1;
        delete x; //SyntaxError: Delete of an unqualified identifier in strict mode.

        function foo(a){
            delete a; //SyntaxError: Delete of an unqualified identifier in strict mode.
        }

        delete foo; //SyntaxError: Delete of an unqualified identifier in strict mode.
    }());
    ```
    - delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.
- 매개변수 이름의 중복
     ``` js
    (function (){
        "use strict";

        function foo(x, x){
            return x + x;
        }

       console.log(foo(1,2)); //SyntaxError: Duplicate parameter name not allowed in this context
    }());
    ```
    - 중복된 매개변수 이름을 사용하면 에러가 발생한다.

- with 문의 사용
    - with 문은 전달된 객체를 스코프 체인에 추가한다. with 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지기 때문에 사용하지 않는 것이 좋다.
  ``` js
    (function (){
        "use strict";

        with({ x : 1 }){
            console.log(x); //SyntaxError: Strict mode code may not include a with statement
        }
    }());

  ```

## 4.Strict mode 적용에 의한 변화
- 일반 함수의 this
    - strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이 때 에러는 발생하지 않는다.
   ``` js
    (function (){
        "use strict";

        function foo(){
            console.log(this);  //undefined
        }
        foo();

        function Foo(){
            console.log(this);  //Foo
        }

        new Foo();
    }());
    ```
  
- arguments 객체
    - strict 모드에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.
    ``` js
    (function (a){
        "use strict";
        //매개변수에 전달된 인수를 재할당하여 변경
        a = 2;
        console.log(arguments); //{0:1, length: 1}
    }(1));
    ```



> reference
>
> 모던 자바스크립트 deep dive