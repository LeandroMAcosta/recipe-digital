function isPrimitive(test: any): boolean {
  return test !== Object(test);
}

// This functions assumes obj doesn't have a circular structure
export function removeUndefined(obj: Record<string, any>) {
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitive(value)) {
      value == undefined && delete obj[key];
    } else {
      removeUndefined(value);
      Object.entries(value as Record<string, any>).length === 0 && delete obj[key];
    }
  }

  return obj;
}
