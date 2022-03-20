export default function getHighestOccurrence(arr) {
  return arr
    .reduce((acc, cur, ind, arr) => {
      if (arr.indexOf(cur) === ind) {
        return [...acc, [cur, 1]];
      } else {
        acc[acc.indexOf(acc.find((e) => e[0] === cur))] = [
          cur,
          acc[acc.indexOf(acc.find((e) => e[0] === cur))][1] + 1,
        ];
        return acc;
      }
    }, [])
    .sort((a, b) => b[1] - a[1])
    .filter((cur, ind, arr) => cur[1] === arr[0][1])
    .map((cur) => cur[0]);
}
