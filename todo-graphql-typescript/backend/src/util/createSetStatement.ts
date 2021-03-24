// {name: 'hey', price: 900} => name = 'hey, price = 900
export const createSetStatement = (
  data: { [key: string]: any },
  startAt = 1
) => {
  let str = "",
    num = startAt,
    count = 0;
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    if (typeof data[keys[i]] === "undefined" || data[keys[i]] === null) {
      continue;
    }
    if (count === 0) {
      str += `${keys[i]} = $${num}`;
    } else {
      str += `, ${keys[i]} = $${num}`;
    }
    count++;
    num++;
  }
  return str;
};
