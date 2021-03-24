// credits: slidshowp2
// Stackoverflow solution link: https://stackoverflow.com/a/61253641/14242400
export function expand(rowCount: number, columnCount: number, startAt = 1) {
  let index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      () =>
        `(${Array(columnCount)
          .fill(0)
          .map(() => `$${index++}`)
          .join(", ")})`
    )
    .join(", ");
}
