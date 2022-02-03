// 일반 함수
function sum(a: number, b: number): number {
    return a+b;
}

console.log(sum(1, 2))

//옵셔널 파라미터
function log(a: string, b?: string, c?: string) {
    console.log(a);
}

log("Hello", "World", '!');

//  에러 발생 (log 함수에서 a 인자는 문자형이어야하는데 number가 대입됨)
// log(sum(1, 5))

// 정상작동
log(String(sum(1, 5)));