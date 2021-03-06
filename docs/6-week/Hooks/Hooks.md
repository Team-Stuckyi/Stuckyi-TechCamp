# Hooks

[작성자: 노희재]
</br>
</br>

💡  Hooks 는 리액트 v16.8 에 새로 도입된 기능으로,

기본의 함수 컴포넌트에서는 할 수 없었던 다양한 작업을 할 수 있게 해줍니다.
</br>
</br>

## 1. useState

가장 기본적인 Hook 이며, 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해줍니다.
</br>
</br>

```jsx
import React, { useState } from 'react';
...
const [value, setValue] = useState(초기값);
```
</br>

- useState 함수의 파라미터에는 상태의 기본값을 넣어줍니다.

- 이 함수가 호출되면 배열을 반환합니다.
  
- 첫번째 원소는 상태값, 두번째 원소는 상태를 설정하는 함수입니다.
  
- 파라미터를 넣어서 호출하면 전달 받은 파라미터로 값이 바뀌고 컴포넌트가 리렌더링 됩니다.
  
- 하나의 useState 함수는 하나의 상태값만 관리할 수 있으므로
  
- 컴포넌트에서 관리해야 할 상태가 여러개라면 useState 를 여러번 사용해야 합니다.
</br>

## 2. useEffect

리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 입니다.

클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방합니다.
</br>
</br>
```jsx
import React, { useEffect } from 'react';
...
useEffect(() => {
	...처리할 내용...
});
```
</br>

- 설정한 함수를 화면에 맨 처음 렌더링 될 때만 실행하고, 업데이트 될 때는 실행하지 않으려면</br>함수의 두번째 파라미터로 비어있는 배열을 넣어주면 됩니다.
    
```jsx
    ex)
    
    useEffect(() => {
    	console.log('마운트 될 때만 실행');
    }, []);
```
    
</br>

- 특정값이 변경 될 때만 호출하고 싶다면 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어줍니다.
    
- 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면
    
    useEffect에서 뒷정리 함수를 반환해주어야 합니다.
    
</br>

## 3. useReducer

useState 보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로

업데이트 해주고 싶을 때사용하는 Hook 입니다.

현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션값을 전달 받아 새로운 상태를 반환합니다.
</br>
</br>

```jsx
const reducer = (state, action) => {
	return {...}; // 불변성을 지키며 업데이트한 새로운 상태를 반환
}

// 액션값은 다음과 같은 형태입니다
{
	type: 'INCREMENT',
	// 다른 값들이 필요하다면 추가로 들어감
}
```
</br>

- 첫번째 파라미터에는 리듀서 함수를 넣고, 두번째 파라미터에는 해당 리듀서의 기본값을 넣어줍니다.
- 이 Hook 을 사용하면 state 값과 dispatch 함수를 받아옵니다.
    
    여기서 state 는 현재 가리키고 있는 상태, dispatch 는 액션을 발생시키는 함수입니다.
    
- useReducer 의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것입니다.
- 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 합니다.

</br>

## 4. useMemo

함수 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있습니다.
</br>
</br>

```jsx
import React, { useMemo } from 'react';
...
useMemo(() => getAverage(list), [list]);
```

</br>

- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고,
원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식입니다.

</br>

## 5. useCallback

useMemo 와 상당히 비슷한 함수로, 주로 렌더링 성능을 최적화 해야하는 상황에서 사용합니다.

이 Hook 을 사용하면 만들어놨던 함수를 재사용 할 수 있습니다.
</br>
</br>

```jsx
import React, { useCallback } from 'react';

useCallback(e => {
	...
}, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성

useCallback(() => {
	...
}, [ex1, ex2]); // ex1 혹은 ex2 가 바뀌었을 때만 함수 생성
```

</br>

- 첫번째 파라미터에는 생성하고 싶은 함수를 넣고, 두번째 파라미터에는 배열을 넣으면 됩니다.
    
    이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.
    
- 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두번째 파라미터 안에 포함시켜주어야 합니다.

</br>

## 6. useRef

함수 컴포넌트에서 ref 를 쉽게 사용할 수 있도록 해줍니다.
</br>
</br>

```jsx
import React, { useRef } from 'react';

const id = useRef(1);
```
</br>

- useRef 를 사용하여 ref 를 설정하면 useRef 를 통해 만든 객체 안의
    
    current 값이 실제 엘리먼트를 가리킵니다.
    
- ref 안의 값이 바뀌어도 컴포넌트가 렌더링 되지 않는다는 점을 주의해야 합니다.


</br>
</br>
