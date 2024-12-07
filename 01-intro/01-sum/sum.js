export default function sum(a, b) {
  const argsValidationArray = [...arguments].filter((item) => typeof item !== 'number');

  if (argsValidationArray.length)
    throw new TypeError(`Arguments should be number, bad arguments: ${argsValidationArray.join(',')}`);

  return [...arguments].reduce((prev, i) => prev += i, 0);
}

console.log(sum(1, 2));