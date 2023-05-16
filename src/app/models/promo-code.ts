export interface IPromoCode {
  id: string;
  title: string;
  promocode: string;
  description?: string;
  dateOfExpiry: Date | string;
}