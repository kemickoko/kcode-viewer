const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const csvPath = path.resolve("data/kcodes.csv");
const outputPath = path.resolve("src/data/kcodes.ts");

const csv = fs.readFileSync(csvPath, "utf-8");
const { data } = Papa.parse(csv, { header: true });

const normalized = data
  .filter((row) => row.code && row.name)
  .map((row) => ({
    code: row.code,
    name: row.name,
    point_code: row.point_code === "" ? null : row.point_code,
    note1: row.note1 === "" ? null : row.note1,
    note2: row.note2 === "" ? null : row.note2,
  }));

const json = JSON.stringify(normalized, null, 2);
const ts = `import type { Procedure } from "../types";\n\nexport const kcodes: Procedure[] = ${json};\n`;

fs.writeFileSync(outputPath, ts, "utf-8");
console.log("✅ kcodes.ts を生成しました");