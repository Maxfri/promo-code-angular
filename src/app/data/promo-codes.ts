import { IPromoCode } from '../models/promo-code';
import { v4 as uuidv4 } from 'uuid';

export const mockData: IPromoCode[] = [
  {
    "id": "50de7f3e-58d3-4cda-8b3d-9b55a7c98c1d",
    "title": "Promocode 1",
    "description": "Description 1",
    "promoCode": "PROMOCODE1",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": "7e974be2-8ccf-41f9-87d7-9d7d2ad5e9e9",
    "title": "Promocode 2",
    "description": "Description 2",
    "promoCode": "PROMOCODE2",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date()
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date()
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date()
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date()
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date()
  },
  {
    "id": uuidv4(),
    "title": "Promocode 3",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  },
  {
    "id": "e58f582b-23df-4b96-9973-70e792c2f9df",
    "title": "Promocode 10",
    "description": "Description 10",
    "promoCode": "PROMOCODE10",
    "dateOfExpiry": new Date("2023-05-16T10:34:41.238Z")
  }
];
