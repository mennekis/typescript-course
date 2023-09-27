class Users {
  // TODO: Add type for list property, remove `any` type annotation
  constructor(public list: any[]) {}

  // TODO: Write method that returns array of users names in format "John, Smith" ("firstName, lastName")
  // TODO: Need to fix code to use this.list property data
  getUsersNames() {
    return ["Bob, Smith", "Jack, Chan"];
  }

  // TODO: Write method that updates users age to current date (2023 year)
  // TODO: Need to fix code to use this.list property data
  // TODO: Need to not mutate this.list property, but return new array of users with updated age
  updateUsersAge() {
    this.list = [
      {
        firstName: "Bob",
        lastName: "Smith",
        age: 20,
        birthDate: "2003-02-13",
      },
      {
        firstName: "Jack",
        lastName: "Chan",
        age: 30,
        birthDate: "1993-02-13",
      },
    ];
  }

  // TODO: Implement method that returns users from Ukraine (phone number +380)
  // TODO: Use this.list property data
  getUsersFromUkraine() {
    return [
      {
        firstName: "Ove",
        lastName: "Malyk",
        phone: "+3809525426549",
        age: 30,
        birthDate: "1993-02-13",
      },
      {
        firstName: "Myk",
        lastName: "Franko",
        phone: "+3809625426549",
        age: 30,
        birthDate: "1993-02-13",
      },
    ];
  }

  // TODO: Implement method that returns postal codes grouped by state, using this.list user data
  getStatePostalCodes() {
    return [
      { name: "CO", postalCodes: ["80003", "80004"] },
      { name: "AK", postalCodes: ["10001"] },
    ];
  }
}
