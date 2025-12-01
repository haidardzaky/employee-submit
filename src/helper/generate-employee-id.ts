export const generateEmployeeID = (dept: string, lastNumber: number) => {
  const prefix = dept.toUpperCase().slice(0, 3);
  const next = (lastNumber + 1).toString().padStart(3, "0");
  return `${prefix}-${next}`;
};
