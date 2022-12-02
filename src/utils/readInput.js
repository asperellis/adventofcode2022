import fs from "fs";

export const readInput = (day, solution) => {
  fs.readFile(`src/inputs/${day}.txt`, "utf8", (err, data) => solution(data));
};
