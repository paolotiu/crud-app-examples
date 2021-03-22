export const createVariablesString = (arr: any[]) => {
  // Create the variables string
  // [1,5,3,9] => "$1,$2,$3,$4"
  let vars = "";
  for (let i in arr) {
    const index = parseInt(i) + 1;
    if (index >= arr.length) {
      vars = vars + "$" + index;
    } else {
      vars = `${vars}$${index},`;
    }
  }

  return vars;
};
