const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const csvPath = path.resolve("data/kcodes.csv");
const outputPath = path.resolve("src/data/kcodes.ts");

const csv = fs.readFileSync(csvPath, "utf-8");
const { data } = Papa.parse(csv, { header: true });

const json = JSON.stringify(data, null, 2).replace(/"null"/g, "null");
const ts = `export const kcodes = ${json} as const;\n`;

fs.writeFileSync(outputPath, ts, "utf-8");
console.log("✅ kcodes.ts を生成しました");