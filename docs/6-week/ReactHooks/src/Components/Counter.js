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