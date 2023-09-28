// string manipulation utilities type
function exercise52() {
  // TODO: write a utility type that for given object type T
  // will create a new type with all properties optional, plus methods to get and set properties
  // plus methods to validate earch of the property
  type TObjectWitName = {
    name: string;
  };
  // TODO: declare utility type TGettersSettersValidators (union of TGetters, TSetters, TValidators)
  // hint: TGetters for each of the property generates getXxxx method that returns property value
  // hint: TSetters for each of the property generates setXxxx method that sets property value
  // hint: TValidators for each of the property generates validateXxxx method that returns true if property value is valid
  const obj = {
    name: "point",
  };

  // TODO: generate this type from TGettersSettersValidators using utility type
  // type TObjectMethods = TGettersSettersValidators<typeof obj>;
  // TODO: remvoe this declaration below and replac it with the one above
  type TObjectMethods = {
    getName(): string;
    setName(name: string): void;
    validateName(): boolean;
  };

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
  };

  // TODO: add property age to object and check if you get type check errors
}
exercise52();

// enums
function exercise53() {
  // TODO: declare enum Color with values Red, Green, Blue
  // TODO: assing Red: 1, Green: 2, Blue: 4
  // enum Color {}

  // TODO: declare a function that takes a color as a number and returns a string
  // TODO: use bitmask bitwise AND operator to check if color has Red, Green, Blue
  function getColor(color: number): string {
    let result = "";
    // TODO: check if red bit is set by bitwise & operator, if so - add "Red" to result
    // TODO: check if green bit is set by bitwise & operator, if so - add "Green" to result
    // TODO: check if blue bit is set by bitwise & operator, if so - add "Blue" to result

    // TODO: explain how bitmask works

    return result;
  }

  // TODO: add test assertionsns using this table
  // getColor(0) === """ (empty string, no color), bitmask ( 0 0 0 )
  // getColor(1) === "Red" // bitmask ( 0 0 1 )
  // getColor(2) === "Green // bitmask ( 0 1 0 )
  // getColor(3) === "Green, Blue" // bitmask ( 0 1 1 )
  // getColor(4) === "Blue" bitmask ( 1 0 0 )
  // getColor(5) === "Red, Blue" // bitmask ( 1 0 1 )
  // getColor(6) === "Red, Green" // bitmask   ( 1 1 0 )
  // getColor(7) === "Red, Green, Blue" // bitmask ( 1 1 1 )
}
exercise53();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra3() {
  // TODO: write a function to  merge two sorted arrays of numbers into one sorted array
  function mergeSortedArrays(arr1: any, arr2: any): any {
    return [];
  }

  //   console.assert(
  //     mergeSortedArrays([1, 2, 3], [4, 5, 6]).toString() ===
  //       [1, 2, 3, 4, 5, 6].toString()
  //   );

  //   console.assert(
  //     mergeSortedArrays([3, 4, 5], [4, 5, 6]).toString() ===
  //       [3, 4, 4, 5, 5, 6].toString()
  //   );
  //   console.assert(
  //     mergeSortedArrays([3, 4, 5, 6, 6, 10, 20], [4, 5, 6]).toString() ===
  //       [3, 4, 4, 5, 5, 6, 6, 6, 10, 20].toString()
  //   );

  // TODO: convert mergeSortedArrays to a generic function to support strings and numbers
}
exerciseExtra3();
