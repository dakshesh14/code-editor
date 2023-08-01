export const classNames = (
  ...classes: (string | undefined | null | false)[]
) => {
  return classes.filter(Boolean).join(" ");
};
