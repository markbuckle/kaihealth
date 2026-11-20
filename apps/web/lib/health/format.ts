// Dates are parsed by hand rather than with Date or Intl, so server and browser always
// print the same text and no time zone can shift a day.

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type DateParts = { year: number; month: string; day?: number };

// "2026-10-14" or "2026-04"
function parseDate(date: string): DateParts {
  const [year, month, day] = date.split('-').map(Number);
  const name = month ? monthNames[month - 1] : undefined;
  if (!year || !name) throw new Error(`Not a date: ${date}`);
  return { year, month: name, day };
}

// "April"
export function formatMonth(date: string): string {
  return parseDate(date).month;
}

// "October 2026"
export function formatMonthYear(date: string): string {
  const { year, month } = parseDate(date);
  return `${month} ${year}`;
}

// "Oct 2026"
export function formatShortMonthYear(date: string): string {
  const { year, month } = parseDate(date);
  return `${month.slice(0, 3)} ${year}`;
}

// "Oct 14, 2026", or "April 2026" when only the month is known
export function formatDate(date: string): string {
  const { year, month, day } = parseDate(date);
  return day ? `${month.slice(0, 3)} ${day}, ${year}` : `${month} ${year}`;
}

// "Oct 21"
export function formatShortDate(date: string): string {
  const { month, day } = parseDate(date);
  return day ? `${month.slice(0, 3)} ${day}` : month;
}

export function formatNumber(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

// "+1.4" or "−4.0", with a true minus sign
export function formatSigned(value: number, decimals: number): string {
  const text = Math.abs(value).toFixed(decimals);
  return value < 0 ? `−${text}` : `+${text}`;
}

const countWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

// "nine", or digits from ten up, as the dashboard copy writes small numbers in words
export function spellCount(count: number): string {
  return countWords[count] ?? String(count);
}
