// ********* Lesson 5 *********

// Q/A
// settimeout with 0 - https://javascript.info/settimeout-setinterval
function Q1() {
  setTimeout(() => console.log("1"), 1);
  setTimeout(() => {
    setTimeout(() => console.log("4"), 1);
    setTimeout(() => console.log("5"), 1);
    setTimeout(() => console.log("0"));
    setTimeout(() => console.log("0"));
    setTimeout(() => console.log("0"));
  }, 1);
  setTimeout(() => console.log("2"), 1);
  setTimeout(() => console.log("3"), 1);
}
// return type generic - https://www.typescriptlang.org/docs/handbook/generics.html#generic-type-variables
function Q2() {
  function formatCommandLineV2(command: string): string;
  function formatCommandLineV2(command: string[]): string[];
  function formatCommandLineV2(command: string | string[]): string | string[] {
    if (typeof command === "string") {
      return command.trim();
    }
    // it must be an array if it is not a string
    return command.map((arg) => arg.trim()).join(" ");
  }
  let a = formatCommandLineV2("  git status  ");
  let b = formatCommandLineV2(["  git", "status  "]);
}

// Type Narrowing
function typeNarrowing() {
  function repeat(value: string | number, times: number): string | number {
    if (typeof value === "string") {
      return value.repeat(times);
    } else if (typeof value === "number") {
      return value * times;
    }

    throw new Error("value must be string or number");
  }

  // in this funciton we are using typeof operator to narrow the type of the value - number or string
  // this is called type narrowing
  // within the if statement, the type of the value is narrowed to string or number
  // and we can see its type if hovering over the value
  // and we can use type-specific methods on the value

  // typeof operator is one of the ways to narrow the the union type to one of the types in the union
  // since typeof operator returns 'object' for any object, it is not very useful for narrowing object types

  // instanceof operator is another way to narrow the type of the object
  class Human {
    constructor(
      public name: string,
      public age: number,
      public driverLicenseId: string
    ) {}
  }
  class Animal {
    constructor(
      public name: string,
      public age: number,
      public species: string
    ) {}
  }
  type TPassanger = Human | Animal;

  function printPassangerInfoV2(passanger: TPassanger) {
    console.log(passanger.name);
    console.log(passanger.age);

    if (passanger instanceof Human) {
      console.log(passanger.driverLicenseId);
    }
    if (passanger instanceof Animal) {
      console.log(passanger.species);
    }
  }
  const human2 = new Human("John", 18, "123");
  const animal2 = new Animal("Daisy", 2, "Cat");
  printPassangerInfoV2(human2);
  printPassangerInfoV2(animal2);

  // and we can use property check to narrow the type of the object
  type TSquare = {
    size: number;
  };
  type TRectangle = {
    width: number;
    height: number;
  };
  type TShape = TSquare | TRectangle;
  function printShapeArea(shape: TShape) {
    if ("size" in shape) {
      console.log(shape.size * shape.size);
    }
    if ("width" in shape) {
      console.log(shape.width * shape.height);
    }
  }

  const square: TSquare = {
    size: 10,
  };
  const rectangle: TRectangle = {
    width: 10,
    height: 20,
  };
  printShapeArea(square);
  printShapeArea(rectangle);
}
typeNarrowing();

