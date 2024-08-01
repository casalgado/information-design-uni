function toCurrency(number) {
  if (typeof number == "string") {
    number = parseInt(number);
  }
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export { toCurrency };
