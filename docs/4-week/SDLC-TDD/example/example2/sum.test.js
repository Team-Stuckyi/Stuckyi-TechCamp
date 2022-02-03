const sum = require("./sum");

test("adds 1 + 2 to equal 4", () => {
    expect(sum(1, 2)).toBe(4);
});
