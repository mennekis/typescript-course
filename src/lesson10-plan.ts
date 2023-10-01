// ********* Lesson 10 *********

// Utility This type
function utilityThisType() {
  // ThisType is a built-in utility type that allows you to specify the type of this inside an object literal, or inside a class declaration.

  type Math = {
    double(): void;
    half(): void;
    pow(n: number): void;
  };

  const math: Math = {
    double(this: { value: number }) {
      this.value *= 2;
    },
    half(this: { value: number }) {
      this.value *= 0.5;
    },
    pow(this: { value: number }, n: number) {
      this.value **= n;
    },
  };

  const obj = {
    value: 2,
    ...math,
  };

  obj.double();

  const math2: Math & ThisType<{ value: number }> = {
    double() {
      this.value *= 2;
    },
    half() {
      this.value *= 0.5;
    },
    pow(n: number) {
      this.value **= n;
    },
  };

  const obj2 = {
    value: 2,
    ...math2,
  };

  obj2.double();

  // example 2
  type TStateDescriptin<D, M> = {
    data: D;
    methods: M & ThisType<D & M>;
  };

  function createState<D, M>(desc: TStateDescriptin<D, M>): D & M {
    return {
      ...desc.data,
      ...desc.methods,
    };
  }

  const state = createState({
    data: {
      name: "John",
      age: 20,
    },
    methods: {
      getBirthYear() {
        return new Date().getFullYear() - this.age;
      },
    },
  });

  console.log("birthYear ", state.getBirthYear());
  console.log("name ", state.age);
  console.log("name ", state.name);
}
utilityThisType();

// String Manipulation Utilities
function stringManipulationUtilities() {
  // Uppercase
  // Lowercase
  // Capitalize
  // Uncapitalize

  /**
   * Convert string literal type to uppercase
   */
  type Uppercase<S extends string> = intrinsic;

  /**
   * Convert string literal type to lowercase
   */
  type Lowercase<S extends string> = intrinsic;

  /**
   * Convert first character of string literal type to uppercase
   */
  type Capitalize<S extends string> = intrinsic;

  /**
   * Convert first character of string literal type to lowercase
   */
  type Uncapitalize<S extends string> = intrinsic;

  // examples
  type Sizes = "small" | "medium" | "large";
  type UpperCaseSizes = Uppercase<Sizes>;
  type LowerCaseSizes = Lowercase<UpperCaseSizes>;

  type Colors = "red" | "green" | "blue";
  type WidgetTypes = `${Uppercase<Sizes>}-${Colors}`;
  const a: WidgetTypes = "SMALL-red";

  // used cases for string manipulation utilities
  // gettter
  type Getters<T> = {
    [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
  };
  // T & string - will non-string keys
  // as - will rename keys

  type TPoint = {
    x: number;
    y: number;
    z: number;
    name: string;
  };
  type TPointGetters = Getters<TPoint>;
  const pointGetter: TPoint & TPointGetters = {
    x: 1,
    y: 2,
    z: 3,
    name: "point",
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    getZ() {
      return this.z;
    },
    getName() {
      return this.name;
    },
  };
}
stringManipulationUtilities();

// Awaited<T> Utility
async function awaitedUtilityType() {
  const first: Promise<string> = new Promise<string>((resolve, reject) =>
    resolve("Superman")
  );
  const second: Promise<Promise<string>> = new Promise<Promise<string>>(
    (resolve, reject) =>
      resolve(new Promise<string>((resolve, reject) => resolve("Batman")))
  );
  const third: Promise<Promise<Promise<string>>> = new Promise<
    Promise<Promise<string>>
  >((resolve, reject) =>
    resolve(
      new Promise<Promise<string>>((resolve, reject) =>
        resolve(new Promise<string>((resolve, reject) => resolve("Spiderman")))
      )
    )
  );

  const firstResult = await first;
  // const secondResult = await (await second);
  // const thirdResult = await (await (await third));
  const secondResult = await second;
  const thirdResult = await third;

  type FirstAwaited = Awaited<typeof first>;
  type SecondAwaited = Awaited<typeof second>;
  type ThirdAwaited = Awaited<typeof third>;

  // Awaited type is a built-in utility type designed to get the type of a promise result, unwrapping nested promises

  /**
   * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
   */
  type Awaited<T> = T extends null | undefined
    ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
    : // if it is an thenable object (is object and has a callable `then` property)
    // then- extracts the type of the value that the thenable resolves to (resolve is first argument of then)
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
      ? Awaited<V> // recursively unwrap the value
      : never // the argument to `then` was not callable
    : T; // non-object or non-thenable

  // third.then((thirdResult) => console.log(thirdResult));
}
awaitedUtilityType();

// Utility types deep dive - Partial, Required, Readonly, Record, Pick, Omit, Exclude, Extract, NonNullable, ReturnType, InstanceType
function utilityTypesDeepDive() {
  // Partial
  // Required
  // Readonly
  // Record
  // Pick
  type TPoint = {
    x: number;
    y: number;
    z: number;
    name: string;
  };
  type TPoint2d = Pick<TPoint, "x" | "y">;
  type TPoint2d2 = {
    [P in "x" | "y"]: TPoint[P];
  };
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  // Exclude - exclude from T all union pargs that are assignable to U
  //   type Exclude<T, U> = T extends U ? never : T;
  type TPoint2d3Keys = Exclude<keyof TPoint, "z" | "name">;

  // Extract
  type Extract<T, U> = T extends U ? T : never;
  type TPoint2d4Keys = Extract<keyof TPoint, "x" | "y">;
  type TIntersection = Extract<"q" | "w" | "x" | "a", "x" | "y" | "a" | "b">;

  // Omit
  //   type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  type TPoint2d5 = Omit<TPoint, "z" | "name">;

  // NonNullable
  type TPointNullable = {
    x?: number | null;
    y?: number | null;
    z: number | null;
    name: string | null;
  };

  type TNotNullablePoint = NonNullable<TPoint>;

  // ReturnType
  type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : any;
  function sum(a: number, b: number) {
    return a + b;
  }
  type TSumReturnType = ReturnType<typeof sum>;

  // InstanceType
  //   type InstanceType<T extends abstract new (...args: any) => any> =
  //     T extends abstract new (...args: any) => infer R ? R : any;
  abstract class Point {
    constructor(public x: number, public y: number) {}
    abstract getDistance(): number;
  }
  type TPointInstanceType = InstanceType<typeof Point>;
  //   type TPpintAlias = Point;

  // PropertyKey type is a union of string | number | symbol
  // type PropertyKey = string | number | symbol;
  type PropertyKey = keyof any;
  // type Pro

  type PParam = Parameters<typeof sum>;
  type TPointTupple = [x: number, y: number]; // [number, number]
  const pointTupple: PParam = [1, 2];
  const point: TPointTupple = pointTupple;
  type TDIct = [word: string, description: number];
}
utilityTypesDeepDive();

// Enums
function enums() {
  enum FileAccess {
    None, // 000
    Read = 1 << 1, // 001
    Write = 1 << 2, // 010
    Execute = 1 << 3, // 100
    ReadWrite = Read | Write, // 011
  }

  function checkAccess(access: number) {
    if (access & FileAccess.Read) {
      console.log("Read");
    }
    if (access & FileAccess.Write) {
      console.log("Write");
    }
    if (access & FileAccess.Execute) {
      console.log("Execute");
    }
  }
  checkAccess(1);
  checkAccess(2);
  checkAccess(3);
  checkAccess(4);
  checkAccess(5);
}
enums();
