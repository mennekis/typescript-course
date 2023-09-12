// ********* Lesson 6 *********

// Q/A interface merging use case - express middleware example
function qaInterfaceMerging() {
  // express base
  interface Request {
    body: any;
  }

  function handleRequest(req: Request) {
    console.log(req.body);
  }

  // express middleware - adds json property to the request
  // by importing npm package of the middleware
  interface Request {
    json: any;
  }

  function handleRequestV2(req: Request) {
    console.log(req.body);
    console.log(req.json);
  }

  type TFormProps = {
    name: string;
    age: number;
    onSubmit: (values: any) => void;
  };
}
// Definite Assignment Assertions
function definiteAssignmentAssertions() {
  // definite assignment assertion is a way to tell the compiler that a variable is assigned
  // even though the compiler cannot detect it

  let userName: string;
  function fetchUserName() {
    userName = "John";
  }
  fetchUserName();
  // compiler can not detect that userName is assigned
  // because fetchUserName is a function that can be synchronous or asynchronous
  // console.log(userName); // undefined
  console.log(userName!); // fix here - use definite assignment assertion

  type TUser = {
    name: string;
    email: string;
    age: number;
    phone?: string;
  };

  let userObject!: TUser; // exclamantion mark is telling the compiler that userObject is definitely assigned
  // this is known as definite assignment assertion
  function buildUser() {
    userObject = {
      name: "John",
      email: "john@mail.com",
      age: 30,
    };
  }
  buildUser();
  console.log(userObject.name); // no error since userObject is declared as not null

  // definitive assignment assertion can be used with class properties
  class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;

      //   this.move(x, y);
    }

    move(x: number, y: number) {
      this.x += x;
      this.y += y;
    }
  }

  class Point2 {
    x!: number;
    y!: number;

    constructor(x: number, y: number) {
      this.move(x, y);
    }

    move(x: number, y: number) {
      this.x += x;
      this.y += y;
    }
  }

  class User {
    name!: string;
    email!: string;
    age!: number;
    phone?: string;
  }
  // the above class is an exaple where definitive assignment assertion is obused and should be avoided
}
definiteAssignmentAssertions();

// Never type
function neverType() {
  // never type is used to indicate that a function never returns
  // example
  const throwError = function (message: string) {
    throw new Error(message);
  };
  let result = throwError("error");
  console.log(result); // never

  const singForewer = function () {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log("never gonna give you up");
    }
  };
  let song = singForewer();
  // can also explicitly specify never type
  let test: never;
  // test = 123; // Type 'number' is not assignable to type 'never'.ts(2322)
  // can use this fact to ensure that all cases are covered in switch statement
  function example2() {
    type Sqare = {
      kind: "square";
      size: number;
    };
    type Rectangle = {
      kind: "rectangle";
      width: number;
      height: number;
    };
    // type Circle = {
    //   kind: 'circle';
    //   radius: number;
    // };
    type Shape = Sqare | Rectangle; // | Circle;
    function area(s: Shape) {
      if (s.kind === "square") {
        return s.size * s.size;
      } else if (s.kind === "rectangle") {
        return s.width * s.height;
      }
      // if include to the union type Circle, then the following code will trigger compile time error
      let shouldNeverOccur: never = s;
    }
    function assertNever(x: never): never {
      throw new Error("Unexpected object: " + x);
    }
  }
}
neverType();

// User-Defined Type Guards
function userDefinedTypeGuards() {
  type TSquare = {
    size: number;
  };

  type TRectangle = {
    width: number;
    height: number;
  };

  type TShape = TSquare | TRectangle;

  function isSquare(shape: TShape): shape is TSquare {
    return (shape as TSquare).size !== undefined;
  }

  function area(shape: TShape) {
    if (isSquare(shape)) {
      return shape.size * shape.size;
    }

    return shape.width * shape.height;
  }
}
userDefinedTypeGuards();

