import test from "node:test";
import assert from "node:assert/strict";
import {
  average,
  requiredGrade,
  differenceInDays,
  percentage,
} from "../src/lib/calculations.mjs";
test("Média simples e ponderada", () => {
  assert.equal(
    average([
      { grade: 6, weight: 1 },
      { grade: 9, weight: 2 },
    ]),
    8,
  );
  assert.equal(
    average(
      [
        { grade: 6, weight: 1 },
        { grade: 9, weight: 2 },
      ],
      false,
    ),
    7.5,
  );
});
test("Notas e pesos inválidos", () => {
  assert.throws(() => average([{ grade: 11, weight: 1 }]));
  assert.throws(() => average([{ grade: 5, weight: 0 }]));
  assert.throws(() => average([]));
});
test("Nota necessária e múltiplas avaliações restantes", () => {
  assert.equal(requiredGrade(5.8, 1, 7, 1), 8.2);
  assert.equal(requiredGrade(5, 2, 7, 4), 8);
  assert.ok(requiredGrade(0, 4, 7, 1) > 10);
  assert.throws(() => requiredGrade(5, 1, 7, 0));
});
test("Dias corridos, ano bissexto, ordem invertida e DST", () => {
  assert.equal(differenceInDays("2024-02-28", "2024-03-01"), 2);
  assert.equal(differenceInDays("2026-03-07", "2026-03-09"), 2);
  assert.equal(differenceInDays("2026-09-22", "2026-09-21"), -1);
  assert.equal(differenceInDays("2026-09-22", "2026-09-22"), 0);
  assert.throws(() => differenceInDays("2026-02-30", "2026-03-01"));
});
test("Porcentagem, aumento, desconto e variação", () => {
  assert.equal(percentage("simple", 10, 200), 20);
  assert.ok(Math.abs(percentage("increase", 10, 200) - 220) < 1e-10);
  assert.equal(percentage("discount", 25, 200), 150);
  assert.equal(percentage("variation", 100, 150), 50);
  assert.throws(() => percentage("variation", 0, 20));
});
