const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function isNewPost(date: Date | string) {
  return Date.now() - new Date(date).valueOf() < TWO_WEEKS;
}