// Function overloading
function functionOverloading() {
  // a. revert array/string example
  function reverse(stringOrStringArray: string | string[]): string | string[] {
    if (typeof stringOrStringArray === "string") {
      return stringOrStringArray.split("").reverse().join("");
    } else {
      return stringOrStringArray.slice().reverse();
    }
  }

  const hello = reverse("hello"); // 'olleh'
  const abcd = reverse(["a", "b", "c", "d"]); // ['d', 'c', 'b', 'a']

  function reverseV2(str: string): string;
  function reverseV2(arr: string[]): string[];
  function reverseV2(
    stringOrStringArray: string | string[]
  ): string | string[] {
    if (typeof stringOrStringArray === "string") {
      return stringOrStringArray.split("").reverse().join("");
    } else {
      return stringOrStringArray.slice().reverse();
    }
  }

  const hello2 = reverseV2("hello"); // 'olleh'
  const abcd2 = reverseV2(["a", "b", "c", "d"]); // ['d', 'c', 'b', 'a']

  // b. makeDate example
  function makeDate(
    timestampOrYear: number,
    month?: number,
    day?: number
  ): Date {
    if (month !== undefined && day !== undefined) {
      return new Date(timestampOrYear, month, day);
    } else {
      return new Date(timestampOrYear);
    }
  }

  const d1 = makeDate(12345678); // 1970-01-01T00:00:12.345Z
  const d2 = makeDate(2020, 11, 11);

  const d3 = makeDate(2020, 11); // Error: Expected 2 arguments, but got 3.

  function makeDate2(timestamp: number): Date;
  function makeDate2(year: number, month: number, day: number): Date;
  function makeDate2(
    timestampOrYear: number,
    month?: number,
    day?: number
  ): Date {
    if (month !== undefined && day !== undefined) {
      return new Date(timestampOrYear, month, day);
    } else {
      return new Date(timestampOrYear);
    }
  }
  // Typescript will cause an error if the function is called with the wrong number of arguments
  // const d4 = makeDate2(2020, 11);
  const d5 = makeDate(2020, 11, 11);
  const d6 = makeDate(12345678);

  // implementation signature for the author of the function - to be used in the function body
  // call signature for the caller of the function - to be used in the function call
}
functionOverloading();

// Call Signatures
function callSignatures() {
  type TLogCallback = (message: string, userId?: string) => void;
  type TAddCallback = (x: number, y: number) => number;

  interface IComponentProps {
    handleAdd: TAddCallback;
    // same as above
    // handleAdd: (x: number, y: number) => number;
  }

  const props: IComponentProps = {
    handleAdd: (x, y) => x + y,
  };

  type TLogCallbackV2 = {
    // overloaded function signature
    (message: string): void;
    (message: string, userId?: string): void;
    (message: string, userId?: string, extra?: string): void;
  };
  type TAddCallbackV2 = {
    (x: number, y: number): number;
    // overloaded function signature
    (x: number, y: string, z: number): string;
  };
  interface ILogCallback {
    // overloaded function signature
    (message: string): void;
    (message: string, userId?: string): void;
    (message: string, userId?: string, extra?: string): void;
  }
  interface IAddCallback {
    (x: number, y: number): number;
    // overloaded function signature
    (x: number, y: string, z: number): string;
  }

  // constructor signature

  type TUser = {
    name: string;
  };

  type TUserConstructor = new (name: string) => TUser;

  type TUserConstructorV2 = {
    // note: the arrow is replaced by a colon
    // new (name: string) => TUser;
    new (name: string): TUser;
  };

  interface IUserConstructor {
    new (name: string): TUser;
    // multiple constructor signatures
    new (name: string, age: number): TUser;
    // and no new keyword overloads
    (name: string): TUser;
    (name: string, age: number): TUser;
    // and static members
    debugName: string;
    callsCount: number;
  }
}
callSignatures();

// Absstract Classes
function abstractClasses() {
  abstract class Logger {
    // includes abstract index signature
    abstract log(message: string): void;

    // and some implementation methods
    info(message: string): void {
      this.log(`INFO: ${message}`);
    }
    warn(message: string): void {
      this.log(`WARN: ${message}`);
    }
  }

  // fails when abstract methods are not implemented
  // class ConsoleLoggerBad extends Logger {}

  // should inherit from CLogger to implement concrete loggers
  class ConsoleLogger extends Logger {
    log(message: string): void {
      console.log(message);
    }
  }

  class FileLogger extends Logger {
    log(message: string): void {
      // write to file
    }
  }

  class DbLogger extends Logger {
    log(message: string): void {
      // write to db
    }
  }

  // can not create an instance of an abstract class
  // const logger = new Logger();
}
abstractClasses();

// Index Signatures
function indexSignatures() {
  // index signature is used to define a type for a dictionary
  // example
  const greetings = {
    a: "Hello",
    b: "World",
  };

  console.log(greetings["a"]); // Hello
  console.log(greetings["b"]); // World

  type TPerson = {
    name: string;
    dateOfBirth: Date;
  };
  type TDictionary = {
    [key: string]: string;
  };

  type TDictionaryV2 = {
    [key: number]: number;
  };

  type TPersonMap = {
    [key: string]: TPerson;
  };
  // map is used to store a collection of objects for a rapid search by a key (O(1) complexity)

  const people: TPersonMap = {
    joe: {
      name: "Joe",
      dateOfBirth: new Date(1980, 1, 1),
    },
    ann: {
      name: "Ann",
      dateOfBirth: new Date(1985, 1, 1),
    },
  };
  // add another person
  people["max"] = {
    name: "Max",
    dateOfBirth: new Date(1990, 1, 1),
  };
  // find a person by key
  people["joe"].dateOfBirth.toISOString();

  // can mix index signatures with other properties
  type TDictionaryV3 = {
    [key: string]: string;
    hello: string;
    // length: number;
    // Error: An index signature parameter type must be 'string'
  };
  // then hello is required
  const dictionary: TDictionaryV3 = {
    hello: "world",
  };

  // dictionary with length property - use intersection type instead
  interface IDictionary {
    [key: string]: string;
  }
  type IDictionaryWithLength = IDictionary & {
    length?: number;
  };
  const x5: IDictionaryWithLength = {
    test: "test string",
    // still causes an error when declaring as a single object
    // length: 10
  };
  // but allows to add length property later
  x5.length = 2;
  x5["somekey"] = "some value";

  // porblem - no type checking for index signatures - people['mike'] is undefined
  people["mike"].dateOfBirth.toISOString();

  type TPersonMap2 = {
    [key: string]: TPerson | undefined;
  };
  const people2: TPersonMap2 = {
    joe: {
      name: "Joe",
      dateOfBirth: new Date(1980, 1, 1),
    },
  };
  // people2['joe'].dateOfBirth.toISOString();
  people2["joe"]?.dateOfBirth.toISOString();
  people2["mike"]?.dateOfBirth.toISOString();
  // validates the property names correctly
  // people2['fox'] = {neme: 'Fox', dateOfBirth: new Date(1990, 1, 1)};
}
indexSignatures();

