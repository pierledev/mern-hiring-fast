const formatToLocaleDate = (dateString) => {
  const date = new Date(dateString);

  // Format the date to a readable string with the day of the week
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export default formatToLocaleDate;
