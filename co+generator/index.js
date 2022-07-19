const { readFile } = require("fs/promises");

/**
 * async + await 版本
 */
// async function read() {
//   const filePath = await readFile("./name.txt", "utf-8");
//   return await readFile(filePath, "utf-8");
// }

// read().then((res) => console.log(res));

/**
 * generator
 */
// function* read() {
//   const filePath = yield readFile("./name.txt", "utf-8");
//   return readFile(filePath, "utf-8");
// }

// const gen = read();
// let { value, done } = gen.next();
// value.then((res) => {
//   console.log(res);
//   let { value, done } = gen.next(res);
//   value.then((res) => {
//     console.log(res);
//   });
// });

/**
 * generator + co
 */
function* read() {
  const filePath = yield readFile("./name.txt", "utf-8");
  return readFile(filePath, "utf-8");
}

function co(gen) {
  return new Promise((resolve) => {
    const next = function (data) {
      const { value, done } = gen.next(data);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then((res) => {
          next(res);
        });
      }
    };
    next();
  });
}

const res = co(read());

res.then((res) => console.log(res));
