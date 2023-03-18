const ds = {
  seconds: 0,
  minute: 0,
  hour: 0,
  day: 0,
  week: 0,
  month: 0,
  year: 0,
};

ds.seconds = 1000;
ds.minute = ds.seconds * 60;
ds.hour = ds.minute * 60;
ds.day = ds.hour * 24;
ds.week = ds.day * 7;
ds.month = ds.day * 30;
ds.year = ds.day * 365;

export const timeAgo = (timestamp: Date, locale = "en") => {
  timestamp = new Date(timestamp);
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "narrow",
  });
  for (const [key, value] of Object.entries(ds).reverse()) {
    const diff = Math.floor((Date.now() - timestamp.getTime()) / value);
    if (diff > 0) {
      return rtf.format(-diff, key as keyof typeof ds);
    }
  }
  return rtf.format(0, "second");
}

