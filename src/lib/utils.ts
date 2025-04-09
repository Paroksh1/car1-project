
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function formatCurrency(amount: number, currency: string = "USD", options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    ...options
  };
  
  return new Intl.NumberFormat("en-US", defaultOptions).format(amount);
}

export function formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("en-US", options).format(number);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getRelativeTimeString(date: Date | number): string {
  const timeMs = typeof date === "number" ? date : date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];
  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
  
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}

export function generateColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
