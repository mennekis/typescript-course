// create an npm package of your own
function excercise17() {
  // TODO: register on npmjs.com
  // TODO: check email and confirm npm account email
  // TODO: create a git repository for your package, name it test-npm-package
  // TODO: clone the repository to your local machine
  // TODO: run npm login to login to npm > npm login
  // TODO: run npm init -y to create package.json file > npm init -y
  // TODO: install typescript > npm install -g typescript -D
  // TODO: create tsconfig.json file > npx tsc --init --rootDir src --outDir lib --declaration --sourceMapn --declarationMap
  // TODO: update package.json file with the following values
  // "types": "lib",
  // "scripts": {
  //   "build": "tsc",
  //   "start": "tsc -w",
  // },
  // TODO: update package name to @yourusername/test-npm-package
  // TODO: make sure yourusername is the same as your npmjs.com username
  // TODO: create ./index.ts file with the following code
  // export const add = (a: number, b: number) => a + b;
  // TODO: run npm run build to compile the code > npm run build
  // TODO: add your changes and push to npm
  // TODO: run publish command > npm publish --access=public
  // TODO: check your package on npmjs.com
  // TODO: update your package version > npm version patch
  // TODO: run publish command > npm publish --access=public
  // TODO: check your package on npmjs.com and see the updated version
  // TODO: open/create another js project, install your package > npm install @yourusername/test-npm-package
  // TODO: add import statement to the code > import { add } from '@yourusername/test-npm-package';
  // TODO: use add function call in the code > console.log(add(1, 2));
  // TODO: compile and run the code
  // https://www.youtube.com/watch?v=J4b_T-qH3BY - how to publish npm package, in case you are stuck
}
excercise17();

// rewrite the code using async await
function exercise18() {
  function printMessagesWithTimeout() {
    setTimeout(() => {
      console.log("1");

      setTimeout(() => {
        console.log("2");
      }, 1000);

      setTimeout(() => {
        console.log("3");

        setTimeout(() => {
          console.log("4");
        }, 1000);
      }, 1000);
    }, 1000);
  }
  printMessagesWithTimeout();
}
// TODO: compile and run the code
exercise18();
