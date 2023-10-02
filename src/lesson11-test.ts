"use strict";

describe("lesson 11 numberToString", () => {
  const { expect } = chai;

  it("should be defined", () => {
    expect(numberToString).to.not.be.undefined;
  });

  it("for 1 should return one", () => {
    expect(numberToString(1)).to.equal("one");
  });

  it("for 2 should return two", () => {
    expect(numberToString(1)).to.equal("one");
  });

  describe("plain number", () => {
    const expected = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
    ];

    expected.forEach((text, num) => {
      it(`for ${num} should return ${text}`, () => {
        expect(numberToString(num)).to.equal(text);
      });
    });
  });

  describe("decimals", () => {
    const expected = {
      twenty: 20,
      thirty: 30,
      fourty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
    };

    Object.keys(expected).forEach((text) => {
      const num = expected[text as keyof typeof expected];

      it(`for ${num} should return ${text}`, () => {
        expect(numberToString(num)).to.equal(text);
      });
    });
  });
});
