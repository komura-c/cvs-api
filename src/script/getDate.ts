export const getDateAndSetDate = (): string => {
  const jstOffset = 9 * 60 * 60 * 1000;
  const date = new Date();
  const offset = date.getTimezoneOffset() + jstOffset;
  date.setTime(date.getTime() + offset);
  return date.toISOString().replace(/T/, '-').replace(/\..+/, '');
};
