export function average(rows, weighted = true) {
  if (
    !rows.length ||
    rows.some(
      (r) =>
        !Number.isFinite(r.grade) ||
        r.grade < 0 ||
        r.grade > 10 ||
        (weighted && (!Number.isFinite(r.weight) || r.weight <= 0)),
    )
  )
    throw new Error("Informe notas entre 0 e 10 e pesos maiores que zero.");
  const total = rows.reduce((s, r) => s + (weighted ? r.weight : 1), 0);
  return (
    rows.reduce((s, r) => s + r.grade * (weighted ? r.weight : 1), 0) / total
  );
}
export function requiredGrade(
  current,
  completedWeight,
  target,
  remainingWeight,
) {
  if (
    ![current, completedWeight, target, remainingWeight].every(
      Number.isFinite,
    ) ||
    current < 0 ||
    current > 10 ||
    target < 0 ||
    target > 10 ||
    completedWeight <= 0 ||
    remainingWeight <= 0
  )
    throw new Error("Confira as notas e os pesos informados.");
  return (
    (target * (completedWeight + remainingWeight) - current * completedWeight) /
    remainingWeight
  );
}
export function differenceInDays(from, to) {
  const parse = (v) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v))
      throw new Error("Informe as duas datas.");
    const [y, m, d] = v.split("-").map(Number);
    const ms = Date.UTC(y, m - 1, d);
    if (new Date(ms).toISOString().slice(0, 10) !== v)
      throw new Error("Data inválida.");
    return ms;
  };
  return Math.round((parse(to) - parse(from)) / 86400000);
}
export function percentage(mode, a, b) {
  if (![a, b].every(Number.isFinite))
    throw new Error("Preencha os dois valores.");
  if (mode === "variation") {
    if (a === 0) throw new Error("O valor inicial não pode ser zero.");
    return ((b - a) / Math.abs(a)) * 100;
  }
  if (mode === "increase") return b * (1 + a / 100);
  if (mode === "discount") return b * (1 - a / 100);
  return (a * b) / 100;
}
