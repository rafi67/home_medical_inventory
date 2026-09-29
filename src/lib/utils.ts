import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lowStock (fixedQuantity: number, currentQuantity: number): boolean {
  const result = (100*currentQuantity)/fixedQuantity;
  return result < 50;
}

export function expiredOrExpiringMedicine (expiryDate: Date): number {
  const expDate = new Date(expiryDate);
  let newDate = new Date();

  if(expDate.getDate() === newDate.getDate() || (newDate.getDate() > expDate.getDate() && newDate.getFullYear() === expDate.getFullYear())) {
    return 1;
  }

  newDate.setDate(newDate.getDate()+30);

  if(newDate.getDate() === expDate.getDate() && newDate.getFullYear() === expDate.getFullYear()) {
    return 2;
  }

  newDate = new Date();
  newDate.setDate(newDate.getDate()+5);

  if(expDate.getDate() === newDate.getDate() && newDate.getFullYear() === expDate.getFullYear()) {
    return 2;
  }

  newDate = new Date();
  newDate.setDate(newDate.getDate()+10);
  
  if (expDate.getDate() === newDate.getDate() && newDate.getFullYear() === expDate.getFullYear()) {
    return 2;
  }

  return 0;
}