// Discriminated Unions
function discriminatedUnions() {
  // common approach to narrowing the type of the object is to use shared field with literal type
  // this is called discriminated union
  // example
  type TSquare = {
    kind: "square"; // pay attention to the literal type - this is not a value, but a type
    size: number;
  };

  type TRectangle = {
    kind: "rectangle"; // pay attention to the literal type - this is not a value, but a type
    width: number;
    height: number;
  };

  type TCircle = {
    kind: "circle";
    radius: number;
  };

  type TShape = TSquare | TRectangle | TCircle;

  function getShapeArea(shape: TShape) {
    // property check from prev lesson - used to narrow the type of the object
    // if ('size' in shape) {
    //   console.log(shape.size * shape.size);
    // }
    // if ('width' in shape) {
    //   console.log(shape.width * shape.height);
    // }

    // instead of using property check, we use discriminated union
    if (shape.kind === "square") {
      // this is value check, but it also narrows the type of the object
      return shape.size * shape.size;
    }
    if (shape.kind === "rectangle") {
      return shape.width * shape.height;
    }
    if (shape.kind === "circle") {
      return Math.PI * shape.radius * shape.radius;
    }

    throw new Error("invalid shape");
  }

  const square: TSquare = {
    kind: "square", // this is required property, with single possible value
    size: 10,
  };
  const rectangle: TRectangle = {
    kind: "rectangle", // this is required property, with single possible value
    width: 10,
    height: 20,
  };
  const circle: TCircle = {
    kind: "circle", // this is required property, with single possible value
    radius: 10,
  };
  console.log(getShapeArea(square));
  console.log(getShapeArea(rectangle));
  console.log(getShapeArea(circle));

  // another example
  type TSuccess = {
    success: true; // this is not a value, but a type - literal type of single possible value
    data: string;
  };
  type TError = {
    success: false; // this is not a value, but a type - literal type of single possible value
    error: string;
  };

  type TResponse = TSuccess | TError;

  function handleResponse(response: TResponse) {
    if (response.success) {
      // this is value check, but it also narrows the type of the object
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  }
  handleResponse({ success: true, data: "abc" });
  handleResponse({ success: false, error: "error" });
  // handleResponse({ success: true, error: 'error' }); // error - success and error are mutually exclusive
}
discriminatedUnions();

// Non-null Assertion Operator
function nonnullAssertionOperator() {
  type TPoint = {
    x: number;
    y: number;
  };

  let point: TPoint;
  function initPoint() {
    point = { x: 0, y: 0 };
  }
  initPoint();

  console.log(point!.x); //  error

  let point2: TPoint;
  function initPoint2() {
    return { x: 0, y: 0 };
  }
  point2 = initPoint2();
  console.log(point2.x); // no error

  // example 2
  type TPerson = {
    name: string;
    email?: string | null | undefined;
  };

  function sendEmail(email: string) {
    console.log("sending email to", email);
  }

  function ensureContactable(person: TPerson) {
    if (person.email == null) {
      throw new Error("person is not contactable");
    }
  }

  function contact(person: TPerson) {
    ensureContactable(person);
    sendEmail(person.email!);
  }

  function contact2(person: TPerson) {
    if (person.email == null) {
      throw new Error("person is not contactable");
    }
    sendEmail(person.email);
  }
}
nonnullAssertionOperator();

// Assertion Functions
function assertionFunctions() {
  type TPerson = {
    name: string;
    dateOfBirth: Date;
  };

  function assert(condition: unknown, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
  }
  function loadPerson(): unknown {
    const person = JSON.parse(
      '{ "name": "John", "dateOfBirth": "1990-01-01T00:00:00.000Z" }'
    );
    return person as unknown;
  }

  const person = loadPerson();
  assert(person !== null, "person must be defined");

  function assertDate(value: unknown): asserts value is Date {
    if (!(value instanceof Date)) {
      throw new TypeError("value must be a Date");
    }
  }

  function assertPerson(value: unknown): asserts value is TPerson {
    if (typeof value !== "object" || value === null) {
      throw new TypeError("value must be an object");
    }
    assert(
      typeof (value as TPerson).name === "string",
      "name must be a string"
    );
    assertDate((value as TPerson).dateOfBirth);
  }

  assertPerson(person);
  console.log(person.dateOfBirth.toISOString());
}
assertionFunctions();

// Interfaces
function interfaces() {
  type TPerson = {
    name: string;
    age: number;
  };

  type TPersonWithPhone = TPerson & {
    phone: string;
  };

  const person: TPersonWithPhone = {
    name: "John",
    age: 18,
    phone: "123-456-7890",
  };
  console.log("person data: ", person.name, person.age, person.phone);

  interface IPerson {
    name: string;
    age: number;
  }

  interface IPersonWithPhone extends IPerson {
    phone: string;
  }

  const person2: IPersonWithPhone = {
    name: "John",
    age: 18,
    phone: "123-456-7890",
  };

  console.log("person data: ", person2.name, person2.age, person2.phone);
}
interfaces();

// Interface Declaration Merging
function interfaceDeclarationMerging() {
  // declaration mergin allows to extend interface definition
  // example
  interface IPerson {
    name: string;
    age: number;
  }

  interface IPerson {
    phone: string;
  }
}
interfaceDeclarationMerging();

// implements keyword
function implementsKeyword() {
  // implements keyword is used to implement interface
  // example
  interface IPerson {
    name: string;
    age: number;
  }

  type TPerson = {
    name: string;
    age: number;
  };

  class Person implements IPerson {
    constructor(public name: string, public age: number) {}
  }
  class Personv2 implements TPerson {
    constructor(public name: string, public age: number) {}
  }

  const person = new Person("John", 18);
  console.log(person.name, person.age);

  // implements keyword is used to implement multiple interfaces
  // example
  interface IName {
    name: string;
  }

  interface IAge {
    age: number;
  }

  class Person2 implements IName, IAge {
    constructor(public name: string, public age: number) {}
  }

  const person2 = new Person2("John", 18);
  console.log(person2.name, person2.age);
  const somethingWithAge: IAge = person2;
  console.log(somethingWithAge.age);
  const somethingWithName: IName = person2;
  console.log(somethingWithName.name);
}

// Interfaces vs Type Aliases
function interfacesVsTypeAliases() {
  // 1. Objects / Functions
  // Both can be used to describe the shape of an object or a function signature. But the syntax differs.
  // Interface
  // interface Point {
  // x: number;
  // y: number;
  // }
  // interface SetPoint {
  // (x: number, y: number): void;
  // }
  // Type alias
  // type Point = {
  // x: number;
  // y: number;
  // };
  // type SetPoint = (x: number, y: number) => void;
  //
  // 2. Other Types
  // Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.
  // primitive
  // type Name = string;
  // object
  // type PartialPointX = { x: number; };
  // type PartialPointY = { y: number; };
  // union
  // type PartialPoint = PartialPointX | PartialPointY;
  // tuple
  // type Data = [number, string];
  //
  // 3. Extend
  // Both can be extended, but again, the syntax differs. Additionally, note that an interface and type alias are not mutually exclusive. An interface can extend a type alias, and vice versa.
  // Interface extends interface
  // interface PartialPointX { x: number; }
  // interface Point extends PartialPointX { y: number; }
  // Type alias extends type alias
  // type PartialPointX = { x: number; };
  // type Point = PartialPointX & { y: number; };
  // Interface extends type alias
  // type PartialPointX = { x: number; };
  // interface Point extends PartialPointX { y: number; }
  // Type alias extends interface
  // interface PartialPointX { x: number; }
  // type Point = PartialPointX & { y: number; };
  //
  // 4. Implements
  // A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.
  // interface Point {
  // x: number;
  // y: number;
  // }
  // class SomePoint implements Point {
  // x = 1;
  // y = 2;
  // }
  // type Point2 = {
  // x: number;
  // y: number;
  // };
  // class SomePoint2 implements Point2 {
  // x = 1;
  // y = 2;
  // }
  // type PartialPoint = { x: number; } | { y: number; };
  // FIXME: can not implement a union type
  // class SomePartialPoint implements PartialPoint {
  // x = 1;
  // y = 2;
  // }
  //
  // 5. Declaration merging
  // Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).
  // These two declarations become:
  // interface Point { x: number; y: number; }
  // interface Point { x: number; }
  // interface Point { y: number; }
  // const point: Point = { x: 1, y: 2 };
}

// Q/A
// Type Narrowing
// Discriminated Unions
// Non-null Assertion Operator
// Assertion Functions
// Interfaces
// Interface Declaration Merging
// implements keyword
// Interfaces vs Type Aliases
