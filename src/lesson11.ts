const plainNumbers = [
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
];

const decimals = [
  "twenty",
  "thirty",
  "fourty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

plainNumbers[18] = "eighteen";

function numberToString(n: number): string {
  if (n in plainNumbers) {
    return plainNumbers[n];
  }

  if (n > 15 && n < 20) {
    return plainNumbers[n - 10] + "teen";
  }

  return "not implemented";
}
