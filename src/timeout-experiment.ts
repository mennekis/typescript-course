function timeoutExperiment() {
  setTimeout(() => console.log("1"), 1);
  setTimeout(() => {
    setTimeout(() => console.log("4"), 1);
    setTimeout(() => console.log("5"), 1);
    // setTimeout(() => console.log("6"), 10);
    // setTimeout(() => console.log("7"), 100);
    // setTimeout(() => console.log("8"), 1000);
    setTimeout(() => console.log("0"));
    setTimeout(() => console.log("0"));
    setTimeout(() => console.log("0"));
  }, 1);
  setTimeout(() => console.log("2"), 1);
  setTimeout(() => console.log("3"), 1);
}
timeoutExperiment();
