export interface IPromocode {
  id: string;
  title: string;
  promocode: string;
  description?: string; 
  dateOfExpiry: Date;
}