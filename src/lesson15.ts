function lesson15() {
  // ********* Lesson 15 *********
  // Object Oriented Programming
  function oop() {
    // Object - is a collection of properties and mthods,
    // and a property is an association between a name (or key) and a value,
    // and a method is a function that is associated with an object,
    // can access its properties and modify them, and can be called on the object
    // Abstraction - is the process of selecting data and defining operations on it
    // Encapsulation - is the process of combining elements to create a new entity
    // Inheritance - is the process of creating new objects from existing objects
    // Polymorphism - is the ability to treat objects of different types in a similar way
    // Class - is a blueprint for creating objects
    // Object - is an instance of a class
    // Method - is a function associated with an object
    // Property - is an association between a name (or key) and a value
    // Constructor - is a special method that is executed when a new instance of a class is created
    // this - is a reference to the current object
    // super - is a reference to the parent class
    // static - is a keyword that makes a method or property available on the class itself, not on instances of the class
    // public - is a keyword that makes a method or property accessible from outside the class
    // private - is a keyword that makes a method or property accessible only from inside the class
    // protected - is a keyword that makes a method or property accessible only from inside the class and its subclasses
    // readonly - is a keyword that makes a property accessible only for reading
    // abstract - is a keyword that makes a class or method abstract
    // interface - is a keyword that defines a new type that describes the structure of an object and class types implement
    // implements - is a keyword that makes a class implement an interface
    // extends - is a keyword that makes a class extend another class
    // instanceof - is a keyword that checks if an object is an instance of a class
    // new - is a keyword that creates an instance of a class

    class Person {
      public firstName: string;
      public lastName: string;
      public age: number;
      public address: Address;

      public constructor(
        firstName: string,
        lastName: string,
        age: number,
        address: Address
      ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
      }
      public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
      }
      public getBirthDate(): number {
        return new Date().getFullYear() - this.age;
      }
      public getAddress(): Address {
        return this.address;
      }

      public validate(): boolean {
        return (
          this.firstName.length > 0 &&
          this.lastName.length > 0 &&
          this.age > 0 &&
          this.age < 120
        );
      }

      public save(): void {
        if (!this.validate()) {
          throw new Error("Person is not valid");
        }
        // save to db
      }

      public connectToDb(): void {
        // could be connectToApi
        // connect to db
      }
    }

    type Address = {};

    const person = new Person("John", "Smith", 25, {});
    person.validate();
    person.connectToDb();
    person.save();
    // TODO: make validate, connectToDb private and call them from save method

    // Abstraction - is the process of selecting data and defining operations on it
    // Answer to the question - what is this object about, what is it doing, what data it has, what operations it can do
    // Example
    // - shopping app - person is something that has name, email, password and credit card, and can login, logout, register, buy
    // - parking lot app - person is somebody that has name, car, parking spot and can park, unpark, pay
    // - game app - person is somebody that has name, score, level and can play, pause, restart
    // - social network app - person is somebody that has name, friends, posts and can add friend, remove friend, post
    // - restaurant app - person is somebody that has name, order, table and can order, pay, leave feedback and reserve table
    // - bank app - person is somebody that has name, account, balance and can deposit, withdraw, transfer
    // Think about having a physical notebook to do all these operations, what data you need to write down, what operations you need to do

    // Encapsulation - is the process of making data and operations private, hiding and simplifying the usage of the object
    // Answer to the question - what data and operations should not be visible from outside, to simplify the usage of the object
    // Example
    // - hide the fact that database (mssql, mysql, mongodb) is used to store data
    // - hide the fact that api (rest, graphql) is used to get data
    // - hide the fact that http (axios, fetch) is used to get data

    // Inheritance - is the process of creating new objects from existing objects
    // Polymorphism - is the ability to treat objects of different types in a similar way
  }
  // SOLID principles
  // Single Responsibility Principle
  // Open Closed Principle
  // Liskov Substitution Principle
  // Interface Segregation Principle
  // Dependency Inversion Principle
}
lesson10();
