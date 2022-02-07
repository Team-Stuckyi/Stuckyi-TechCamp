// Tuple (배열의 타입 순서와 배열 길이를 지정할 수 있는 타입)
// tuple 자료형은 기본적으로 readonly (수정불가능 상태이지만 명시적으로 readonly를 사용했습니다.)
let tuple: readonly [string, number] = ['aa', 100];

console.log(tuple)

// Enum (Number 또는 String 값 집합에 고정된 이름을 부여할 수 있는 타입)

// Any 모든 데이터 타입을 허용합니다.
let any: any = "Can any types come here";

console.log(any)

/*
    이외에도 Void, Never 자료형이 존재하며, 각 값에 대한 정의는 다음과 같습니다.
    Void: 변수에는 undefined, null만 할당 가능하며 함수에는 return 값을 설정할 수 없는 타입
    Never: 특정 값이 절대 발생할 수 없음을 나타내는 타입
*/
