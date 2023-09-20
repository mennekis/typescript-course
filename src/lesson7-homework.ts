// Use double assertion
function exercise35() {
  // TODO:Create two types: TUser and TProduct
  interface TUser {
    /* TODO: add definition for user name, title and email */
  }
  interface TProduct {
    /* TODO: add definition for product title, price and quantity */
  }

  let user: TUser = {};
  let product: TProduct = {};

  // TODO: fix the error by adding double assertion
  product = user;
}
exercise35();

// Use this parameter type annotation to fix the error in this code
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
  // TODO: run the code and observe the error
  console.log(data + "");
  console.log(data.toString());
  // TODO: add required properties to the data object, fixing the error
}
exercise36();

// Use generic constraints
function exercise37() {
  interface IPerson {
    firstName: string;
    lastName: string;
  }

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

// Use experimental decorators
function exercise38() {
  // TODO: implement decorator to print call count of the function
  function count() {
    // add params here
    let callCount = 0;
    // TODO: implement decorator
    // TODO: before calling the function increment callCount
    // TODO: after calling the function print callCount
  }
  // TODO: implement decorator to print execution time of the function
  function time() {
    // add params here
    // TODO: before calling the function get current time
    // TODO: after calling the function get current time
    // TODO: print the difference between the two times after calling the function
  }

  class Calculation {
    // TODO: add both decorators to the following method
    static add(a: number, b: number) {
      return a + b;
    }
  }
  // TODO: create instance of Calculation class and call add method
}
exercise38();

// Use 2023 decorators (Stage 3 decorator)
function exercise39() {
  // TODO: implement decorator to print call count of the function
  // TODO: implement decorator to print execution time of the function
  class Calculation {
    // TODO: add both decorators to the following method
    static add(a: number, b: number) {
      return a + b;
    }
  }
  // TODO: create instance of Calculation class and call add method
}
exercise39();
