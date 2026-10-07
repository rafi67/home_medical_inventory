import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lowStock (fixedQuantity: number, currentQuantity: number): boolean {
  const result = (100*currentQuantity)/fixedQuantity;
  return result < 50;
}