export const classNames = (
  ...classes: (string | undefined | null | false)[]
) => {
  return classes.filter(Boolean).join(" ");
};

export const getLanguageThroughExtension = (extension: string) => {
  switch (extension) {
    case "py":
      return "python";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "html":
      return "html";
    case "css":
      return "css";
    case "cpp":
      return "cpp";
    default:
      return "text";
  }
};
