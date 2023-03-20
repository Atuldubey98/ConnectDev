export default function useDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Pass date props in use Date");
  }
  function toStringDate() {
    const day =
      date.getDate() < 10
        ? `0${date.getDate().toString()}`
        : date.getDate().toString();
    const month =
      date.getMonth() + 1 < 10
        ? `0${(date.getMonth() + 1).toString()}`
        : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  return { toStringDate };
}
