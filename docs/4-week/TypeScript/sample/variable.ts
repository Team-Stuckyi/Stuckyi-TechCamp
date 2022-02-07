// --- 변수에 타입 설정 ---//
// 문자형과 숫자형
let str: string = "hi";
let num: number = 100;

console.log(str, num);

// 배열
let arr: Array<number> = [1, 2, 3]; // <>제네릭이라고 부르며 C#같은 언어에도 이러한 문법이 있다고 합니다.
let arr2: number[] = [1, 2, 3];

console.log(arr, arr2);

// 오브젝트
let obj: object = {};
let obj2: { name: string, age: number } = { name: "hoho", age: 22 };

console.log(obj, obj2);
// ----------------------//