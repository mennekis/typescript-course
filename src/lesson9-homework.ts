// Use mappping types
function exercise47() {
   // implement mapped type that takes two types T and K
   // K must be a union of strings or numbers or symbols
   // the mapped type should create a new type that has all properties included in list K, and the value of each property is T
   type TRecord<K extends string | number | symbol, T> = {
      [key in K]: T;
   };
   // TODO: uncomment the following code and check if your mapped type works
   type TPoint = TRecord<"x" | "y" | "z", number>;
   const point: TPoint = {
      x: 1,
      y: 2,
      z: 3,
   };
}
exercise47();

// Use mappping types modifiers
function exercise48() {
   // implement mapped type that makes all properties of T optional and nullable
   type TPartialNullable<T> = {
      [key in keyof T]?: T[key] | null;
   };

   type TPoint = {
      x: number;
      y: number;
      z: number;
      name: string;
   };

   type TNullablePoint = TPartialNullable<TPoint>;
   const p1: TNullablePoint = { x: 10 };
   const p2: TNullablePoint = { x: 10, y: null };
}
exercise48();

// Template Literal Type
function exercise49() {
   // TODO: create a type that represents a string that contains Tshirts sizes (S, M, L, XL, XXL)
   // TODO: create a type that represents a string that contains Tshirts colors (red, green, blue)
   // TODO: create a type that represents a string that contains Tshirts sizes and colors (e.g. "S-red", "M-green", "L-blue")
   // TODO: create a function that takes a size and a color and returns a Tshirt size and color
   // TOOD: make sure you annotate the params and return type of the function
   type TSize = "S" | "M" | "L" | " XL" | "XXL";
   type TColor = "red" | "green" | "blue";
   type TTshirt = `${TSize}-${TColor}`;
   function createTshirt(size: TSize, color: TColor) {
      return `${size}-${color}`;
   }
   const tshirt = createTshirt("S", "red");
   console.log(tshirt);
}
exercise49();

// Fix autocoplete problem for literal union types
function exercise50() {
   // TODO: observe the problem with autocomplete in the line createCar("BMW");
   // TODO: fix the problem by using the approach from the lesson
   type Brands = "BMW" | "Mercedes" | "Audi";

   function createCar(brand: Brands) {
      return `${brand} car`;
   }
   // TODO: check if autocomplete works before and after the fix
   const car = createCar("Mercedes");
}
exercise50();

// Use satisfies constraint
function exercise51() {
   // Use satisfies constraint
   // TODO: create a tuple type that represents a 3d point
   type TPoint = [number, number, number];
   // TODO: create a type that represents a 3d shapes (key is a string, value is an array of 3d points)
   type TShapes = {
      [key: string]: TPoint[];
   };
   //  type Satisfies<T, K> = K extends keyof T ? K : never;
   const shapes: TShapes = {
      circle: [
         [1, 2, 3],
         [4, 5, 6],
         [7, 8, 9],
      ],
      square: [
         [1, 2, 3],
         [4, 5, 6],
      ],
   };

   // TODO: create a function that takes a list points and prints them into console
   function drawShape(shapeKey: keyof TShapes) {
      if (shapeKey in shapes) {
         const points = shapes[shapeKey];
         console.log(points);
      } else {
         const assertKey: unknown = shapeKey;
         throw new Error("SOME ERR");
      }
   }

   drawShape("circle"); // TODO: uncomment and fix this to have compile check error, using satisfies constraint
   drawShape("square"); // TODO: uncomment and fix this to have compile check error, using satisfies constraint
   //  drawShape(123); // TODO: uncomment and fix this to have compile check error, using satisfies constraint
}
exercise51();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra2() {
   /**
    * Write a program that prints the integers from 1 to 100 (inclusive).
    * But:
    *  - for multiples of three, print Fizz (instead of the number)
    *  - for multiples of five, print Buzz (instead of the number)
    *  - for multiples of both three and five, print FizzBuzz (instead of the number)
    */

   function fizzBuzz(): void {
      for (let i: number = 1; i <= 100; i++) {
         if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
         } else if (i % 3 === 0) {
            console.log("Fizz");
         } else if (i % 5 === 0) {
            console.log("Buzz");
         } else {
            console.log(i);
         }
      }
      // TODO: add your code here
   }
   fizzBuzz();
   /**
    * 1
    * 2
    * Fizz
    * 4
    * Buzz
    * ...
    */

   // TODO: convert fizzBuzz function to return a string output instead of printing to console
   function fizzBuzzToString(): string {
      // TODO: add your code here
      let result: string = "";
      for (let i: number = 1; i <= 100; i++) {
         if (i % 3 === 0 && i % 5 === 0) {
            result += "FizzBuzz\n";
         } else if (i % 3 === 0) {
            result += "Fizz\n";
         } else if (i % 5 === 0) {
            result += "Buzz\n";
         } else {
            result += i + "\n";
         }
      }
      return result;
   }
   const myOut = fizzBuzzToString();
   // TODO: write a test to validate fizzBuzz output using console.assert
   function testFizzBuzz() {
      const etalon = `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
Fizz
52
53
Fizz
Buzz
56
Fizz
58
59
FizzBuzz
61
62
Fizz
64
Buzz
Fizz
67
68
Fizz
Buzz
71
Fizz
73
74
FizzBuzz
76
77
Fizz
79
Buzz
Fizz
82
83
Fizz
Buzz
86
Fizz
88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz`;
      console.assert(myOut.trim() === etalon.trim(), "FizzBuzz test failed");
   }
   testFizzBuzz();
}
exerciseExtra2();
