# React의 상태관리



#### 작성자 : [김우영](https://github.com/0x000613)

React의 상태관리 기법에 대해 정리하였습니다.

#### Reference

- [리액트의 Hooks 완전정복](https://velog.io/@velopert/react-hooks)

- [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)

  

## 01. useState

#### 1.1 기본적인 useState 구조

useState를 사용할 땐 코드의 상단에서 import 구문을 통해 불러오고 다음과 같이 사용합니다.

```javascript
const [value, setValue] = useState(0);
```

이러한 문법은 배열 비구조화 할당 문법이라고 하는데, 아래 코드는 배열 비구조화 할당을 이해하기 위해 준비한 예제입니다.

```javascript
// array라는 이름의 배열을 생성하고 원소값으로는 각각 'dog', 'cat', 'sheep'을 할당합니다.
const array = ['dog', 'cat', 'sheep'];
// 아래 코드는 각각 array의 0번째, 1번째 요소를 [first, second]에 할당합니다.
const [first, second] = array;
// 결론적으로 first 변수에는 'dog', second 변수에는 'cat'이라는 값이 들어가게 됩니다.
console.log(first, second); // dog cat
```

다음 코드는 useState의 기본 구조가 적용된 Component `Counter.js`입니다.

```javascript
/* 
    useState 기본 구조
 */

import React, { useState } from 'react';

// Counter 함수 (하단의 이벤트가 발생할때마다 실행됨)
const Counter = () => {
    // 비구조화 할당 문법을 사용하여 상태관리
    // useState(x) <- x에는 초기값이 들어가며 이는 value에 반영됨, setValue는 value의 상태를 update하기 위한 함수(?)
    const [value, setValue] = useState(0);
    // 이해를 위해 `console.log` 함수를 사용하여 출력해보면 value는 설정값, setValue는 함수로 출력된다.
    console.log(value, setValue);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;
```

위 Component를 `App.js`에서 호출하면 다음과 같이 실행됩니다.

![](./hooks-study/src/Images/Counter.js.jpg)

![](./hooks-study/src/Images/Counter.js-result.jpg)

+1 버튼을 클릭하게되면 `setValue` 함수를 호출하고 현재 `value`에 1을 더하여 상태를 업데이트,

-1버튼을 클릭하게되면 마찬가지로 `setValue`함수를 호출하여 현재 `value`에 1을 빼고 상태를 업데이트합니다.

#### 1.2 중복 사용 useState 구조

useState는 여러개를 동시에 사용하는것이 가능합니다.

다음은 `Info.js` Component입니다.

```javascript
/* 
    useState 중접 (여러개 사용)
 */
import React, { useState } from 'react';

const Info = () => {
    // 이름을 저장할 name state
    const [name, setName] = useState('');
    // 닉네임을 저장할 nickname state
    const [nickname, setNickname] = useState('');

    // 이름이 변경되면 실행될 onChangeName 함수
    const onChangeName = e => {
        setName(e.target.value);
    };

    // 닉네임이 변경되면 실행될 onChangeNickname 함수
    const onChangeNickname = e => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
            {/* input의 value는 name state로 지정, 값이 변경될때 onChangeName 함수 호출 */}
            <input value={name} onChange={onChangeName} />
            {/* input의 value는 nickname state로 지정, 값이 변경될때 onChangeNickname 함수 호출 */}
            <input value={nickname} onChange={onChangeNickname} />
        </div>
        <div>
            <div>
            <b>이름:</b> {name}
            </div>
            <div>
            <b>닉네임: </b>
            {nickname}
            </div>
        </div>
        </div>
    );
};

export default Info;
```

마찬가지로 `App.js`에서 호출합니다.

![](./hooks-study/src/Images/Info.js.jpg)

![](./hooks-study/src/Images/Info-result.jpg)

## 02. useEffect

useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다.

클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방합니다.

위에서 만들었던 Info component에 useEffect를 적용해보면 다음과 같습니다.

`info.js` 를 다음과 같이 수정합니다.

```javascript
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    (...)
  );
};

export default Info;
```

마찬가지로 `App.js`에서 수정한 Info-useEffect 컴포넌트를 추가하면 다음과 같은 기능이 추가됩니다.

![](./hooks-study/src/Images/Info.js-useEffect.jpg)
