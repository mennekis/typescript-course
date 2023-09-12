// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing) {
    return false;
  }

  function printThingDescription(arg: TThing) {
    // TODO: uncomment the following code
    // if (isWidget(arg)) {
    //   console.log(arg.name);
    // } else {
    //   console.log(arg.os);
    // }
  }
  printThingDescription({ name: "widget" });
  printThingDescription({ os: "android" });
}
exercise29();

// Create an overloaded function definitions
function exercise30() {
  type TWidget = {
    name: string;
    cost?: number;
  };
  type TGadget = {
    os: string;
    cost?: number;
  };
  type TThing = TWidget | TGadget;

  // TODO: add function overloading here
  function doSomething(obj: TThing): TThing {
    obj.cost = 100;

    return obj;
  }

  // TODO: fix problem - typeof a: TThing, not TWidget
  const a = doSomething({ name: "widget" } as TWidget);
  // TODO: fix same here - typeof b: TThing, not TGadget
  const b = doSomething({ os: "android" } as TGadget);

  console.log(a, b);
}
exercise30();

// Create call signatures
function exercise31() {
  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email?: string
  ) {}

  // TODO: add call signatures here. Add overrides for optional email param
  type TSaveUserCallback = { /* replace  with your code */ x: "" };
  // TODO: add call signatures here. Add overrides for optional email param
  interface ISaveUserCallback {}

  function createForm(onSubmit: TSaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";

    // TODO: uncomment the following line
    // onSubmit(firstName, lastName);
  }
  function createForm2(onSubmit: ISaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";
    const email = "jsmith@somemail.some.com";

    // TOOD: uncomment the following line
    // onSubmit(firstName, lastName, email);
  }

  // *** add constructor signatures here ***
  type TUserConstructor = { /* replace  with your code */ x: "" };
  interface IUserConstructor {}

  function createAndPrintUser(ctor: IUserConstructor) {
    // TOOD: uncomment the following lines
    // const user = new ctor('John Smith');
    // console.log(user);
  }
}
exercise31();

// Create an abstract class and concrete classes
function exercise32() {
  // TODO: make this class abstract
  class Animal {
    constructor(public name: string) {
      this.name = name;
    }
    // TODO: add abstract method named makeSound
    // makeSound ...
    eat(): void {
      console.log("eating");
    }
  }
  // TODO: inherit from Animal and implement makeSound method
  class Dog {}

  // TODO: uncomment the following lines, fix the errors
  // const myDog = new Dog('Buddy');
  // myDog.eat();
  // myDog.makeSound();
}
exercise32();

// Create a type for a dictionary with string keys and number values
function exercise33() {
  // TODO: create a type TDictionary
  // type TDictionary = {};

  // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
  const dictionary = {};

  // TODO: uncomment the following lines, fix the errors
  // dictionary['c'] = 3;
  // dictionary['d'] = '3'; // should cause an error error

  // TODO: implement a function that calculates number of characters
  // in a string using the dictionary type, and returns a most frequent character
  function getMostFrequentCharacter(str: string): string {
    return "";
  }
  console.log(getMostFrequentCharacter("She sells seashells by the seashore."));
}
exercise33();

// Use index signature and caching
function exercise34() {
  // TODO: Define a dictionary of student grades, add type definition using index signature
  // key is a student name, value is an array of grades (numbers)
  const studentGrades = {};

  // TODO: Implement function to calculate the average grade for a student
  function calculateAverageGrade(studentName: string): number | string {
    const studentFound = false;
    if (studentFound) {
      // TODO: calculate average grade
      return 0;
    } else {
      return "Student not found";
    }
  }

  // TODO: Iterate through the dictionary and display each student's average grade
  for (const studentName in studentGrades) {
    // TODO: call calculateAverageGrade and print the result
  }

  // TODO: add caching for the average grade calculation to the calculateAverageGrade function
}
exercise34();

// Use double assertion
function exercise35() {
  // TODO:Create two types: TPoint2D and TPoint3D
  interface TPoint2D {
    /* TODO: add definition for x and y props for coordinates */
  }
  interface TPoint3D {
    /* TODO: add definition for x, y and z props for coordinates */
  }

  let point2D: TPoint2D = { x: 1, y: 2 };
  let point3D: TPoint3D = { x: 1, y: 2, z: 3 };

  // TODO: fix the error by adding double assertion
  // point3D = point2D;
}
exercise35();

// use this parameter type annotation to fix the error in this code
function exercise36() {
  // Note: this object does not have a name property
  // but the toString function expects it to be there, and there is no type check
  const data = {
    firstName: "Joe",
    lastName: "Doe",
    age: 30,
    role: "Developer",
  };
  // TODO: add this param annotation, to enforce that this function
  // can only be called on an object with name, age and role properties
  function toString() {
    // TODO: remove the following line
    return "";
    // TODO: uncomment the following line
    // return `${this.name}, ${this.age}, ${this.role}`;
  }
  data.toString = toString;

  console.log(data.toString());
  console.log(data + "");
}
exercise36();

// EXERCISE (pause the video and do): fix the following code, use generic constraints
function exercise37() {
  interface IPerson {
    firstName: string;
    lastName: string;
  }
  // // TODO: add generic constraints to enforce type checking, add return type annotation
  // function addGreeting<T>(obj: T) {
  //   // TODO: implement the method sayHello that returns a greeting string
  //   // TODO: in the function generate variable fullName = `${obj.firstName} ${obj.lastName}`;
  //   // TODO: use fullName variable to generate a greeting string, for example: "Hello Joe Smith"
  //   // TODO: make sure the obj is not modified, and new object is returned
  // }
  // TODO: add generic constraints to enforce type checking, add return type annotation
  function addGreeting<T>(obj: T) {
    // TODO: implement the method sayHello that returns a greeting string
    // TODO: use firstName lastName props to generate a greeting string, for example: "Hello Joe Smith"
    // TODO: make sure the obj is not modified, and new object is returned
  }

  const person = addGreeting({
    firstName: "Joe",
    lastName: "Smith",
    age: 30,
    email: "john@sample.com",
  });

  // TODO: uncomment the following line and fix the error
  // console.log(person.sayHello());
}
exercise37();