// Double assertions
function doubleAssertions() {
  type TPoint2D = {
    x: number;
    y: number;
  };
  type TPoint3D = {
    x: number;
    y: number;
    z: number;
  };
  // same as
  // type TPoint3DV2 = TPoint2D & {
  //     z: number;
  // }

  let point2D: TPoint2D = { x: 1, y: 2 };
  let point3D: TPoint3D = { x: 1, y: 2, z: 3 };

  // OK
  point2D = point3D;
  // Error: Type 'TPoint2D' is not assignable to type 'TPoint3D'.
  // point3D = point2D;
  point3D = point2D as TPoint3D; // type assertion - single assertion

  type TPerson = {
    name: string;
    dateOfBirth: Date;
  };

  // Error: Type 'TPoint2D' is not assignable to type 'TPoint3D'.
  // const person2: TPerson = point3D as TPerson;

  // double assertion -  convert tounknown type first
  // anything can be converted to unknown
  const person2: TPerson = point3D as unknown as TPerson;
}
doubleAssertions();

// This function parameter type
function thisFunctionParameter() {
  // a. this as param type name
  const data = {
    name: "Joe",
    age: 30,
    role: "Developer",
  };

  function toStringBad() {
    // no type check for this to be defined, this.name, this.age, this.role
    // type of this is any
    // return `${this.name}, ${this.age}, ${this.role}`;
    return "";
  }

  data.toString = toStringBad;
  // no type check
  toStringBad(); // undefined, undefined, undefined - or throws an error in strict mode

  function toStringGood(this: { name: string; age: number; role: string }) {
    // no type check for this to be defined, this.name, this.age, this.role
    return `${this.name}, ${this.age}, ${this.role}`;
  }
  data.toString = toStringGood;
  // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type '{ name: string; age: number; role: string; }'.
  // toStringGood();
  // OK
  toStringGood.call(data); // Joe, 30, Developer
  data.toString(); // Joe, 30, Developer

  const badData = {
    name: "Joe",
    toString: toStringGood,
  };
  // Error: Cannot read property 'name' of undefined
  // badData.toString();

  // Note: this parameter should be the first parameter of the function, only used in type checking

  // b. this in a class type alias
  class Box {
    width = "";
    height = "";
    constructor(width: string, height: string) {
      this.width = width;
      this.height = height;
    }

    // "this" here - is a type alias for the class
    equal(other: this) {
      return other.width === this.width && other.height === this.height;
    }
  }

  const box1 = new Box("10px", "20px");
  // Error: Argument of type '{}' is not assignable to parameter of type 'Box'.
  // box1.equal({});
  box1.equal(new Box("10px", "20px")); // true
}
thisFunctionParameter();

// Generic constraints
function genericConstraints() {
  function addFullNameV1<T>(obj: T) {
    // Error: Property 'fullName' does not exist on type 'T'.
    //   obj.fullName = `${obj.firstName} ${obj.lastName}`;
  }

  function addFullNameV2<T>(obj: T): T & { fullName: string } {
    // Error: Property 'fullName' does not exist on type 'T'.
    // return { ...obj, fullName: `${obj.firstName} ${obj.lastName}` };
    return {
      ...obj,
      fullName: `${(obj as any).firstName} ${(obj as any).lastName}`,
    };
  }

  interface IPerson {
    firstName: string;
    lastName: string;
  }
  function addFullNameV3<T extends IPerson>(obj: T): T & { fullName: string } {
    return { ...obj, fullName: `${obj.firstName} ${obj.lastName}` };
  }

  const person3 = addFullNameV3({
    firstName: "Joe",
    lastName: "Smith",
    age: 30,
    email: "john@sample.com",
  });

  // Error: Argument of type '{ firstName: string; }' is not assignable to parameter of type 'IPerson'.
  // const person4 = addFullNameV3({ firstName: 'Joe' });
}
genericConstraints();
