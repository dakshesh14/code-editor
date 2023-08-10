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
    case "java":
      return "java";
    case "cpp":
      return "cpp";
    case "css":
      return "css";
    case "jsx":
      return "javascript;react";
    default:
      return "text";
  }
};

export const getLanguageLogo = (fileName: string) => {
  const language = getLanguageThroughExtension(fileName.split(".").pop() || "");

  switch (language) {
    case "python":
      return "/language-logo/python.svg";
    case "javascript":
      return "/language-logo/javascript.svg";
    case "cpp":
      return "/language-logo/cpp.svg";
    case "java":
      return "/language-logo/java.svg";
    case "css":
      return "/language-logo/css.svg";
    case "javascript;react":
      return "/language-logo/react.svg";
    default:
      return "/language-logo/markdown.svg";
  }
};
