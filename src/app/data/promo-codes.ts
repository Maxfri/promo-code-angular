import { IPromocode } from '../models/promo-code';
import { v4 as uuidv4 } from 'uuid';

export const promocodes: IPromocode[] = [
  {
    id: uuidv4(),
    title: 'Promocode 1',
    description: 'description',
    promocode: uuidv4(),
    dateOfExpiry: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Promocode 2',
    description: 'description',
    promocode: uuidv4(),
    dateOfExpiry: new Date(),
  },
];
