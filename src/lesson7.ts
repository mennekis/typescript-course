function lesson7() {
  // ********* Lesson 7 *********

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

    type TPerson = {
      name: string;
      age: number;
      role: string;
    };

    function toStringGood(this: TPerson) {
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

    class Person {
      name = "";
      age = 0;
      role = "";

      constructor(name: string) {
        this.name = name;
      }

      toString() {
        return `${this.name}, ${this.age}, ${this.role}`;
      }

      print() {
        console.log(this.toString());
      }
    }
    // b. this in a class type alias
    class Box {
      width = "";
      height = "";
      constructor(width: string, height: string) {
        this.width = width;
        this.height = height;
      }

      toString = toStringGood;

      // "this" here - is a type alias for the class
      equal(other: Box) {
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
      // obj.fullName = `${obj.firstName} ${obj.lastName}`;
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
    function addFullNameV3<T extends IPerson>(
      obj: T
    ): T & { fullName: string } {
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

  // Decorators
  function decorators() {
    // // to enable decorators in tsconfig.json
    // // "experimentalDecorators": true
    // // decorators are functions that can be attached to classes, methods, properties, parameters
    // // 1. class decorators are called when class is declared
    function Component(constructor: Function) {
      console.log("Component decorator added to", constructor);
      constructor.prototype.datestamp = Date.now();
      constructor.prototype.log = function () {
        console.log("datestamp", this.datestamp);
      };
    }
    // @Component
    // class Person {
    //   firstName = "";
    //   lastName = "";
    //   constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //   }
    // }
    // const p1 = new Person("Joe", "Smith");
    // // (p1).log();
    // // class BasePerson {
    // //   datestamp = Date.now();
    // //   log() {
    // //     console.log("datestamp", this.datestamp);
    // //   }
    // // }
    // // class Person2 extends BasePerson {
    // //   firstName = "";
    // //   lastName = "";
    // //   constructor(firstName: string, lastName: string) {
    // //     super();
    // //     this.firstName = firstName;
    // //     this.lastName = lastName;
    // //   }
    // // }
    // // // decorator echieves the same result
    // // 2.parameter decorators
    // function ComponentWithParam(value: number) {
    //   return function (constructor: Function) {
    //     console.log(`Component with ${value} decorator added to`, constructor);
    //     constructor.prototype.datestamp = Date.now();
    //     constructor.prototype.id = value;
    //     constructor.prototype.log = function () {
    //       console.log("datestamp", this.datestamp);
    //     };
    //   };
    // }
    // @ComponentWithParam(10)
    // class Person3 {
    //   firstName = "";
    //   lastName = "";
    //   constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //   }
    // }
    // // 3. multiple decorators
    // function Stringify(constructor: Function) {
    //   console.log("Stringify decorator added to", constructor);
    //   constructor.prototype.toString = function () {
    //     return JSON.stringify(this);
    //   };
    // }
    // @ComponentWithParam(20)
    // @Stringify
    // class Person4 {
    //   firstName = "";
    //   lastName = "";
    //   constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //   }
    // }
    // // compiled to
    // //   Person4 = __decorate([
    // //     ComponentWithParam(20),
    // //     Stringify
    // // ], Person4);
    // // first Stringify is called, then ComponentWithParam
    // // 4.method decorators
    // function Log(
    //   target: any,
    //   methodName: string,
    //   descriptor: PropertyDescriptor
    // ) {
    //   console.log("Log decorator added to", methodName);
    //   const originalMethod = descriptor.value;
    //   descriptor.value = function (...args: any[]) {
    //     console.log("Log decorator - before method call");
    //     const result = originalMethod.apply(this, args);
    //     console.log("Log decorator - after method call");
    //     return result;
    //   };
    // }
    // // function loggedMethod(originalMethod: any, _context: any) {
    // //   function replacementMethod(this: any, ...args: any[]) {
    // //     console.log("LOG: Entering method.");
    // //     const result = originalMethod.call(this, ...args);
    // //     console.log("LOG: Exiting method.");
    // //     return result;
    // //   }
    // //   return replacementMethod;
    // // }
    // class PersonWithLog {
    //   firstName = "";
    //   lastName = "";
    //   constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //   }
    //   @Log
    //   printFullName() {
    //     console.log(`full name: ${this.firstName} ${this.lastName}`);
    //   }
    // }
    // const p = new PersonWithLog("Joe", "Smith");
    // p.printFullName();
    // // 5.getter decorators
    // function padLeftWith(num: number, char = " ") {
    //   return function (
    //     target: any,
    //     methodName: string,
    //     descriptor: PropertyDescriptor
    //   ) {
    //     const original = descriptor.get;
    //     descriptor.get = function () {
    //       const result = original?.call(this);
    //       if (typeof result === "string" && result.length < num) {
    //         return char.repeat(num - result.length) + result;
    //       }
    //       return result;
    //     };
    //   };
    // }
    // class PersonWithGetter {
    //   firstName = "";
    //   lastName = "";
    //   constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //   }
    //   @padLeftWith(20, "-")
    //   get fullName() {
    //     return `${this.firstName} ${this.lastName}`;
    //   }
    // }
    // const p2 = new PersonWithGetter("Joe", "Smith JR");
    // console.log(p2.fullName); // --------------Joe Smith
    // // 6. property decorators
    // // "useDefineForClassFields": false, in tsconfig.json or "target": "2016
    // function PropertyValidator(regexp: RegExp) {
    //   return function (
    //     target: any,
    //     propertyName: string
    //     // descriptor: PropertyDescriptor
    //   ) {
    //     console.log("PropertyValidator decorator added to", propertyName);
    //     let value: string;
    //     const descriptor: PropertyDescriptor = {
    //       get() {
    //         return value;
    //       },
    //       set(newValue: string) {
    //         console.log(`!!! Validating ${propertyName} value ${newValue}`);
    //         if (!regexp.test(newValue)) {
    //           throw new Error(`Invalid ${propertyName} value ${newValue}`);
    //         }
    //         value = newValue;
    //       },
    //     };
    //     Object.defineProperty(target, propertyName, descriptor);
    //   };
    // }
    // class User {
    //   @PropertyValidator(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)
    //   email?: string;
    //   constructor(email: string) {
    //     console.log("constructor");
    //     this.email = email;
    //   }
    // }
    // const user = new User("asdf@test.com");
    // user.email = "test@test.com";
    // console.log(user.email); // test@gmail.com
    // // user.email = "test";
    // // // error
    // // 7. parameter decorators
    // function Watch(target: any, methodName: string, paramIndex: number) {
    //   console.log("Watch decorator added to", methodName);
    //   console.log("paramIndex", paramIndex);
    // }
    // class Vehicle {
    //   move(@Watch speed: number) {
    //     console.log(`Moving at speed ${speed}`);
    //   }
    // }
    // const v = new Vehicle();
    // v.move(100);
    // // // Decorators in React
    // // decorator/navbar.js
    // // import React, {Component} from "react";
    // // export default function navBar() {
    // //     return function(Child) {
    // //       return class extends Component {
    // //          constructor(props) {
    // //            super(props);
    // //          }
    // //          render() {
    // //            return (
    // //              <div>
    // //                <h2>Hello this is the navigation bar</h2>
    // //                <Child />
    // //              </div>
    // //            )
    // //         }
    // //      }
    // //  }
    // // // anotherComponent.js
    // // import React, {Component} from "react";
    // // import navBar from "./decorator/navBar";
    // // @navBar()
    // // class AnotherComponent extends Component {
    // //   render() {
    // //    return(
    // //      <div>
    // //        <p>Hello World</p>
    // //       </div>
    // //    )}
    // // }
    // // more resources
    // // https://dev.to/danywalls/decorators-in-typescript-with-example-part-1-m0f
    // // https://dev.to/danywalls/using-property-decorators-in-typescript-with-a-real-example-44e
  }
  decorators();

  // typescript5 stage3 decorators
  function staget3Decorators() {
    // 1. class decorators
    //@printDecoratorData
    class Manager {
      task: string = "Simple task";
      project: string = "Simple project";
      constructor() {
        console.log("Initializing the Manager class");
      }
    }
    console.log("Before new Manager()");
    const manager = new Manager();
    console.log(manager);

    function printDecoratorData(
      value: Function,
      context: ClassDecoratorContext
    ) {
      console.log("value: ", value);
      console.log(context);
      context.addInitializer(() => {
        console.log("Initialized class v1" + context.name);
      });
    }

    // 2. method decorators
    // RESULT:
    // class Person {
    //   name: string;
    //   constructor(name: string) {
    //     this.name = name;
    //   }
    //   greet() {
    //     console.log(`Hello, my name is ${this.name}.`);
    //   }
    //   // greet() {
    //   //   console.log("LOG: Entering method.");
    //   //   console.log(`Hello, my name is ${this.name}.`);
    //   //   console.log("LOG: Exiting method.");
    //   // }
    // }
    // const p = new Person("Ron");
    // p.greet();

    function loggedMethod(
      originalMethod: Function,
      _context: ClassMethodDecoratorContext
    ) {
      function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.", _context);
        const result = originalMethod.call(this, ...args);
        console.log("LOG: Exiting method.");
        return result;
      }
      return replacementMethod;
    }
    class Person2 {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
      //@loggedMethod
      greet() {
        console.log(`Hello, my name is ${this.name}.`);
      }
    }
    const p2 = new Person2("Ron");
    p2.greet();
    // 3. method decorators 2
    function bound(
      originalMethod: Function,
      context: ClassMethodDecoratorContext
    ) {
      console.log("inside of bound decorator");
      const methodName = context.name;
      if (context.private) {
        throw new Error(
          `'bound' cannot decorate private properties like ${
            methodName as string
          }.`
        );
      }
      context.addInitializer(function () {
        // this[methodName] = this[methodName].bind(this); // this is unknown
        console.log("inside of bound decorator initializer", this);
        const thisAsAny = this as any;
        thisAsAny[methodName] = thisAsAny[methodName].bind(this);
      });
    }
    console.log("before class declaration");

    class Person3 {
      name: string;
      constructor(name: string) {
        console.log("ctor");
        this.name = name;
      }

      //@bound
      //@loggedMethod
      greet() {
        console.log(`!!!Hello!!! My name is ${this?.name}.`);
      }
    }
    console.log("after class declaration");
    // same as
    // class Person4 {
    //   name: string;
    //   constructor(name: string) {
    //     this.name = name;
    //   }
    //   greet = () => {
    //     console.log(`Hello, my name is ${this.name}.`);
    //   };
    // }
    // This code is written to ensure that this isn’t re-bound if greet is called as a stand-alone function or passed as a callback.
    console.log("before new Person3");

    const p3 = new Person3("Ron");
    const greet = p3.greet;
    // Works!
    console.log("calling method");
    greet();
    greet();
    setTimeout(p3.greet, 1000);
  }
  staget3Decorators();
}
lesson7();
