export function generateId(): string {
  return Date.now().toString() + Math.floor(Math.random() * 10000).toString();
}
