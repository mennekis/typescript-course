// string manipulation utilities type
function exercise52() {
   // TODO: write a utility type that for given object type T
   // will create a new type with all properties plus methods to get and set properties
   // plus methods to validate earch of the property
   type TObjectWitName = {
      name: string;
   };
   // TODO: declare utility type TGettersSettersValidators (union of TGetters, TSetters, TValidators)
   type TGetters<T> = {
      [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
   };

   type TSetters<T> = {
      [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
   };
   type TValidators<T> = {
      [K in keyof T as `validate${Capitalize<string & K>}`]: () => boolean;
   };
   // hint: TGetters for each of the property generates getXxxx method that returns property value
   // hint: TSetters for each of the property generates setXxxx method that sets property value
   // hint: TValidators for each of the property generates validateXxxx method that returns true if property value is valid
   type TGettersSettersValidators<T> = TGetters<T> &
      TSetters<T> &
      TValidators<T>;
   const obj = {
      name: "point",
   };
   // TODO: generate this type from TGettersSettersValidators using utility type
   // type TObjectMethods = TGettersSettersValidators<typeof obj>;
   // TODO: remvoe this declaration below and replac it with the one above
   type TObjectMethods = TGettersSettersValidators<typeof obj>;

   const object: TObjectWitName & TObjectMethods = {
      name: "point",
      getName() {
         return this.name;
      },
      setName(name: string) {
         this.name = name;
      },
      validateName() {
         return this.name.length > 0;
      },
      // age: 40,
      // getAge() {
      //    return this.age;
      // },
      // setAge(age: number) {
      //    this.age = age;
      // },
      // validateAge() {
      //    return this.age >= 0;
      // },
      // 'age' does not exist in type 'TObjectWitName & TGetters
   };
   console.log(object.getName());
   console.log(object.validateName());
   //  console.log(object.getAge());
   //  console.log(object.validateAge());
   // TODO: add property age to object and check if you get type check errors
}
exercise52();

// enums
function exercise53() {
   // TODO: declare enum Color with values Red, Green, Blue
   // TODO: assing Red: 1, Green: 2, Blue: 4
   enum Color {
      Red = 1,
      Green = 2,
      Blue = 4,
   }

   // TODO: declare a function that takes a color as a number and returns a string
   // TODO: use bitmask bitwise AND operator to check if color has Red, Green, Blue
   function getColor(color: number): string {
      let result = "";

      if (color & Color.Red) {
         result += "Red";
      } else if (color & Color.Green) {
         if (result !== "") {
            result += ", ";
         }
         result += "Green";
      } else if (color & Color.Blue) {
         if (result !== "") {
            result += ", ";
         }
         result += "Blue";
      }

      // TODO: check if red bit is set by bitwise & operator, if so - add "Red" to result
      // TODO: check if green bit is set by bitwise & operator, if so - add "Green" to result
      // TODO: check if blue bit is set by bitwise & operator, if so - add "Blue" to result

      // TODO: explain how bitmask works

      return result;
   }

   // TODO: add test assertionsns using this table
   getColor(0) === ""; // (empty string, no color), bitmask ( 0 0 0 )
   getColor(1) === "Red"; // bitmask ( 0 0 1 )
   getColor(2) === "Green"; // bitmask ( 0 1 0 )
   getColor(3) === "Green, Blue"; // bitmask ( 0 1 1 )
   getColor(4) === "Blue"; // bitmask ( 1 0 0 )
   getColor(5) === "Red, Blue"; // bitmask ( 1 0 1 )
   getColor(6) === "Red, Green"; // bitmask   ( 1 1 0 )
   getColor(7) === "Red, Green, Blue"; // bitmask ( 1 1 1 )
}
exercise53();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra3() {
   // TODO: write a function to  merge two sorted arrays of numbers into one sorted array
   function mergeSortedArrays<T>(arr1: T[], arr2: T[]): T[] {
      const mergedArray: T[] = [];
      let i = 0;
      let j = 0;

      while (i < arr1.length && j < arr2.length) {
         if (arr1[i] <= arr2[j]) {
            mergedArray.push(arr1[i]);
            i++;
         } else {
            mergedArray.push(arr2[j]);
            j++;
         }
      }
      while (i < arr1.length) {
         mergedArray.push(arr1[i]);
         i++;
      }
      while (j < arr2.length) {
         mergedArray.push(arr2[j]);
         j++;
      }
      return mergedArray;
   }

   console.assert(
      mergeSortedArrays([1, 2, 3], [4, 5, 6]).toString() ===
         [1, 2, 3, 4, 5, 6].toString()
   );

   console.assert(
      mergeSortedArrays([3, 4, 5], [4, 5, 6]).toString() ===
         [3, 4, 4, 5, 5, 6].toString()
   );
   console.assert(
      mergeSortedArrays([3, 4, 5, 6, 6, 10, 20], [4, 5, 6]).toString() ===
         [3, 4, 4, 5, 5, 6, 6, 6, 10, 20].toString()
   );
}
// TODO: convert mergeSortedArrays to a generic function to support strings and numbers

exerciseExtra3();
