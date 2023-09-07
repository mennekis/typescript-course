async function assyncAwait() {
  const later = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // async await can be used to do asyncronous loops
  async function calculateLargeSumAsync() {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
      if (i % 10000000 === 0) {
        await later(1);
      }
      sum += i;
    }
    return sum;
  }
  console.log("1");
  calculateLargeSumAsync().then((sum) => console.log("then", sum)); //
  console.log("2");
  let sum = await calculateLargeSumAsync();
  console.log("3", sum);
}
assyncAwait();
