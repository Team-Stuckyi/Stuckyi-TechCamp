const func = require("./func");
/**
 * 로그인 할때 정규 표현식 검사 테스트
 */
describe("첫번째 테스트", () => {
    const A = null;
    const B = undefined;

    test("A는 null인가?", () => {
        expect(A).toBeNull();
    });
    test("B는 undefined인가?", () => {
        expect(B).toBeUndefined();
    });
});

describe("두번쨰 테스트", () => {
    const C = "test";
    // 비어 있지 않은 문자열은 true로 반환된다.
    test("C는 true인가?", () => {
        expect(C).toBeTruthy();
    });
    /*
    test("C는 false인가?", () => {
        expect(C).toBeFalsy();
    });
    */
});

describe("세번쨰 테스트", () => {
    // func.sum(3,3) = 6
    test("D는 5보다 크다.", () => {
        expect(func.sum(3, 3)).toBeGreaterThan(5);
    });

    // func.sum(3,2) = 5
    test("D는 5이상 이다.", () => {
        expect(func.sum(3, 2)).toBeGreaterThanOrEqual(5);
    });

    // func.sum(5,3) = 8
    test("D는 10보다 작다", () => {
        expect(func.sum(5, 3)).toBeLessThan(10);
    });

    // func.sum(9,1) = 10
    test("D는 10이하 이다.", () => {
        expect(func.sum(9, 1)).toBeLessThanOrEqual(10);
    });
});

describe("네번쨰 테스트", () => {
    test("메뉴에 pizza가 있나요?", () => {
        const menu = "pizza";
        const menuList = ["chicken", "pizza", "hamburger"];
        expect(menuList).toContain(menu);
    });
});

describe("다섯번쨰 테스트", () => {
    test("강제 에러 테스트", () => {
        expect(() => func.throwErr()).toThrow();
    });

    test("의도한 Error 확인하기", () => {
        expect(() => func.throwErr()).toThrow("에러");
    });

    test("의도 하지 않은 Error일 경우", () => {
        expect(() => func.throwErr()).toThrow("??");
    });
});
