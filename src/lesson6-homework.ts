// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing) {
    return false;
  }

  function printThingDescription(arg: TThing) {
    // TODO: uncomment the following code
    // if (isWidget(arg)) {
    //   console.log(arg.name);
    // } else {
    //   console.log(arg.os);
    // }
  }
  printThingDescription({ name: "widget" });
  printThingDescription({ os: "android" });
}
exercise29();
