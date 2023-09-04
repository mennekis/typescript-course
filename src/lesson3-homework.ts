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

// EXCERCISE (pause the video and do): use any to quickly compile the code
function excercise13() {
  // TODO: go through this legacy code and add type safety in ALL places where `any` type is used
  // TODO: start from uncommenting the code below
  // TODO: no need to run the code, or even fully understand what it does
  /*
  let books, book, chapter;

  books = {
    Gen: "50 31 25 24 26 32 22 24 22 29 32 32 20 18 24 21 16 27 33 38 18 34 24 20 67 34 35 46 22 35 43 54 33 20 31 29 43 36 30 23 23 57 38 34 34 28 34 31 22 33 26",
    Exod: "40 22 25 22 31 23 30 29 28 35 29 10 51 22 31 27 36 16 27 25 26 37 30 33 18 40 37 21 43 46 38 18 35 23 35 35 38 29 31 43 38",
    Lev: "27 17 16 17 35 26 23 38 36 24 20 47 8 59 57 33 34 16 30 37 27 24 33 44 23 55 46 34",
    Num: "36 54 34 51 49 31 27 89 26 23 36 35 16 33 45 41 35 28 32 22 29 35 41 30 25 19 65 23 31 39 17 54 42 56 29 34 13",
    Deut: "34 46 37 29 49 33 25 26 20 29 22 32 31 19 29 23 22 20 22 21 20 23 29 26 22 19 19 26 69 28 20 30 52 29 12",
  };

  function getChaptersCount(book) {
    const bookIndex = books[book].split(" ");
    return bookIndex.length;
  }

  // Sets the options for the verse dropdown.
  function getVerseCount(book, chapter) {
    const bookIndex = books[book].split(" ");
    const num = bookIndex[chapter - 1];
    return num;
  }

  function printCHepers() {
    const bookText = this.responseText;
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>',
      osisID = book + "." + chapter,
      start = bookText.indexOf('<chapter osisID="' + osisID + '"'),
      end = bookText.indexOf("</chapter>", start) + 10;
    xmlString += bookText.substring(start, end);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    console.log(xmlDoc);
  }

  function xhrError() {
    console.error(this.statusText);
  }

  function loadFile(sURL) {
    let oReq = new XMLHttpRequest();
    oReq.onload = printCHepers;
    oReq.onerror = xhrError;
    oReq.open("get", sURL, true);
    oReq.send(null);
  }

  book = "Exod";
  chapter = 3;

  console.log("book", book);
  console.log("getChaptersCount", getChaptersCount(book));
  console.log("getVerseCount", getVerseCount(book, 1));
  loadFile("../wlc/" + book + ".xml");
  */
}
excercise13();

// add type assertion to the code
function excercise14() {
  // NOTE: do not change this function
  function fetchUserAge(): unknown {
    const responseText = '{"name": "John", "age": 18}';
    return JSON.parse(responseText).age;
  }
  const userAge = fetchUserAge();
  // TODO: uncomment the following code and add type assertion to fix the error
  // console.log(userAge + 1);
}
// TODO: compile and run the code
excercise14();

// use type casting to fix the mistake in the code
function excercise15() {
  function fetchUserAge(): number {
    const responseText = '{"name": "John", "age": "18"}';

    return JSON.parse(responseText).age;
  }
  const userAge = fetchUserAge();
  // TODO: run the code below and observe the result, explain why it is happening,
  // TODO: add type casting to the function above, to fix the error
  if (userAge > 16) {
    console.log("You are old enough to drive");
  }
}
// TODO: compile and run the code
excercise15();

// use type declarations to fix the comments in the code
function excercise16() {
  // TODO: add code which uses process.env.NODE_ENV variable,
  // TODO: try to compile and see the error
  // TODO: add type declaration for process.env.NODE_ENV variable in global.d.ts file
  // TODO: try to compile and see the error fixed
  // TODO: remove global.d.ts file, copile and see the error again
  // TODO: install type declarations from error message -  @types/node
  // check defintly typed website - https://definitelytyped.org/ - try to search for some other type declarations (express, react, etc.)
}
// TODO: compile and run the code
excercise16();

// create an npm package of your own
function excercise17() {
  // TODO: register on npmjs.com
  // TODO: check email and confirm npm account email
  // TODO: create a git repository for your package, name it test-npm-package
  // TODO: clone the repository to your local machine
  // TODO: run npm login to login to npm > npm login
  // TODO: run npm init -y to create package.json file > npm init -y
  // TODO: install typescript > npm install -g typescript -D
  // TODO: create tsconfig.json file > npx tsc --init --rootDir src --outDir lib --declaration --sourceMapn --declarationMap
  // TODO: update package.json file with the following values
  // "types": "lib",
  // "scripts": {
  //   "build": "tsc",
  //   "start": "tsc -w",
  // },
  // TODO: update package name to @yourusername/test-npm-package
  // TODO: make sure yourusername is the same as your npmjs.com username
  // TODO: create ./index.ts file with the following code
  // export const add = (a: number, b: number) => a + b;
  // TODO: run npm run build to compile the code > npm run build
  // TODO: add your changes and push to npm
  // TODO: run publish command > npm publish --access=public
  // TODO: check your package on npmjs.com
  // TODO: update your package version > npm version patch
  // TODO: run publish command > npm publish --access=public
  // TODO: check your package on npmjs.com and see the updated version
  // TODO: open/create another js project, install your package > npm install @yourusername/test-npm-package
  // TODO: add import statement to the code > import { add } from '@yourusername/test-npm-package';
  // TODO: use add function call in the code > console.log(add(1, 2));
  // TODO: compile and run the code
  // https://www.youtube.com/watch?v=J4b_T-qH3BY - how to publish npm package, in case you are stuck
}
excercise17();

// rewrite the code using async await
function exercise18() {
  function printMessagesWithTimeout() {
    setTimeout(() => {
      console.log("1");

      setTimeout(() => {
        console.log("2");
      }, 1000);

      setTimeout(() => {
        console.log("3");

        setTimeout(() => {
          console.log("4");
        }, 1000);
      }, 1000);
    }, 1000);
  }
  printMessagesWithTimeout();
}
// TODO: compile and run the code
exercise18();
