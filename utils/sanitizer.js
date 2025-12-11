export function sanitizeObject(obj) {
  const clean = {};

  for (const key in obj) {
    const value = obj[key];

    // Trim strings
    if (typeof value === "string") {
      clean[key] = value.trim();
      continue;
    }

    // Convert numbers safely
    if (typeof value === "number") {
      clean[key] = Number(value);
      continue;
    }

    // Allow other types (arrays, objects, booleans)
    clean[key] = value;
  }

  return clean;
}
