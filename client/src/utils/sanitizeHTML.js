const sanitizeHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  const content = doc.body.textContent || '';

  return content;
};

export default sanitizeHTML;
