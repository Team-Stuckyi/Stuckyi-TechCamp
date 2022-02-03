const func = {
    sum: (num1, num2) => {
        return num1 + num2;
    },
    throwErr: () => {
        throw new Error("에러");
    },
};

module.exports = func;
