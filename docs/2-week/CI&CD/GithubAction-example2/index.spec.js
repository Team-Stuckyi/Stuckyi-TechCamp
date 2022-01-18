const assert = require("assert");

describe("GET /tester", () => {
    it("테스트 예제2 - 실패시", (done) => {
        assert.equal(1, 2);

        done();
    });
});
