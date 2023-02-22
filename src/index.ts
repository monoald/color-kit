import { cmykToLab } from "./convert"

console.log(
  cmykToLab({c: 100, m: 0, y: 56, k: 0})
);
console.log(
  cmykToLab({c: 0, m: 0, y: 0, k: 0})
);
console.log(
  cmykToLab({c: 100, m: 100, y: 100, k: 100})
);
console.log(
  cmykToLab({c: 200, m: 160, y: 800, k: 130})
);
console.log(
  cmykToLab({c: -2, m: -1, y: -8, k: -1})
);