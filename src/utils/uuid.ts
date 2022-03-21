export function uuid() {
  const date = new Date().getTime().toString();
  const random = Math.floor(Math.random() * 100000000).toString(16);
  return `${random}-${date}`;
}
