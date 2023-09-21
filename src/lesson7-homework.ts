// Use double assertion
function exercise35() {
   // TODO:Create two types: TUser and TProduct
   interface TUser {
      /* TODO: add definition for user name, title and email */

      name: string;
      title: string;
      email: string;
   }
   interface TProduct {
      /* TODO: add definition for product title, price and quantity */
      title: string;
      price: number;
      quantity: number;
   }

   let user: TUser = {
      name: "Alexey",
      title: "Developer",
      email: "alexey@mail.com",
   };
   let product: TProduct = {
      title: "Product1",
      price: 100,
      quantity: 2,
   };

   // TODO: fix the error by adding double assertion
   product = user as any as TProduct;
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
      get name() {
         return `${this.firstName} ${this.lastName}`;
      },
   };
   // TODO: add this param annotation, to enforce that this function
   // can only be called on an object with name, age and role properties
   function toString(this: { name: string; age: number; role: string }) {
      // TODO: remove the following line

      // TODO: uncomment the following line
      return `${this.name}, ${this.age}, ${this.role}`;
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

  // +TODO: add generic constraints to enforce type checking, add return type annotation
    // +TODO: implement the method sayHello that returns a greeting string
    // +TODO: use firstName lastName props to generate a greeting string, for example: "Hello Joe Smith"
    // +TODO: make sure the obj is not modified, and new object is returned
  
   // // TODO: add generic constraints to enforce type checking, add return type annotation
   // function addGreeting<T>(obj: T) {
   //   // TODO: implement the method sayHello that returns a greeting string
   //   // TODO: in the function generate variable fullName = `${obj.firstName} ${obj.lastName}`;
   //   // TODO: use fullName variable to generate a greeting string, for example: "Hello Joe Smith"
   //   // TODO: make sure the obj is not modified, and new object is returned
   // }
   // TODO: add generic constraints to enforce type checking, add return type annotation
   function addGreeting<T extends IPerson>(
      obj: T
   ): T & { sayHello: () => string } {
      const greeting = `Hello ${obj.firstName} ${obj.lastName}`;
      
      return {
         ...obj,
         sayHello: () => greeting,
      };
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
   if ("sayHello" in person) {
      console.log(person.sayHello());
   }
}
exercise37();

// Use experimental decorators
function exercise38() {
   // TODO: implement decorator to print call count of the function
   function count(target: any, propertyKey: string, descriptor: PropertyDescriptor){
      const originalMeth = descriptor.value;
      let callCount = 0;

   descriptor.value = function(...args: any[]){
      callCount++;
      console.log(`Function ${propertyKey} has been called ${callCount} times.`);
      return originalMeth.apply(this,args);
   }
      // add params here
      // TODO: implement decorator
      // TODO: before calling the function increment callCount
      // TODO: after calling the function print callCount
      return descriptor;
   }
   // TODO: implement decorator to print execution time of the function
   function time(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      // add params here
      const originalMeth = descriptor.value;
      // TODO: before calling the function get current time
      // TODO: after calling the function get current time
      // TODO: print the difference between the two times after calling the function
      descriptor.value = function(...args:any[]){
         const startTime = Date.now();
         const result = originalMeth.apply(this,args);
         const endTime = Date.now();
         const executionTime = endTime - startTime;
         console.log(`Function ${propertyKey} took ${executionTime} ms to execute.`);
         console.log(startTime);
         console.log(endTime);
         
         
         return result;
         
      }
      return descriptor;

   }

   class Calculation {
      // TODO: add both decorators to the following method
      @count
      @time
      static add(a: number, b: number):any {
         return a + b;
      }
   }
  
   const result = Calculation.add(5, 10);

   // TODO: create instance of Calculation class and call add method
}
exercise38();

// Use 2023 decorators (Stage 3 decorator)
function exercise39() {

   function countCalls(target: any, propertyKey: string, descriptor: PropertyDescriptor){
      const originalMeth = descriptor.value;
      let callCount = 0;

   descriptor.value = function(...args: any[]){
      callCount++;
      console.log(`Function ${propertyKey} has been called ${callCount} times.`);
      return originalMeth.apply(this,args);
   }
   }
   function time(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      
      const originalMeth = descriptor.value;
      descriptor.value = function(...args:any[]){
         const startTime = performance.now();;
         const result = originalMeth.apply(this,args);
         const endTime = performance.now();
         const executionTime = endTime - startTime;
         console.log(`Function ${propertyKey} took ${executionTime} ms to execute.`);
         console.log(startTime);
         console.log(endTime);
         
         
         return result;
         
      }

   }
   // TODO: implement decorator to print call count of the function
   // TODO: implement decorator to print execution time of the function
   class Calculation {
      @countCalls
      @time
      // TODO: add both decorators to the following method
      static add(a: number, b: number) {
         return a + b;
      }
   }
   // TODO: create instance of Calculation class and call add method
   
   const result = Calculation.add(5, 10);
}
exercise39();
