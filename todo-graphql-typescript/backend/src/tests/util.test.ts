import { createSetStatement } from "../util/createSetStatement";
test("create statement", () => {
  const sampleData = { name: "TEST", price: 900 };
  const sampleUncleanData = { name: undefined, price: 900 };
  const res = createSetStatement(sampleData, 1);
  expect(res).toBe("name = $1, price = $2");
  const resUnclean = createSetStatement(sampleUncleanData);
  expect(resUnclean).toBe("price = $1");
});
