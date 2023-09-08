export function getKeyByValue<T extends Record<string, string>>(
  object: T,
  value: string | undefined
): keyof T | undefined {
  return Object.keys(object).find(key => object[key] === value) as keyof T | undefined;
}
