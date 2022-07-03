export const formatMoney = (amount?: number, withSymbol?: boolean): string => {
  if (!amount) {
    return "0";
  }
  return (
    amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (withSymbol ? " VNĐ" : "")
  );
};
