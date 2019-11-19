import sanitize from "../../lib/html";

const SanitizeHTML = ({ html, options }) => {
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
};

export default SanitizeHTML;
