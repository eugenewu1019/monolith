import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hardcode the basePath for GitHub Pages to ensure reliability
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/monolith' : '';

export function getAssetPath(path: string): string {
  // If we wanted to add a prefix for CDNs or BasePath, we would do it here.
  if (path.startsWith("http") || path.startsWith("data:")) return path;

  // Ensure path starts with slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // Prepend base path
  return `${BASE_PATH}${cleanPath}`;
}
