const { Add } = require("./calculator");

test("returns 0 for an empty string", () => {
    expect(Add("")).toBe(0);
});

test("returns the number when a single number is passed", () => {
    expect(Add("5")).toBe(5);
});

test("returns sum of two comma-separated numbers", () => {
    expect(Add("1,2")).toBe(3);
});

test("returns sum of any number of values", () => {
    expect(Add("1,2,3,4")).toBe(10);
});
  
test("supports new lines between numbers", () => {
    expect(Add("1\n2,3")).toBe(6);
});

test("supports custom delimiter", () => {
    expect(Add("//;\n1;2")).toBe(3);
});

test("throws error for negative numbers", () => {
    expect(() => Add("1,-2,-3")).toThrow("negatives not allowed: -2,-3");
});

test("ignores numbers greater than 1000", () => {
    expect(Add("2,1001")).toBe(2);
});
  
test("supports multi-char delimiters", () => {
    expect(Add("//[***]\n1***2***3")).toBe(6);
});
  