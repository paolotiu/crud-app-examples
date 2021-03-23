export const multiplyValue = <T, V>(
  constant: T,
  arr: V[],
  constFirst = true
) => {
  const finalArr: Array<T | V> = [];
  arr.forEach((x) => {
    if (constFirst) {
      finalArr.push(constant, x);
    } else {
      finalArr.push(x, constant);
    }
  });
  return finalArr;
};
