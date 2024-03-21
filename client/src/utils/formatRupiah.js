const formatRupiah = (value) => {
  return parseInt(value, 10).toLocaleString("id-ID").replace(/,/g, ".");
}

export default formatRupiah;