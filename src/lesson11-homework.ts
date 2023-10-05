import { data } from "./users-data";

interface UserData {
   firstName: string;
   lastName: string;
   age: number;
   birthDate: string;
   phone: string;
   [key: string]: string | number;
}

export class Users {
   // TODO: Add type for list property, remove `any` type annotation
   public list: UserData[];
   constructor(list: UserData[]) {
      this.list = list;
   }

   // TODO: Write method that returns array of users names in format "John, Smith" ("firstName, lastName")
   // TODO: Need to fix code to use this.list property data
   getUsersNames(): string[] {
      return this.list.map((user) => `${user.firstName}, ${user.lastName}`);
   }

   // TODO: Write method that updates users age to current date (2023 year)
   // TODO: Need to fix code to use this.list property data
   // TODO: Need to not mutate this.list property, but return new array of users with updated age
   updateUsersAge(): UserData[] {
      const currentYear = new Date().getFullYear();
      this.list.forEach((user) => {
         user.age = currentYear - new Date(user.birthDate).getFullYear();
      });
      return this.list;
   }

   // TODO: Implement method that returns users from Ukraine (phone number +380)
   // TODO: Use this.list property data
   getUsersFromUkraine(): UserData[] {
      return this.list.filter((user) => user.phone.startsWith("+380"));
   }

   // TODO: Implement method that returns postal codes grouped by state, using this.list user data
   getStatePostalCodes(): { name: string; postalCodes: string[] }[] {
      const stateMap: { [key: string]: string[] } = {};
      this.list.forEach((user) => {
         const state = user.phone.substring(1, 3);
         if (!stateMap[state]) {
            stateMap[state] = [];
         }
         stateMap[state].push(user.phone.substring(3));
      });
      return Object.keys(stateMap).map((state) => ({
         name: state,
         postalCodes: stateMap[state],
      }));
   }
   getAverageWomenAge(): number {
      const women = this.list.filter((user) => user.gender === "female");
      const totalAge = women.reduce((sum, user) => sum + user.age, 0);
      return totalAge / women.length;
   }
   getMostCommonWoomanHairColor(): string {
      const women = this.list.filter((user) => user.gender === "female");
      const hairColorCounts: { [key: string]: number } = {};
      women.forEach((user) => {
         const color = user.hairColor;
         hairColorCounts[color] = (hairColorCounts[color] || 0) + 1;
      });
      const mostCommonColor = Object.keys(hairColorCounts).reduce((a, b) =>
         hairColorCounts[a] > hairColorCounts[b] ? a : b
      );
      return mostCommonColor;
   }
   getMostCommonManBlodType(): string {
      const men = this.list.filter((user) => user.gender === "male");
      const bloodTypeCounts: { [key: string]: number } = {};
      men.forEach((user) => {
         const bloodType = user.bloodType;
         bloodTypeCounts[bloodType] = (bloodTypeCounts[bloodType] || 0) + 1;
      });
      const mostCommonBloodType = Object.keys(bloodTypeCounts).reduce((a, b) =>
         bloodTypeCounts[a] > bloodTypeCounts[b] ? a : b
      );
      return mostCommonBloodType;
   }
}

export const userData: UserData[] = [
   {
      firstName: "Ove",
      lastName: "Malyk",
      age: 30,
      birthDate: "1993-02-13",
      phone: "+3809525426549",
      gender: "male",
      hairColor: "bold",
      bloodType: "A=",
   },
   {
      firstName: "Myk",
      lastName: "Franko",
      age: 30,
      birthDate: "1993-02-13",
      phone: "+3809625426549",
      gender: "female",
      hairColor: "blond",
      bloodType: "AB",
   },
];

export const users = new Users(userData);

console.log(users.getUsersNames());
console.log(users.updateUsersAge());
console.log(users.getUsersFromUkraine());
console.log(users.getStatePostalCodes());
console.log(users.getAverageWomenAge());
console.log(users.getMostCommonWoomanHairColor());
console.log(users.getMostCommonManBlodType());
