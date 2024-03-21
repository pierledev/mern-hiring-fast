const stripHtmlTags = (html) => {
  var doc = new DOMParser().parseFromString(html, "text/html");
  
  return doc.body.textContent || "";
};

export default stripHtmlTags;
