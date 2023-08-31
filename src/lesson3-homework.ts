// try different target compiler options
function excercise10() {
  // TODO: declare a Rectangle class, with width and height properties
  // TODO: add a constructor which takes width and height as parameters
  // TODO: add a method `getArea` which returns the area of the rectangle
  // TODO: add a method `getPerimeter` which returns the perimeter of the rectangle
  // TODO: create an instance of the Rectangle class, with width 10 and height 20
  // TODO: call the method `getArea` and print the result to console
  // TODO: call the method `getPerimeter` and print the result to console
  // TODO: compile and run the code
  // TODO: change compiler target to ES5, complile and see the compiled code
  // TODO: change width and height properties to private, recomplile and
  // TODO: change compiler target to ES2015, complile and see the compiled code
  // TODO: change width and height properties to be prefixed with #, to use ESNext private fields support
  // TODO: change compiler target to ESNext, complile and see the compiled code
  // TODO: change compiler target to ES5, try to compile, check if you get the error Private identifiers are only available when targeting ECMAScript 2015 and higher.(18028)
}
// TODO: compile and run the code
excercise10();

// create a generic Stack class (Stack is a FILO data structure, push and pop methods are used to add and remove items from the top of the stack)
function excercise11() {
  // TODO: create a generic Stack class
  // TODO: add a private data property of type array of T
  // TODO: add a push method which takes an item of type T as a parameter and adds it to the top of the stack
  // TODO: add a pop method which removes and returns the item from the top of the stack
  // TODO: create an instance of the Stack class with number type
  // TODO: push two numbers to the stack
  // TODO: pop an item from the stack and print it to console, calling toFixed method on it
  // TODO: create an instance of the Stack class with string type
  // TODO: push two strings to the stack
  // TODO: pop an item from the stack and print it to console, calling toUpperCase method on it
}
// TODO: compile and run the code
excercise11();

// add type safety to the code which uses any
function excercise12() {
  // TODO: declare a type for user object, which has a name property of type string

  // TODO: fix the fetchUsers function to return an array of users, not any type
  function fetchUsers() {
    // TODO: add type safety to the data variable
    const data: unknown = JSON.parse(
      '{"users": [{"name": "John"}, {"name": "Jane"}]}'
    );

    // TODO: add check for the data type to contain list of users
    return data;
  }
  // TODO: fix typings of the users variable (currently it is of type any)
  const users = fetchUsers();
  // TODO: add type safety to the code to print the names of the users to console
  // users.forEach((user) => console.log(user.name));
}
// TODO: compile and run the code
excercise12();
