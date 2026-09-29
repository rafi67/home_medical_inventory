/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Medicine {
  _id: string;
  id: string;
  name: string;
  dosage: string;
  category: any;
  fixedQuantity: number;
  currentQuantity: number;
  unit: string;
  expiryDate: Date;
  notes: string;
  userId: string;
};

export interface Category {
  _id: string;
  name: string;
  description: string;
};