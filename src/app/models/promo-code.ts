export interface IPromoCode {
  id: string;
  title: string;
  promoCode: string;
  description?: string;
  dateOfExpiry: Date;
}