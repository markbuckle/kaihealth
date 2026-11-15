// Joins class names and drops falsy values, so variants compose without a library.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
