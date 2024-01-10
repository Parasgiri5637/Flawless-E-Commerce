export default function useDiscount(price, discount) {
  const discountValue = discount / 100;
  const discountedPrice = price * discountValue;
  const mainPrice = Math.round(price - discountedPrice);

  return mainPrice;
}
