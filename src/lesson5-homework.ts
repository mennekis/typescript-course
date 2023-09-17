// use type narrowing to print the passanger info
function exercise23() {
  // TODO: define THuman type with properties name, age, driverLicenseId
  type THuman = {};
  // TODO: define TAnimal type with properties name, age, species
  type TAnimal = {};
  // TODO: define TPassanger type as union of THuman and TAnimal
  type TPassanger = {};

  // annotate the function to accept TPassanger type
  function printPassangerInfo(passanger: unknown) {
    // TODO: use type narrowing to print the passanger info
    console.log((passanger as any).name);
    console.log((passanger as any).age);
    // TODO: print driverLicenseId if passanger is human
    console.log((passanger as any).driverLicenseId);
    // TODO: print species if passanger is animal
    console.log((passanger as any).species);
  }
  // TODO: add missing properties to human and animal objects
  const human: THuman = {};
  const animal: TAnimal = {};
  printPassangerInfo(human);
  printPassangerInfo(animal);
  // TODO: Implement function printPassangerInfo using instanceof operator to narrow the type of the passanger
  // TODO: Add implementation of the printPassangerInfo using property check to narrow the type of the passanger
}
// TODO: compile and run the code
exercise23();

// use discriminated union to narrow the type of the object
function exercise24() {
  // TODO: add type property to TBlogMessage, TBlogImage, TBlogComment with literal type of 'message', 'image', 'comment'
  type TBlogMessage = {
    text: string;
  };
  type TBlogImage = {
    url: string;
  };
  type TBlogComment = {
    text: string;
    messageId: string;
  };

  type TBlogPost = TBlogMessage | TBlogImage | TBlogComment;

  function printBlogPost(post: TBlogPost) {
    // TODO: use discriminated union to narrow the type of the object
    if ("messageId" in post) {
      console.log("comment: ", post.text);
    }
    if ("url" in post) {
      console.log("image: ", post.url);
    }
    if ("text" in post) {
      console.log("message: ", post.text);
    }
  }

  // TODO: add missing type property to the objects
  printBlogPost({ text: "abc" });
  printBlogPost({ url: "abc" });
  printBlogPost({ text: "abc", messageId: "123" });
}
// TODO: compile and run the code
exercise24();

// use non-null assertion operator
function exercise25() {
  type TPerson = {
    name: string;
    email?: string | null | undefined;
  };

  function sendEmail(email: string) {
    console.log("sending email to", email);
  }

  function ensureContactable(person: TPerson) {
    // TODO: add check for null and undefined - throw error if person.email is null or undefined
  }

  function contact(person: TPerson) {
    ensureContactable(person);
    // TODO: uncomment code below and check that it compiles,  use non-null assertion operator to fix compile time error
    // sendEmail(person.email);
  }

  function contact2(person: TPerson) {
    // Add inline check for null and undefined - throw error if person.email is null or undefined
    // TODO: uncomment code below and check that it compiles
    // sendEmail(person.email);
  }

  const person1: TPerson = {
    name: "John",
    email: "asdf@asdf.com",
  };
  const person2: TPerson = {
    name: "John",
    email: null,
  };

  contact(person1);
  contact2(person1);
  contact(person2);

  // TODO: print the result to console
}
// TODO: compile and run the code
exercise25();

// Create an assertion function
function exercise26() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: add your code to make the following function assert correctly
  function asserWidget(value: unknown) {}
  // TODO: add your code to make the following function assert correctly
  function asserGadget(value: unknown) {}

  const thing1 = { name: "widget" } as TThing;
  const thing2 = { os: "ubuntu" } as TThing;
  asserWidget(thing1);
  // TODO: uncomment the following lines after assertion is added
  // thing1.name = 'weather widget';
  // console.log(thing1.name);

  // TODO: uncomment the following lines after assertion is added
  asserGadget(thing2);
  // thing2.os = 'android';
  // console.log(thing2.os);
}
exercise26();

// use interface and compare with type alias
function exercise27() {
  type TPerson = {
    // name is string
    // age is number
  };

  // TODO: add TPersonWithPhone type definition - extend TPerson with phone property
  // type TPersonWithPhone = ...
  // phone is string

  // TODO: uncomment the code below and check that it compiles
  // const person: TPersonWithPhone = {
  //   name: 'John',
  //   age: 18,
  //   phone: '123-456-7890',
  // };
  // console.log('person data: ', person.name, person.age, person.phone);

  interface IPerson {
    // name is string
    // age is number
  }

  // TODO: add IPersonWithPhone interface definition - extend IPerson with phone property
  // interface IPersonWithPhone = ...
  // phone is string

  // TODO: uncomment the code below and check that it compiles
  // const person2: IPersonWithPhone = {
  //   name: 'John',
  //   age: 18,
  //   phone: '123-456-7890',
  // };

  // console.log('person data: ', person2.name, person2.age, person2.phone);
}
// TODO: compile and run the code
exercise27();

// use implements keyword to implement interface
function exercise28() {
  // TODO: declare interface IWidget with name property
  interface IWidget {
    // name property
  }
  // TODO: declare interface IWidgetWithSize which extends IWidget and adds width, height and color properties
  // TODO: add resize method to IWidgetWithSize interface
  interface IWidgetWithSize extends IWidget {
    // width, height and color properties
    // resize method
  }
  // TOOD: declare interface IDesktopWidget which extends IWidgetWithSize and adds os property
  // TODO: add open method to IDesktopWidget interface
  interface IDesktopWidget extends IWidgetWithSize {
    // os property
    // open method
  }
  // TODO: declare interface IMobileWidget which extends IWidgetWithSize and adds space property
  // TODO: add install method to IMobileWidget interface
  interface IMobileWidget extends IWidgetWithSize, IWidgetPrintable {
    // space property
    // install method
  }

  // TODO: declare class Widget which implements IWidget
  class Widget {}
  // TODO: declare class WidgetWithSize which implements IWidgetWithSize
  class WidgetWithSize {}
  // TODO: declare class DesktopWidget which implements IDesktopWidget
  class DesktopWidget {}
  // TODO: declare class MobileWidget which implements IMobileWidget

  // TODO: declare class DesktopAndMobileWidget which implements IDesktopWidget and IMobileWidget
  class DesktopAndMobileWidget {}

  // TODO: declare interface IWidgetPrintable wich has toString method
  interface IWidgetPrintable {
    // toString method - returns string
    toString(): string;
  }

  // TODO: add IWidgetPrintable to each of the classes above
  // implementation returns class name and all properties

  // TODO: create instance of each class
  // TODO: print each instance to console
}
// TODO: compile and run the code
exercise28();
