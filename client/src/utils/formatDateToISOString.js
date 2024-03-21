const formatDateToISOString = (dateString) => {
  const date = new Date(dateString);

  // Convert to 'YYYY-MM-DD' format
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};

export default formatDateToISOString;
