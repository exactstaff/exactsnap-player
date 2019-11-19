import sanitizeHtml from "sanitize-html";

export default (content, options) => {
  const defaultOptions = {
    allowedTags: options || [
      "b",
      "i",
      "em",
      "strong",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "li",
      "ol",
      "p",
      "br",
      "hr"
    ],
    allowedAttributes: {
      a: ["href"]
    },
    allowedIframeHostnames: ["www.youtube.com"]
  };

  return {
    __html: sanitizeHtml(
      content.split(`\n`).join("</br>"),
      (options = { ...defaultOptions })
    )
  };
};
